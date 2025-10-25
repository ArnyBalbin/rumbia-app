// src/components/auth/RegisterForm.jsx
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AuthCard from './AuthCard';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2Learner from './RegisterStep2Learner';
import RegisterStep2Mentor from './RegisterStep2Mentor';
import AlertMessage from './AlertMessage';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipo: 'learner'
  });

  const [learnerData, setLearnerData] = useState({
    educational_level: '',
    current_grade: '',
    interests: [],
    prefered_schedule: ''
  });

  const [mentorData, setMentorData] = useState({
    id_career: '',
    alt_career: '',
    description: '',
    college: '',
    current_semester: '',
    pro_title: '',
    experience_years: '',
    cv_url: '',
    graduation_year: ''
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    setSuccessMessage('');
  };

  const handleLearnerChange = (e) => {
    const { name, value } = e.target;
    setLearnerData({
      ...learnerData,
      [name]: value
    });
  };

  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setError('Por favor completa todos los campos');
      return;
    }

    setStep(2);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const basePayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        tipo: formData.tipo
      };

      if (formData.tipo === 'mentor') {
        basePayload.language = 'Español';
        basePayload.description = mentorData.description || 'Mentor experimentado en mi área';
        
        if (mentorData.id_career === '999') {
          basePayload.alt_career = mentorData.alt_career;
          basePayload.career = null;
        } else {
          basePayload.career = parseInt(mentorData.id_career);
          basePayload.alt_career = null;
        }

        // Agregar campos adicionales del mentor
        if (mentorData.college) basePayload.college = mentorData.college;
        if (mentorData.current_semester) basePayload.current_semester = mentorData.current_semester;
        if (mentorData.pro_title) basePayload.pro_title = mentorData.pro_title;
        if (mentorData.experience_years) basePayload.experience_years = mentorData.experience_years;
        if (mentorData.graduation_year) basePayload.graduation_year = mentorData.graduation_year;
      }

      console.log('📤 Datos a enviar al registro:', basePayload);

      const result = await register(basePayload);

      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccessMessage('¡Registro exitoso! Bienvenido a Rumbía');
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (err) {
      console.error('❌ Error en registro:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Determinar título y badge según el paso
  const getCardProps = () => {
    if (step === 1) {
      return {
        title: 'Crea tu cuenta',
        subtitle: 'en Rumbía',
        badge: 'Únete a la comunidad'
      };
    }
    
    if (formData.tipo === 'learner') {
      return {
        title: 'Cuéntanos sobre ti',
        subtitle: 'para ayudarte mejor',
        badge: 'Perfil de Estudiante'
      };
    }
    
    return {
      title: 'Completa tu perfil',
      subtitle: 'de mentor',
      badge: 'Perfil de Mentor'
    };
  };

  const cardProps = getCardProps();

  return (
    <div className="w-full max-w-4xl p-4">
      <div 
        className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 0.2}deg) rotateX(${-mousePosition.y * 0.2}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
          <div className="h-1.5 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] animate-gradient-x sticky top-0 z-10"></div>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#378BA4]" />
                <span className="text-sm font-bold text-white">{cardProps.badge}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {cardProps.title}
                <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                  {cardProps.subtitle}
                </span>
              </h2>
              <p className="text-gray-300 text-sm">
                {step === 1 ? 'Comienza tu viaje de orientación vocacional' : 'Completa tu información'}
              </p>
            </div>

            {/* Alerts */}
            <AlertMessage type="error" message={error} />
            <AlertMessage type="success" message={successMessage} />

            {/* Step Content */}
            {step === 1 && (
              <RegisterStep1
                formData={formData}
                onChange={handleChange}
                onNext={handleNextStep}
                loading={loading}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            )}

            {step === 2 && formData.tipo === 'learner' && (
              <RegisterStep2Learner
                learnerData={learnerData}
                onChange={handleLearnerChange}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}

            {step === 2 && formData.tipo === 'mentor' && (
              <RegisterStep2Mentor
                mentorData={mentorData}
                onChange={handleMentorChange}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}

            {/* Login Link (solo en step 1) */}
            {step === 1 && (
              <div className="mt-8 text-center">
                <p className="text-gray-300 text-sm">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-[#378BA4] hover:text-white font-bold inline-flex items-center gap-1 group transition-colors"
                  >
                    Inicia sesión
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Datos seguros
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Registro rápido
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
      `}</style>
    </div>
  );
};

export default RegisterForm;