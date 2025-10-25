import { useState, useEffect } from 'react';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AuthCard from '../../components/auth/AuthCard';
import FormInput from '../../components/auth/FormInput';
import AlertMessage from '../../components/auth/AlertMessage';
import SubmitButton from '../../components/auth/SubmitButton';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      const result = await login(formData.email, formData.password);

      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccessMessage('¡Bienvenido de vuelta!');
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <AuthCard
        title="Bienvenido"
        subtitle="de vuelta"
        badge="Plataforma Segura"
        mousePosition={mousePosition}
        isVisible={isVisible}
      >
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={successMessage} />

        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white pl-1">
              Correo electrónico
            </label>
            <FormInput
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white pl-1">
              Contraseña
            </label>
            <FormInput
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              onKeyPress={handleKeyPress}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => console.log('Forgot password')}
              className="text-sm text-[#378BA4] hover:text-white font-semibold transition-colors inline-flex items-center gap-1 group"
            >
              ¿Olvidaste tu contraseña?
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Submit Button */}
          <SubmitButton loading={loading} onClick={handleSubmit} loadingText="Iniciando sesión...">
            Iniciar Sesión
          </SubmitButton>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#378BA4] hover:text-white font-bold inline-flex items-center gap-1 group transition-colors"
            >
              Regístrate aquí
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </p>
        </div>
      </AuthCard>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% auto;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float 8s ease-in-out infinite reverse;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;