import { useState, useEffect, useRef } from "react";
import { X, Upload, User } from "lucide-react";

const ProfilePictureModal = ({ isOpen, onClose, onSave, currentImage }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      await onSave(selectedFile);
      onClose();
    } catch (error) {
      console.error("Error al subir la foto:", error);
      alert("Error al subir la foto de perfil");
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
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Actualizar foto de perfil
          </h2>
          <p className="text-gray-400 text-sm">
            Selecciona una imagen (JPG, PNG, GIF - Max 5MB)
          </p>
        </div>

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
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full py-3 bg-[#036280] border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#378BA4] transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Seleccionar Imagen
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !selectedFile}
            className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50"
          >
            {loading ? "Subiendo..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;