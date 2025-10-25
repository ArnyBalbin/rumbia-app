import { Settings, X } from 'lucide-react';

const ProfileSettings = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <Settings className="text-[#378BA4]" size={24} />
          Configuración
        </h3>
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <p className="text-white font-semibold">Notificaciones por email</p>
              <p className="text-gray-400 text-sm">Recibe actualizaciones en tu correo</p>
            </div>
            <button className="w-12 h-6 bg-[#378BA4] rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>

          {/* Public Profile */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <p className="text-white font-semibold">Perfil público</p>
              <p className="text-gray-400 text-sm">Permite que otros usuarios vean tu perfil</p>
            </div>
            <button className="w-12 h-6 bg-[#378BA4] rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <X size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;