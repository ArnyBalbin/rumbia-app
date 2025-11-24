import { useState, useEffect, useRef } from "react";
import { X, Upload, User, AlertCircle, CheckCircle } from "lucide-react";

const ProfilePictureModal = ({ isOpen, onClose, onSave, currentImage }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPreview(null);
      setSelectedFile(null);
      setError(null);
      setSuccess(false);
      setImageLoadError(false);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError(null);
    
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError("Solo se permiten archivos JPG, JPEG o PNG");
        return;
      }

      if (file.size > 15 * 1024 * 1024) { 
        setError("La imagen no debe superar los 15MB");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Por favor selecciona una imagen primero");
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
      setError(error.message || "Error al subir la foto");
    } finally {
      setLoading(false);
    }
  };

  // Lógica de renderizado de la imagen limpia y sin hacks de DOM
  const renderImage = () => {
    // 1. Si el usuario acaba de seleccionar una foto, MOSTRAR ESA (Prioridad máxima)
    if (preview) {
      return (
        <img 
          src={preview} 
          alt="Previsualización" 
          className="w-full h-full object-cover animate-fade-in" 
        />
      );
    }

    // 2. Si no hay preview, pero hay imagen del backend Y no ha dado error de carga
    if (currentImage && !imageLoadError) {
      return (
        <img
          src={currentImage}
          alt="Actual"
          className="w-full h-full object-cover"
          onError={() => setImageLoadError(true)} // Si falla, cambiamos estado, no DOM
        />
      );
    }

    // 3. Si no hay nada o falló la carga, mostrar icono
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0d1117]">
        <User className="w-20 h-20 text-[#378BA4]/60" />
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#0d1117] rounded-xl border border-[#30363d] p-6 max-w-md w-full shadow-2xl no-scrollbar overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Foto de perfil</h2>
            <p className="text-[#8b949e] text-sm mt-1">
              Selecciona una imagen para previsualizarla.
            </p>
          </div>
          <button onClick={onClose} disabled={loading} className="text-[#8b949e] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zona de Imagen */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-[3px] border-[#012E4A] bg-[#0d1117] shadow-sm ring-2 ring-[#378BA4]/30 relative">
            {renderImage()}
          </div>

          {/* Botones de selección */}
          <div>
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
              className="px-4 py-2 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] font-medium rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-all flex items-center gap-2 text-sm"
            >
              <Upload className="w-4 h-4" />
              Subir foto...
            </button>
            <p className="text-[#8b949e] text-xs mt-2 text-center">JPG o PNG, máx 15MB</p>
          </div>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-md flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 bg-green-900/20 border border-green-500/30 rounded-md flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">Foto actualizada correctamente.</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 border-t border-[#30363d] pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-transparent text-[#c9d1d9] font-medium rounded-md hover:bg-[#30363d] transition-all disabled:opacity-50 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !selectedFile || success}
            className="px-4 py-2 bg-[#238636] text-white font-medium rounded-md hover:bg-[#2ea043] transition-all disabled:opacity-50 disabled:bg-[#238636]/50 flex items-center justify-center gap-2 text-sm min-w-[120px]"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Guardando
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Guardado
              </>
            ) : (
              "Establecer foto"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;