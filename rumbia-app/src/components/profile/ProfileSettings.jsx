import { useState } from "react";
import { LogOut, Save, Lock, User as UserIcon, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProfileSettings = ({ userData }) => {
  const { logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: userData.first_name || "",
    last_name: userData.last_name || "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // Validaciones básicas
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
      };

      // Solo enviar password si el usuario escribió algo
      if (formData.password) {
        payload.password = formData.password;
      }

      const result = await updateUser(payload);

      if (result.success) {
        setMessage({ type: "success", text: "Información actualizada correctamente" });
        // Limpiar campos de contraseña por seguridad
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
      } else {
        setMessage({ type: "error", text: result.error || "Error al actualizar" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ocurrió un error inesperado" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-8">
      
      {/* HEADER CON BOTÓN DE LOGOUT EN LA ESQUINA */}
      <div className="flex items-center justify-between border-b border-[#378BA4]/30 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Configuración de Cuenta</h3>
          <p className="text-sm text-gray-400">Actualiza tus datos de acceso y seguridad</p>
        </div>
      </div>

      {/* MENSAJES DE ESTADO */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/30 text-green-300' 
            : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* FORMULARIO */}
      <form onSubmit={handleUpdate} className="space-y-6">
        
        {/* Sección: Datos Básicos */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#81E6D9] uppercase tracking-wider flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Datos Personales
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nombre</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Apellido</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-[#378BA4]/20"></div>

        {/* Sección: Seguridad */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-[#81E6D9] uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Seguridad
          </h4>
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg mb-4">
            <p className="text-xs text-amber-200/80">
              Deja estos campos vacíos si no deseas cambiar tu contraseña.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nueva Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Botón de Guardar */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;