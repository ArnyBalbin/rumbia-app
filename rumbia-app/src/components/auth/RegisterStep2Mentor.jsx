import { useState, useEffect } from 'react';
import { GraduationCap, FileText, Globe } from 'lucide-react';
import { ENDPOINTS } from '../../../config/api';

const RegisterStep2Mentor = ({ 
  mentorData, 
  onChange, 
  onBack, 
  onSubmit, 
  loading 
}) => {
  const [careers, setCareers] = useState([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [errorCareers, setErrorCareers] = useState(null);

  const languages = [
    'Español',
    'Inglés',
    'Español e Inglés',
    'Portugués',
    'Francés',
    'Alemán'
  ];

  // Fetch careers from API
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoadingCareers(true);
        setErrorCareers(null);

        const response = await fetch(ENDPOINTS.GET_CAREERS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar las carreras');
        }

        const data = await response.json();
        
        // Agregar opción "Otra" al final
        const careersWithOther = [
          ...data,
          { id_career: 999, name_career: 'Otra (especificar)' }
        ];
        
        setCareers(careersWithOther);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setErrorCareers(err.message);
        
        // Fallback: carreras básicas si falla el fetch
        setCareers([
          { id_career: 999, name_career: 'Otra (especificar)' }
        ]);
      } finally {
        setLoadingCareers(false);
      }
    };

    fetchCareers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Career Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <GraduationCap className="w-4 h-4 inline mr-2" />
          ¿En qué área puedes guiar? <span className="text-red-400">*</span>
        </label>
        
        {errorCareers && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-300">
            ⚠️ {errorCareers}. Puedes especificar tu carrera manualmente.
          </div>
        )}
        
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
          <select
            name="career"
            value={mentorData.career}
            onChange={onChange}
            disabled={loading || loadingCareers}
            className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
          >
            <option value="" className="bg-gray-800">
              {loadingCareers ? 'Cargando carreras...' : 'Selecciona una carrera'}
            </option>
            {careers.map(career => (
              <option 
                key={career.id_career} 
                value={career.id_career} 
                className="bg-gray-800"
              >
                {career.name_career}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {loadingCareers ? (
              <div className="w-5 h-5 border-2 border-[#378BA4]/30 border-t-[#378BA4] rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>
        
        {/* Campo de texto para "Otra carrera" */}
        {mentorData.career === '999' && (
          <div className="group relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-sm group-focus-within:blur-md transition-all"></div>
            <input
              type="text"
              name="alt_career"
              placeholder="Especifica tu carrera o área de especialización"
              value={mentorData.alt_career}
              onChange={onChange}
              disabled={loading}
              maxLength={60}
              className="relative w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="text-xs text-gray-400 mt-1 px-1">
              {mentorData.alt_career?.length || 0}/60 caracteres
            </div>
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
          disabled={
            loading || 
            !mentorData.description || 
            !mentorData.career ||
            (mentorData.career === '999' && !mentorData.alt_career)
          }
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

        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterStep2Mentor;