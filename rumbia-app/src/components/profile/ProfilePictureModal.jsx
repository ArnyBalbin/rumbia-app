import { useState, useEffect, useRef } from "react";
import { X, Upload, User, AlertCircle, CheckCircle } from "lucide-react";

const ProfilePictureModal = ({ isOpen, onClose, onSave, currentImage }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset states cuando se cierra el modal
      setPreview(null);
      setSelectedFile(null);
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError(null);
    
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError("Solo se permiten archivos JPG, JPEG o PNG");
        return;
      }
      
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe superar los 5MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Por favor selecciona una imagen");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onSave(selectedFile);
      
      if (result?.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Error al subir la foto:", error);
      setError(error.message || "Error al subir la foto de perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Actualizar foto de perfil
          </h2>
          <p className="text-gray-400 text-sm">
            Selecciona una imagen (JPG, PNG - Máx 5MB)
          </p>
        </div>

        {/* Preview de la imagen */}
        <div className="mb-6">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#378BA4]/50 bg-[#036280]/20">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : currentImage ? (
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-[#378BA4]" />
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileSelect}
            className="hidden"
            disabled={loading}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full py-3 bg-[#036280] border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#378BA4] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-5 h-5" />
            Seleccionar Imagen
          </button>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">¡Foto actualizada correctamente!</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !selectedFile || success}
            className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subiendo...
              </span>
            ) : success ? (
              "¡Guardado!"
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;