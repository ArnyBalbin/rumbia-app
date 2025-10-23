import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipo: 'learner'
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
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (formData.email && formData.password && formData.first_name && formData.last_name) {
        console.log('Registro exitoso:', formData);
        setLoading(false);
      } else {
        setError('Por favor completa todos los campos');
        setLoading(false);
      }
    }, 1500);
  };

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
                  <span className="text-lg">⚠️</span>
                  {error}
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
                      emoji: '🎓', 
                      title: 'Estudiante', 
                      desc: 'Busco orientación',
                      gradient: 'from-blue-500/20 to-cyan-500/20'
                    },
                    { 
                      type: 'mentor', 
                      emoji: '👨‍🏫', 
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
                          ? 'border-2 border-[#378BA4] shadow-lg shadow-[#378BA4]/30'
                          : 'border-2 border-white/20 hover:border-[#378BA4]/50'
                      }`}
                    >
                      <div className="relative z-10 text-center space-y-2">
                        <div className="text-4xl group-hover:scale-110 transition-transform">{option.emoji}</div>
                        <div className="font-bold text-white text-base">{option.title}</div>
                        <div className="text-xs text-gray-300">{option.desc}</div>
                      </div>
                      {formData.tipo === option.type && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-[#378BA4] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
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
                onClick={handleSubmit}
                disabled={loading}
                className="group relative w-full py-4 mt-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
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
                <span className="flex items-center gap-1">🔒 Datos seguros</span>
                <span>•</span>
                <span className="flex items-center gap-1">⚡ Registro rápido</span>
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

export default RegisterForm;