import { GraduationCap, Clock, Star, Sparkles, Check } from 'lucide-react';

const RegisterStep2Learner = ({ 
  learnerData, 
  onChange, 
  onBack, 
  onSubmit, 
  loading 
}) => {
  const educationalLevels = [
    { value: 'secundaria', label: 'Secundaria', icon: GraduationCap },
    { value: 'superior', label: 'Superior', icon: GraduationCap }
  ];

  const currentGrades = [
    { value: 'estudiando_secundaria', label: 'Estudiando Secundaria' },
    { value: 'estudiando_superior', label: 'Estudiando Superior' },
    { value: 'graduado_secundaria', label: 'Graduado de Secundaria' },
    { value: 'graduado_superior', label: 'Graduado Superior' }
  ];

  const scheduleOptions = [
    { value: 'dia', label: 'Día', icon: Clock, desc: 'Mañana y tarde' },
    { value: 'noche', label: 'Noche', icon: Star, desc: 'Tarde y noche' }
  ];

  return (
    <div className="space-y-6">
      {/* Educational Level */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          Nivel educativo terminado
        </label>
        <div className="grid grid-cols-2 gap-4">
          {educationalLevels.map((level) => {
            const IconComponent = level.icon;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => onChange({ target: { name: 'educational_level', value: level.value } })}
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

      {/* Current Grade */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          ¿Qué estás haciendo actualmente?
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {currentGrades.map((grade) => (
            <button
              key={grade.value}
              type="button"
              onClick={() => onChange({ target: { name: 'current_grade', value: grade.value } })}
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

      {/* Schedule Preference */}
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
                onClick={() => onChange({ target: { name: 'prefered_schedule', value: schedule.value } })}
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

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="w-1/3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Atrás
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
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
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </button>
      </div>
    </div>
  );
};

export default RegisterStep2Learner;