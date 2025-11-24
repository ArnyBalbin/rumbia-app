import { useState, useEffect } from "react";
import { X, Save, Plus, Check } from "lucide-react";

// --- CONSTANTES Y DATOS (CONTEXTO PERÚ) ---

const NIVELES_EDUCATIVOS = [
  { value: "primaria", label: "Primaria" },
  { value: "secundaria", label: "Secundaria" },
  { value: "pre_universitario", label: "Pre-Universitario / Academia" },
  { value: "universidad", label: "Superior (Universidad/Instituto)" },
];

const GRADOS_POR_NIVEL = {
  primaria: ["1° Grado", "2° Grado", "3° Grado", "4° Grado", "5° Grado", "6° Grado"],
  secundaria: ["1° Año", "2° Año", "3° Año", "4° Año", "5° Año"],
  pre_universitario: ["Ciclo Anual", "Ciclo Semestral", "Ciclo Verano", "Repaso"],
  universidad: ["1er Ciclo", "2do Ciclo", "3er Ciclo", "4to Ciclo", "5to Ciclo", "6to Ciclo", "7mo Ciclo", "8vo Ciclo", "9no Ciclo", "10mo Ciclo", "Egresado"],
};

const LISTA_INTERESES = [
  "Tecnología y Programación", "Arte y Diseño", "Música", "Deportes", 
  "Ciencias (Biología/Química)", "Matemáticas", "Idiomas", "Lectura y Escritura", 
  "Robótica", "Medio Ambiente", "Historia", "Negocios y Emprendimiento", 
  "Psicología", "Videojuegos", "Debate y Oratoria"
];

const LISTA_CARRERAS = [
  "Ingeniería de Sistemas / Software", "Medicina Humana", "Derecho", 
  "Administración de Empresas", "Ingeniería Civil", "Arquitectura", 
  "Diseño Gráfico / Digital", "Psicología", "Contabilidad", 
  "Marketing y Publicidad", "Ingeniería Industrial", "Comunicaciones", 
  "Economía", "Educación", "Biología", "Veterinaria", "Enfermería"
];

