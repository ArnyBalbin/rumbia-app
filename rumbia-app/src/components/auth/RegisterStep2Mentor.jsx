import { GraduationCap, FileText, Globe } from 'lucide-react';

const RegisterStep2Mentor = ({ 
  mentorData, 
  onChange, 
  onBack, 
  onSubmit, 
  loading 
}) => {
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
    { id: 11, name: 'Educación' },
    { id: 12, name: 'Gastronomía' },
    { id: 999, name: 'Otra (especificar)' }
  ];

  const languages = [
    'Español',
    'Inglés',
    'Español e Inglés',
    'Portugués',
    'Francés',
    'Alemán'
  ];

  return (
    <div className="space-y-6">
      {/* Career Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <GraduationCap className="w-4 h-4 inline mr-2" />
          ¿En qué área puedes guiar? <span className="text-red-400">*</span>
        </label>
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
          <select
            name="career"
            value={mentorData.career}
            onChange={onChange}
            disabled={loading}
            className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
          >
            <option value="" className="bg-gray-800">Selecciona una carrera</option>
            {careersList.map(career => (
              <option key={career.id} value={career.id} className="bg-gray-800">
                {career.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {mentorData.career === '999' && (
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
            <input
              type="text"
              name="alt_career"
              placeholder="Especifica tu carrera o área de especialización"
              value={mentorData.alt_career}
              onChange={onChange}
              disabled={loading}
              className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        )}
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <Globe className="w-4 h-4 inline mr-2" />
          Idiomas en los que puedes dar mentoría
        </label>
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#036280]/20 to-[#378BA4]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
          <select
            name="language"
            value={mentorData.language}
            onChange={onChange}
            disabled={loading}
            className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
          >
            {languages.map(lang => (
              <option key={lang} value={lang} className="bg-gray-800">
                {lang}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <FileText className="w-4 h-4 inline mr-2" />
          Cuéntanos sobre ti <span className="text-red-400">*</span>
        </label>
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
          <textarea
            name="description"
            placeholder="¿Qué te hace un buen mentor? ¿Cuál es tu experiencia? ¿Por qué quieres guiar a otros?..."
            value={mentorData.description}
            onChange={onChange}
            disabled={loading}
            rows={5}
            maxLength={350}
            className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed custom-scrollbar"
          />
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 px-1">
          <span>Comparte tu experiencia y motivación para ser mentor</span>
          <span>{mentorData.description?.length || 0}/350</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#378BA4]/10 border border-[#378BA4]/30 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white mb-1">Completa tu perfil después</p>
            <p>Una vez creada tu cuenta, podrás agregar más detalles como experiencia laboral, certificaciones y disponibilidad horaria.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="w-1/3 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Atrás
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || !mentorData.description || (!mentorData.career && !mentorData.alt_career)}
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
                Crear cuenta de mentor
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </button>
      </div>

      <style>{`
        .border-3 {
          border-width: 3px;
        }

        /* Ocultar scrollbar en textarea */
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE y Edge */
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari y Opera */
        }
      `}</style>
    </div>
  );
};

export default RegisterStep2Mentor;