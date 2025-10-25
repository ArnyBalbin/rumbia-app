import { User, Mail, Lock, GraduationCap, Briefcase, Check, Eye, EyeOff } from 'lucide-react';

const RegisterStep1 = ({ 
  formData, 
  onChange, 
  onNext, 
  loading, 
  showPassword, 
  onTogglePassword 
}) => {
  return (
    <div className="space-y-5">
      {/* Name and Lastname */}
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
                onChange={onChange}
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
                onChange={onChange}
                placeholder="Tu apellido"
                disabled={loading}
                className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email */}
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
              onChange={onChange}
              placeholder="tu@email.com"
              disabled={loading}
              className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* User Type Selection */}
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
              onClick={() => onChange({ target: { name: 'tipo', value: option.type } })}
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

      {/* Password */}
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
              onChange={onChange}
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
              className="relative w-full pl-12 pr-14 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              disabled={loading}
              className="absolute right-4 text-[#378BA4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10 p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Password */}
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
              onChange={onChange}
              placeholder="Repite tu contraseña"
              disabled={loading}
              className="relative w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={loading}
        className="group relative w-full py-4 mt-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Continuar
          <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
      </button>
    </div>
  );
};

export default RegisterStep1;