const EditLearnerModal = ({ isOpen, onClose, onSave, userData }) => {
  // Helpers para parsear
  const parseInterests = (interestsString) => {
    if (!interestsString) return [];
    if (Array.isArray(interestsString)) return interestsString;
    return interestsString.split(',').map(i => i.trim()).filter(i => i);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    educational_level: "",
    current_grade: "",
    prefered_schedule: "",
    interests: [],
    career_interests: [],
  });

  // Estados temporales para los selects de "Agregar"
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userData) {
      const learner = userData.learner || {};
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        educational_level: learner.educational_level || "",
        current_grade: learner.current_grade || "",
        prefered_schedule: learner.prefered_schedule || "",
        interests: parseInterests(learner.interests),
        career_interests: parseInterests(learner.career_interests),
      });
      setError(null);
    }
  }, [isOpen, userData]);

  // Manejo de cambios generales
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia el nivel educativo, reseteamos el grado
    if (name === "educational_level") {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        current_grade: "" // Reset grado al cambiar nivel
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- LÓGICA DE INTERESES (Sin escritura libre) ---
  const addInterest = () => {
    if (selectedInterest && !formData.interests.includes(selectedInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, selectedInterest]
      }));
      setSelectedInterest(""); // Reset select
    }
  };

  const removeInterest = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== itemToRemove)
    }));
  };

  // --- LÓGICA DE CARRERAS (Sin escritura libre) ---
  const addCareerInterest = () => {
    if (selectedCareer && !formData.career_interests.includes(selectedCareer)) {
      setFormData(prev => ({
        ...prev,
        career_interests: [...prev.career_interests, selectedCareer]
      }));
      setSelectedCareer(""); // Reset select
    }
  };

  const removeCareerInterest = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      career_interests: prev.career_interests.filter(i => i !== itemToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const dataToSend = {
        ...formData,
        interests: formData.interests.join(','),
        career_interests: formData.career_interests.join(',')
      };
      
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setError(error.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Determinar lista de grados según nivel seleccionado
  const gradosDisponibles = GRADOS_POR_NIVEL[formData.educational_level] || [];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Editar Perfil</h2>
            <p className="text-gray-400 text-sm">Actualiza tu información académica y preferencias</p>
          </div>
          <button onClick={onClose} disabled={loading} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nombre</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:ring-1 focus:ring-[#378BA4] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Apellido</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:ring-1 focus:ring-[#378BA4] outline-none transition-all"
              />
            </div>
          </div>

          <div className="border-t border-[#378BA4]/20 my-2"></div>

          {/* SECCIÓN 2: DATOS ACADÉMICOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nivel Educativo</label>
              <select
                name="educational_level"
                value={formData.educational_level}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none appearance-none"
              >
                <option value="" className="bg-[#012E4A] text-gray-400">Seleccionar Nivel...</option>
                {NIVELES_EDUCATIVOS.map((nivel) => (
                  <option key={nivel.value} value={nivel.value} className="bg-[#012E4A]">
                    {nivel.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Grado / Ciclo Actual
              </label>
              <select
                name="current_grade"
                value={formData.current_grade}
                onChange={handleChange}
                disabled={!formData.educational_level}
                className="w-full px-4 py-3 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#012E4A]">
                  {formData.educational_level ? "Seleccionar Grado..." : "Selecciona un nivel primero"}
                </option>
                {gradosDisponibles.map((grado) => (
                  <option key={grado} value={grado} className="bg-[#012E4A]">{grado}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Horario Preferido</label>
             <div className="grid grid-cols-3 gap-3">
               {['mañana', 'tarde', 'noche'].map((schedule) => (
                 <button
                   key={schedule}
                   type="button"
                   onClick={() => setFormData(prev => ({...prev, prefered_schedule: schedule}))}
                   className={`py-2 px-4 rounded-lg border capitalize transition-all ${
                     formData.prefered_schedule === schedule
                       ? "bg-[#378BA4] border-[#378BA4] text-white font-medium shadow-lg"
                       : "bg-transparent border-[#378BA4]/30 text-gray-400 hover:bg-[#378BA4]/10"
                   }`}
                 >
                   {schedule}
                 </button>
               ))}
             </div>
          </div>

          <div className="border-t border-[#378BA4]/20 my-2"></div>

          {/* SECCIÓN 3: INTERESES (TAGS PREDEFINIDOS) */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Mis Intereses
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none"
              >
                <option value="" className="bg-[#012E4A]">Seleccionar interés...</option>
                {LISTA_INTERESES
                  .filter(i => !formData.interests.includes(i)) // Ocultar los ya seleccionados
                  .map((item) => (
                    <option key={item} value={item} className="bg-[#012E4A]">{item}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addInterest}
                disabled={!selectedInterest}
                className="px-4 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags visuales */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {formData.interests.length === 0 && (
                <span className="text-sm text-gray-500 italic">No has seleccionado intereses</span>
              )}
              {formData.interests.map((interest, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-[#378BA4]/20 border border-[#378BA4]/50 rounded-full text-sm text-white animate-fade-in">
                  {interest}
                  <button type="button" onClick={() => removeInterest(interest)} className="hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SECCIÓN 4: CARRERAS DE INTERÉS (TAGS PREDEFINIDOS) */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Carreras que me interesan
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none"
              >
                <option value="" className="bg-[#012E4A]">Seleccionar carrera...</option>
                {LISTA_CARRERAS
                  .filter(c => !formData.career_interests.includes(c))
                  .map((item) => (
                    <option key={item} value={item} className="bg-[#012E4A]">{item}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addCareerInterest}
                disabled={!selectedCareer}
                className="px-4 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {formData.career_interests.length === 0 && (
                 <span className="text-sm text-gray-500 italic">No has seleccionado carreras</span>
              )}
              {formData.career_interests.map((career, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-sm text-amber-100 animate-fade-in">
                  {career}
                  <button type="button" onClick={() => removeCareerInterest(career)} className="hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? <span className="animate-spin">⏳</span> : <Save className="w-5 h-5" />}
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLearnerModal;