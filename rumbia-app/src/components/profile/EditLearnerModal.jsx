import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";

const EditLearnerModal = ({ isOpen, onClose, onSave, userData }) => {
  // Función helper para parsear intereses
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
  
  const [newInterest, setNewInterest] = useState('');
  const [newCareerInterest, setNewCareerInterest] = useState('');
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const addCareerInterest = () => {
    if (newCareerInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        career_interests: [...prev.career_interests, newCareerInterest.trim()]
      }));
      setNewCareerInterest('');
    }
  };

  const removeCareerInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      career_interests: prev.career_interests.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convertir arrays a strings antes de enviar
      const dataToSend = {
        ...formData,
        interests: formData.interests.join(','),
        career_interests: formData.career_interests.join(',')
      };
      
      await onSave(dataToSend);
      
      // Mostrar mensaje de éxito
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[60] animate-fade-in';
      successMsg.textContent = '✅ Perfil actualizado correctamente';
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
      onClose();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setError(error.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Editar perfil</h2>
          <p className="text-gray-400">Actualiza tu información personal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={userData?.email || ""}
              disabled
              className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/20 rounded-lg text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              El correo no puede ser modificado
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nivel Educativo
            </label>
            <select
              name="educational_level"
              value={formData.educational_level}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:outline-none transition-all"
            >
              <option value="" className="bg-[#012E4A]">
                Seleccionar...
              </option>
              <option value="primaria" className="bg-[#012E4A]">
                Primaria
              </option>
              <option value="secundaria" className="bg-[#012E4A]">
                Secundaria
              </option>
              <option value="preparatoria" className="bg-[#012E4A]">
                Preparatoria
              </option>
              <option value="universidad" className="bg-[#012E4A]">
                Universidad
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Grado Actual
            </label>
            <input
              type="text"
              name="current_grade"
              value={formData.current_grade}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
              placeholder="Ej: 5to grado, 3er año"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Horario Preferido
            </label>
            <select
              name="prefered_schedule"
              value={formData.prefered_schedule}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:outline-none transition-all"
            >
              <option value="" className="bg-[#012E4A]">
                Seleccionar...
              </option>
              <option value="mañana" className="bg-[#012E4A]">
                Mañana
              </option>
              <option value="tarde" className="bg-[#012E4A]">
                Tarde
              </option>
              <option value="noche" className="bg-[#012E4A]">
                Noche
              </option>
            </select>
          </div>

          {/* Intereses Generales */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Intereses Generales
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest();
                  }
                }}
                placeholder="Ej: Programación, Diseño, Marketing..."
                className="flex-1 px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2.5 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#378BA4]/20 border border-[#378BA4]/40 rounded-full text-sm text-white"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(index)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Intereses de Carrera */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Carreras de Interés
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCareerInterest}
                onChange={(e) => setNewCareerInterest(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCareerInterest();
                  }
                }}
                placeholder="Ej: Ingeniería de Software, Medicina..."
                className="flex-1 px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={addCareerInterest}
                className="px-4 py-2.5 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.career_interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-sm text-white"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeCareerInterest(index)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              💡 Los cambios se guardarán inmediatamente y se reflejarán en tu perfil
            </p>
          </div>

          <div className="flex gap-3 pt-4">
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
              className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLearnerModal;