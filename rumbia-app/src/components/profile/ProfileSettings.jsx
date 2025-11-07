import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProfileSettings = ({ setUserMenuOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Configuración de Cuenta</h3>
      <div className="space-y-4">
        <div className="bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">Privacidad</h4>
          <p className="text-sm text-gray-400">
            Administra la visibilidad de tu perfil y datos
          </p>
        </div>
        <div className="bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">Notificaciones</h4>
          <p className="text-sm text-gray-400">
            Configura cómo recibes alertas y actualizaciones
          </p>
        </div>
        <button
          onClick={() => {
            handleLogout();
            setUserMenuOpen(false);
          }}
          className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;