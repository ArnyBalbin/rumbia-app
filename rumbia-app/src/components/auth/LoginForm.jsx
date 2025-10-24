import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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

      console.log('📤 Datos de login:', formData);

      const loginResponse = await fetch('https://api-rumbia.onrender.com/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

       const loginData = await loginResponse.json();
      console.log('📥 Respuesta del login:', loginData);

      if (!loginResponse.ok) {
        console.error('❌ Error en login:', loginData);
        throw new Error(loginData.detail || loginData.message || 'Error al iniciar sesión');
      }

      const token = loginData.access;
      
      console.log('🔍 Estructura de loginData:', {
        access: loginData.access,
        refresh: loginData.refresh,
        user_id: loginData.user_id,
        email: loginData.email,
        first_name: loginData.first_name,
        last_name: loginData.last_name,
        tipo: loginData.tipo
      });

      // Guardar token y datos del usuario correctamente
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', loginData.refresh);
      
      // Guardar datos completos del usuario
      const userData = {
        user_id: loginData.user_id,
        id: loginData.user_id, // Alias para compatibilidad
        email: loginData.email || formData.email,
        first_name: loginData.first_name,
        last_name: loginData.last_name,
        name: `${loginData.first_name} ${loginData.last_name}`,
        tipo: loginData.tipo
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      console.log('✅ Login exitoso');
      console.log('💾 Datos guardados en localStorage:', userData);
      
      setSuccessMessage('¡Bienvenido de vuelta!');
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate('/HomeLogged');
      }, 1500);
      
    } catch (err) {
      console.error('❌ Error general:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <div 
        className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] animate-gradient-x"></div>

          <div className="p-8 md:p-10">
            <div className="text-center mb-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#378BA4]" />
                <span className="text-sm font-bold text-white">Plataforma Segura</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Bienvenido
                <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                  de vuelta
                </span>
              </h2>
              <p className="text-gray-300 text-sm">Ingresa a tu cuenta para continuar tu viaje</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl animate-shake">
                <p className="text-red-200 text-sm font-medium flex items-center gap-2">
                  <X className="w-5 h-5" />
                  {error}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl animate-pulse">
                <p className="text-green-200 text-sm font-medium flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  {successMessage}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white pl-1">
                  Correo electrónico
                </label>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-[#378BA4] group-focus-within:text-white transition-colors z-10" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      disabled={loading}
                      className="relative w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-white pl-1">
                  Contraseña
                </label>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#036280]/20 to-[#378BA4]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-[#378BA4] group-focus-within:text-white transition-colors z-10" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={loading}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !loading) {
                          handleSubmit();
                        }
                      }}
                      className="relative w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="absolute right-4 text-[#378BA4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10 p-1"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

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

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      Iniciar Sesión
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </button>
            </div>

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

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Conexión segura
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Datos protegidos
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#378BA4] rounded-full blur-md opacity-60 animate-float"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#036280] rounded-full blur-md opacity-60 animate-float-reverse"></div>
      </div>

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