import { useState, useEffect } from "react";
import { X, Star, Plus, Check, Globe, Briefcase, Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const IDIOMAS_COMUNES = [
  "Español", "Inglés", "Quechua", "Portugués", 
  "Francés", "Alemán", "Italiano", "Chino Mandarín", "Japonés"
];

const BecomeAMentorModal = ({ isOpen, onClose, onSave, userData }) => {
  const { getCareers } = useAuth();
  
  const [formData, setFormData] = useState({
    career: "",
    alt_career: "",
    language: [],
    description: "",
  });
  
  const [careersList, setCareersList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCareers, setLoadingCareers] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchCareersData = async () => {
        setLoadingCareers(true);
        const result = await getCareers();
        if (result.success) {
          setCareersList(result.data);
        } else {
          console.error("Error cargando carreras:", result.error);
        }
        setLoadingCareers(false);
      };
      fetchCareersData();
    }
  }, [isOpen, getCareers]);

  const addLanguage = () => {
    if (selectedLanguage && !formData.language.includes(selectedLanguage)) {
      setFormData(prev => ({
        ...prev,
        language: [...prev.language, selectedLanguage]
      }));
      setSelectedLanguage("");
    }
  };

  const removeLanguage = (langToRemove) => {
    setFormData(prev => ({
      ...prev,
      language: prev.language.filter(l => l !== langToRemove)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.language.length === 0) {
      setError("Debes seleccionar al menos un idioma.");
      setLoading(false);
      return;
    }
    if (formData.description.length < 50) {
      setError("La descripción debe ser más detallada (mínimo 50 caracteres).");
      setLoading(false);
      return;
    }

    if (!formData.career && !formData.alt_career.trim()) {
      setError("Por favor selecciona una carrera de la lista o especifica una en el campo de texto.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        language: formData.language.join(', '),
        career: formData.career ? parseInt(formData.career) : null,
      };

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Error al convertir a mentor:", error);
      setError(error.message || "Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Aplicación para Mentor</h2>
              <p className="text-gray-400 text-sm">Únete a nuestro equipo de orientadores</p>
            </div>
          </div>
          <button onClick={onClose} disabled={loading} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
            <div className="mt-0.5 text-red-400">⚠️</div>
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. SELECCIÓN DE CARRERA (Desde BD) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Carrera Principal
              </label>
              <div className="relative">
                <select
                  name="career"
                  value={formData.career}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none appearance-none"
                  disabled={loadingCareers}
                >
                  <option value="" className="bg-[#012E4A]">
                    {loadingCareers ? "Cargando carreras..." : "Selecciona una carrera de la lista..."}
                  </option>
                  {careersList.map((c) => (
                    <option key={c.id_career} value={c.id_career} className="bg-[#012E4A]">
                      {c.name_career}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            {/* 2. CARRERA ALTERNATIVA / ESPECIALIDAD (Texto) */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Search className="w-4 h-4" />
                {formData.career ? "Especialidad (Opcional)" : "¿No encuentras tu carrera?"}
              </label>
              <input
                type="text"
                name="alt_career"
                value={formData.alt_career}
                onChange={handleChange}
                placeholder={formData.career ? "Ej: Cardiología, Derecho Penal..." : "Escribe el nombre de tu carrera aquí..."}
                className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.career 
                  ? "Usa este campo para especificar tu especialidad dentro de la carrera seleccionada."
                  : "Si tu profesión no está en la lista de arriba, escríbela aquí."}
              </p>
            </div>
          </div>

          <div className="border-t border-[#378BA4]/20"></div>

          {/* 3. IDIOMAS */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Idiomas
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none"
              >
                <option value="" className="bg-[#012E4A]">Seleccionar idioma...</option>
                {IDIOMAS_COMUNES
                  .filter(l => !formData.language.includes(l))
                  .map((lang) => (
                    <option key={lang} value={lang} className="bg-[#012E4A]">{lang}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addLanguage}
                disabled={!selectedLanguage}
                className="px-4 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {formData.language.length === 0 && (
                <span className="text-sm text-gray-500 italic">No has seleccionado idiomas</span>
              )}
              {formData.language.map((lang, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-[#378BA4]/20 border border-[#378BA4]/50 rounded-full text-sm text-white animate-fade-in">
                  {lang}
                  <button type="button" onClick={() => removeLanguage(lang)} className="hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 4. DESCRIPCIÓN */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Perfil Profesional
              </label>
              <span className={`text-xs ${formData.description.length < 50 ? 'text-amber-400' : 'text-green-400'}`}>
                {formData.description.length} / 50 min
              </span>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Cuéntanos sobre tu experiencia laboral, tus logros y cómo puedes ayudar a los estudiantes..."
              className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-600 focus:border-[#378BA4] outline-none transition-all resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <span className="animate-spin">⏳</span> : <Check className="w-5 h-5" />}
              {loading ? "Procesando..." : "Activar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeAMentorModal;