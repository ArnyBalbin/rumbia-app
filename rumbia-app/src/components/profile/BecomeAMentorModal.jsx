import { useState } from "react";
import { X, Star } from "lucide-react";

const BecomeAMentorModal = ({ isOpen, onClose, onSave, userData }) => {
  const [formData, setFormData] = useState({
    career: "",
    alt_career: "",
    language: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error al convertir a mentor:", error);
      alert("Error al convertir a mentor");
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
          <h2 className="text-2xl font-bold text-white mb-2">
            Conviértete en Mentor
          </h2>
          <p className="text-gray-400">
            Completa tu perfil de mentor para comenzar a ayudar a otros
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ID de Carrera <span className="text-gray-500">(opcional)</span>
            </label>
            <input
              type="text"
              name="career"
              value={formData.career}
              onChange={handleChange}
              placeholder="Ej: 1, 2, 3..."
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Si conoces el ID de tu carrera en el sistema, ingrésalo aquí
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Carrera / Especialidad
            </label>
            <input
              type="text"
              name="alt_career"
              value={formData.alt_career}
              onChange={handleChange}
              placeholder="Ej: Ingeniería de Software, Medicina"
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Idioma(s)
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Ej: Español, Inglés, Francés"
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Cuéntanos sobre tu experiencia, habilidades y cómo puedes ayudar a otros estudiantes..."
              className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-sm text-amber-200">
              ⭐ Al convertirte en mentor, podrás ayudar a otros estudiantes compartiendo tu conocimiento y experiencia.
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
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              {loading ? "Procesando..." : "Convertirse en Mentor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeAMentorModal;