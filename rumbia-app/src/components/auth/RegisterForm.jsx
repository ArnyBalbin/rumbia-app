import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, GraduationCap, Clock, BookOpen, Briefcase, Star, Plus, X, Building2, Calendar, Award, FileText, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
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

  const [mentorType, setMentorType] = useState('');
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
  const [skills, setSkills] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', description: '' });

  const educationalLevels = [
    { value: 'secundaria', label: 'Secundaria', icon: GraduationCap },
    { value: 'superior', label: 'Superior', icon: Building2 }
  ];

  const currentGrades = [
    { value: 'estudiando_secundaria', label: 'Estudiando Secundaria' },
    { value: 'estudiando_superior', label: 'Estudiando Superior' },
    { value: 'graduado_secundaria', label: 'Graduado de Secundaria' },
    { value: 'graduado_superior', label: 'Graduado Superior' }
  ];

  const careerOptions = [
    'Ingeniería de Sistemas', 'Medicina', 'Derecho', 'Administración',
    'Psicología', 'Arquitectura', 'Contabilidad', 'Enfermería',
    'Marketing', 'Diseño Gráfico', 'Educación', 'Gastronomía'
  ];

  const scheduleOptions = [
    { value: 'dia', label: 'Día', icon: Clock, desc: 'Mañana y tarde' },
    { value: 'noche', label: 'Noche', icon: Star, desc: 'Tarde y noche' }
  ];

  const careersList = [
    { id: 1, name: 'Ingeniería de Sistemas' },
    { id: 2, name: 'Medicina' },
    { id: 3, name: 'Derecho' },
    { id: 4, name: 'Administración' },
    { id: 5, name: 'Psicología' },
    { id: 6, name: 'Arquitectura' },
    { id: 7, name: 'Contabilidad' },
    { id: 8, name: 'Enfermería' },
    { id: 9, name: 'Marketing' },
    { id: 10, name: 'Diseño Gráfico' },
    { id: 999, name: 'Otra (especificar)' }
  ];

  const skillsList = [
    'Liderazgo', 'Trabajo en equipo', 'Comunicación', 'Programación',
    'Análisis de datos', 'Gestión de proyectos', 'Creatividad', 'Resolución de problemas',
    'Idiomas', 'Marketing digital', 'Diseño', 'Finanzas'
  ];

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

  const toggleInterest = (interest) => {
    setLearnerData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleSkill = (skill) => {
    setSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setWorkExperiences([...workExperiences, { ...newExperience }]);
      setNewExperience({ company: '', position: '', duration: '', description: '' });
    }
  };

  const removeExperience = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
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
      }

      console.log('📤 Datos a enviar al registro:', basePayload);

      const registerResponse = await fetch('https://api-rumbia.onrender.com/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basePayload)
      });

      const registerData = await registerResponse.json();
      console.log('📥 Respuesta del registro:', registerData);

      if (!registerResponse.ok) {
        console.error('❌ Error en registro:', registerData);
        throw new Error(registerData.detail || registerData.message || 'Error en registro');
      }

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
        throw new Error('Error al iniciar sesión');
      }

      const token = loginData.access;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('currentUser', JSON.stringify(loginData));
      
      console.log('✅ Registro completo exitoso');
      
      setSuccessMessage('¡Registro exitoso! Bienvenido a Rumbía');
      
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

  if (step === 1) {
    return (
      <div className="w-full max-w-2xl p-4">
        <div 
          className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.2}deg) rotateX(${-mousePosition.y * 0.2}deg)`,
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
                  <span className="text-sm font-bold text-white">Únete a la comunidad</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  Crea tu cuenta
                  <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                    en Rumbía
                  </span>
                </h2>
                <p className="text-gray-300 text-sm">Comienza tu viaje de orientación vocacional</p>
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

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-white pl-1">
                      Nombre
                    </label>
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <div className="relative flex items-center">
                        <User className="absolute left-4 text-[#378BA4] group-focus-within:text-white transition-colors z-10" size={20} />
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          disabled={loading}
                          className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-white pl-1">
                      Apellido
                    </label>
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#036280]/20 to-[#378BA4]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <div className="relative flex items-center">
                        <User className="absolute left-4 text-[#378BA4] group-focus-within:text-white transition-colors z-10" size={20} />
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Tu apellido"
                          disabled={loading}
                          className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                        className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white pl-1">
                    ¿Cómo quieres usar Rumbía?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { 
                        type: 'learner', 
                        Icon: GraduationCap, 
                        title: 'Estudiante', 
                        desc: 'Busco orientación',
                        gradient: 'from-blue-500/20 to-cyan-500/20'
                      },
                      { 
                        type: 'mentor', 
                        Icon: Briefcase, 
                        title: 'Mentor', 
                        desc: 'Quiero guiar',
                        gradient: 'from-purple-500/20 to-pink-500/20'
                      }
                    ].map((option) => (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => setFormData({ ...formData, tipo: option.type })}
                        disabled={loading}
                        className={`group relative p-5 bg-gradient-to-br ${option.gradient} backdrop-blur-xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
                          formData.tipo === option.type
                            ? 'border-2 border-white shadow-lg shadow-white/30'
                            : 'border-2 border-white/20 hover:border-white/50'
                        }`}
                      >
                        <div className="relative z-10 text-center space-y-2">
                          <option.Icon className="w-10 h-10 mx-auto text-white group-hover:scale-110 transition-transform" />
                          <div className="font-bold text-white text-base">{option.title}</div>
                          <div className="text-xs text-gray-300">{option.desc}</div>
                        </div>
                        {formData.tipo === option.type && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-[#036280]" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    ))}
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
                        placeholder="Mínimo 6 caracteres"
                        disabled={loading}
                        className="relative w-full pl-12 pr-14 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
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

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-white pl-1">
                    Confirmar contraseña
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 text-[#378BA4] group-focus-within:text-white transition-colors z-10" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        disabled={loading}
                        className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={loading}
                  className="group relative w-full py-4 mt-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Continuar
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </button>
              </div>

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

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
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

          .border-3 {
            border-width: 3px;
          }
        `}</style>
      </div>
    );
  }

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
            <div className="text-center mb-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg">
                {formData.tipo === 'learner' ? (
                  <><GraduationCap className="w-4 h-4 text-[#378BA4]" />
                  <span className="text-sm font-bold text-white">Perfil de Estudiante</span></>
                ) : (
                  <><Briefcase className="w-4 h-4 text-[#378BA4]" />
                  <span className="text-sm font-bold text-white">Perfil de Mentor</span></>
                )}
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {formData.tipo === 'learner' ? 'Cuéntanos sobre ti' : 'Completa tu perfil'}
                <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                  {formData.tipo === 'learner' ? 'para ayudarte mejor' : 'de mentor'}
                </span>
              </h2>
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

            {formData.tipo === 'learner' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white pl-1">
                    Nivel educativo terminado
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {educationalLevels.map((level) => {
                      const IconComponent = level.icon;
                      return (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setLearnerData({ ...learnerData, educational_level: level.value })}
                          disabled={loading}
                          className={`group relative p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                            learnerData.educational_level === level.value
                              ? 'border-2 border-white shadow-lg shadow-white/30'
                              : 'border-2 border-white/20 hover:border-white/50'
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <IconComponent className="w-8 h-8 mx-auto text-white" />
                            <div className="font-bold text-white text-sm">{level.label}</div>
                          </div>
                          {learnerData.educational_level === level.value && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white pl-1">
                    ¿Qué estás haciendo actualmente?
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentGrades.map((grade) => (
                      <button
                        key={grade.value}
                        type="button"
                        onClick={() => setLearnerData({ ...learnerData, current_grade: grade.value })}
                        disabled={loading}
                        className={`group relative p-4 bg-white/10 backdrop-blur-xl rounded-xl transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                          learnerData.current_grade === grade.value
                            ? 'border-2 border-white shadow-lg shadow-white/30'
                            : 'border-2 border-white/20 hover:border-white/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{grade.label}</span>
                          {learnerData.current_grade === grade.value && (
                            <Check className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white pl-1">
                    Carreras que te interesan (selecciona varias)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2 bg-black/20 rounded-xl">
                    {careerOptions.map((career) => (
                      <button
                        key={career}
                        type="button"
                        onClick={() => toggleInterest(career)}
                        disabled={loading}
                        className={`group relative p-3 bg-white/10 backdrop-blur-xl rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          learnerData.interests.includes(career)
                            ? 'border-2 border-white shadow-lg shadow-white/30'
                            : 'border-2 border-white/20 hover:border-white/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-white text-sm">{career}</span>
                          {learnerData.interests.includes(career) && (
                            <Check className="w-4 h-4 text-white flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {learnerData.interests.length > 0 && (
                    <div className="text-xs text-gray-300 pl-1">
                      {learnerData.interests.length} carrera{learnerData.interests.length !== 1 ? 's' : ''} seleccionada{learnerData.interests.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white pl-1">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Horario preferido para sesiones
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {scheduleOptions.map((schedule) => {
                      const IconComponent = schedule.icon;
                      return (
                        <button
                          key={schedule.value}
                          type="button"
                          onClick={() => setLearnerData({ ...learnerData, prefered_schedule: schedule.value })}
                          disabled={loading}
                          className={`group relative p-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                            learnerData.prefered_schedule === schedule.value
                              ? 'border-2 border-white shadow-lg shadow-white/30'
                              : 'border-2 border-white/20 hover:border-white/50'
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <IconComponent className="w-10 h-10 mx-auto text-white" />
                            <div className="font-bold text-white">{schedule.label}</div>
                            <div className="text-xs text-gray-300">{schedule.desc}</div>
                          </div>
                          {learnerData.prefered_schedule === schedule.value && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {formData.tipo === 'mentor' && (
              <>
                {!mentorType ? (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">¿Cuál es tu perfil?</h3>
                      <p className="text-gray-300 text-sm">Selecciona la opción que mejor te describe</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <button
                        type="button"
                        onClick={() => setMentorType('student')}
                        className="group relative p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="text-center space-y-4">
                          <GraduationCap className="w-16 h-16 mx-auto text-white" />
                          <h3 className="text-2xl font-bold text-white">Estudiante</h3>
                          <p className="text-gray-300 text-sm">Actualmente cursando una carrera universitaria</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMentorType('professional')}
                        className="group relative p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="text-center space-y-4">
                          <Briefcase className="w-16 h-16 mx-auto text-white" />
                          <h3 className="text-2xl font-bold text-white">Profesional</h3>
                          <p className="text-gray-300 text-sm">Ya graduado y con experiencia laboral</p>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-white pl-1">
                        <GraduationCap className="w-4 h-4 inline mr-2" />
                        {mentorType === 'student' ? 'Tu carrera' : 'Carrera profesional'}
                      </label>
                      <select
                        value={mentorData.id_career}
                        onChange={(e) => setMentorData({ ...mentorData, id_career: e.target.value })}
                        disabled={loading}
                        className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="" className="bg-gray-800">Selecciona una carrera</option>
                        {careersList.map(career => (
                          <option key={career.id} value={career.id} className="bg-gray-800">
                            {career.name}
                          </option>
                        ))}
                      </select>
                      
                      {mentorData.id_career === '999' && (
                        <input
                          type="text"
                          placeholder="Especifica tu carrera"
                          value={mentorData.alt_career}
                          onChange={(e) => setMentorData({ ...mentorData, alt_career: e.target.value })}
                          disabled={loading}
                          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-white pl-1">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        {mentorType === 'student' ? 'Universidad/Instituto' : 'Institución donde estudiaste'}
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre de la institución"
                        value={mentorData.college}
                        onChange={(e) => setMentorData({ ...mentorData, college: e.target.value })}
                        disabled={loading}
                        className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-white pl-1">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Descripción profesional
                      </label>
                      <textarea
                        placeholder="Cuéntanos sobre tu experiencia y qué te hace un buen mentor..."
                        value={mentorData.description}
                        onChange={(e) => setMentorData({ ...mentorData, description: e.target.value })}
                        disabled={loading}
                        rows={3}
                        className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {mentorType === 'student' && (
                      <div className="space-y-3">
                        <label className="block text-sm font-bold text-white pl-1">
                          <BookOpen className="w-4 h-4 inline mr-2" />
                          Semestre/Ciclo actual
                        </label>
                        <select
                          value={mentorData.current_semester}
                          onChange={(e) => setMentorData({ ...mentorData, current_semester: e.target.value })}
                          disabled={loading}
                          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="" className="bg-gray-800">Selecciona tu semestre</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={i + 1} className="bg-gray-800">
                              {i + 1}° Semestre
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {mentorType === 'professional' && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <label className="block text-sm font-bold text-white pl-1">
                              <Award className="w-4 h-4 inline mr-2" />
                              Título profesional
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Ingeniero de Sistemas"
                              value={mentorData.pro_title}
                              onChange={(e) => setMentorData({ ...mentorData, pro_title: e.target.value })}
                              disabled={loading}
                              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="block text-sm font-bold text-white pl-1">
                              <Calendar className="w-4 h-4 inline mr-2" />
                              Año de graduación
                            </label>
                            <input
                              type="number"
                              placeholder="2020"
                              min="1950"
                              max="2025"
                              value={mentorData.graduation_year}
                              onChange={(e) => setMentorData({ ...mentorData, graduation_year: e.target.value })}
                              disabled={loading}
                              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-white pl-1">
                            <Briefcase className="w-4 h-4 inline mr-2" />
                            Años de experiencia
                          </label>
                          <select
                            value={mentorData.experience_years}
                            onChange={(e) => setMentorData({ ...mentorData, experience_years: e.target.value })}
                            disabled={loading}
                            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="" className="bg-gray-800">Selecciona tus años de experiencia</option>
                            <option value="1-2" className="bg-gray-800">1-2 años</option>
                            <option value="3-5" className="bg-gray-800">3-5 años</option>
                            <option value="6-10" className="bg-gray-800">6-10 años</option>
                            <option value="10+" className="bg-gray-800">Más de 10 años</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-white pl-1">
                            <FileText className="w-4 h-4 inline mr-2" />
                            URL de tu CV (opcional)
                          </label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={mentorData.cv_url}
                            onChange={(e) => setMentorData({ ...mentorData, cv_url: e.target.value })}
                            disabled={loading}
                            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-white pl-1">
                        <Star className="w-4 h-4 inline mr-2" />
                        Habilidades (selecciona varias)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 bg-black/20 rounded-xl">
                        {skillsList.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            disabled={loading}
                            className={`group relative p-3 bg-white/10 backdrop-blur-xl rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                              skills.includes(skill)
                                ? 'border-2 border-white shadow-lg shadow-white/30'
                                : 'border-2 border-white/20 hover:border-white/50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-white text-sm">{skill}</span>
                              {skills.includes(skill) && (
                                <Check className="w-4 h-4 text-white flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {skills.length > 0 && (
                        <div className="text-xs text-gray-300 pl-1">
                          {skills.length} habilidad{skills.length !== 1 ? 'es' : ''} seleccionada{skills.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-white pl-1">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Experiencia laboral
                      </label>
                      
                      <div className="space-y-3 p-4 bg-black/20 rounded-xl">
                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Empresa"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                            disabled={loading}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <input
                            type="text"
                            placeholder="Cargo"
                            value={newExperience.position}
                            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                            disabled={loading}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Duración (ej: 2 años)"
                          value={newExperience.duration}
                          onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                          disabled={loading}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <textarea
                          placeholder="Descripción de responsabilidades (opcional)"
                          value={newExperience.description}
                          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                          disabled={loading}
                          rows={2}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                          type="button"
                          onClick={addExperience}
                          disabled={loading || !newExperience.company || !newExperience.position}
                          className="w-full py-2 bg-gradient-to-r from-[#378BA4]/80 to-[#036280]/80 hover:from-[#378BA4] hover:to-[#036280] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                          Agregar experiencia
                        </button>
                      </div>

                      {workExperiences.length > 0 && (
                        <div className="space-y-2">
                          {workExperiences.map((exp, index) => (
                            <div key={index} className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1">
                                  <h4 className="font-bold text-white">{exp.position}</h4>
                                  <p className="text-sm text-gray-300">{exp.company} • {exp.duration}</p>
                                  {exp.description && (
                                    <p className="text-xs text-gray-400 mt-1">{exp.description}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeExperience(index)}
                                  disabled={loading}
                                  className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  if (formData.tipo === 'mentor' && mentorType) {
                    setMentorType('');
                  } else {
                    setStep(1);
                  }
                }}
                disabled={loading}
                className="w-1/3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || (formData.tipo === 'mentor' && !mentorType)}
                className="group relative flex-1 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear cuenta
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </button>
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

export default RegisterForm;