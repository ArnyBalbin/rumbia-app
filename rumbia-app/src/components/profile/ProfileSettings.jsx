import { Bell, Lock, Globe, Moon, Trash2, LogOut } from 'lucide-react';
import { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    publicProfile: true,
    darkMode: true,
    language: 'es'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Configuración</h3>
        <p className="text-gray-400">
          Administra las preferencias de tu cuenta
        </p>
      </div>

      {/* Notifications Section */}
      <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-[#378BA4]" />
          <h4 className="font-semibold text-white">Notificaciones</h4>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <div className="text-sm text-white font-medium group-hover:text-[#378BA4] transition-colors">
                Notificaciones por email
              </div>
              <div className="text-xs text-gray-400">
                Recibe actualizaciones en tu correo
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#012E4A] rounded-full peer peer-checked:bg-[#378BA4] transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <div className="text-sm text-white font-medium group-hover:text-[#378BA4] transition-colors">
                Notificaciones push
              </div>
              <div className="text-xs text-gray-400">
                Alertas en tiempo real en tu dispositivo
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#012E4A] rounded-full peer peer-checked:bg-[#378BA4] transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-[#378BA4]" />
          <h4 className="font-semibold text-white">Privacidad</h4>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <div className="text-sm text-white font-medium group-hover:text-[#378BA4] transition-colors">
                Perfil público
              </div>
              <div className="text-xs text-gray-400">
                Permite que otros usuarios vean tu perfil
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.publicProfile}
                onChange={() => handleToggle('publicProfile')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#012E4A] rounded-full peer peer-checked:bg-[#378BA4] transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-5 h-5 text-[#378BA4]" />
          <h4 className="font-semibold text-white">Apariencia</h4>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <div className="text-sm text-white font-medium group-hover:text-[#378BA4] transition-colors">
                Modo oscuro
              </div>
              <div className="text-xs text-gray-400">
                Tema oscuro para mejor visualización
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#012E4A] rounded-full peer peer-checked:bg-[#378BA4] transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-[#378BA4]" />
          <h4 className="font-semibold text-white">Idioma</h4>
        </div>
        <select
          value={settings.language}
          onChange={handleLanguageChange}
          className="w-full px-4 py-2.5 bg-[#012E4A] border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:outline-none transition-all"
        >
          <option value="es" className="bg-[#012E4A]">Español</option>
          <option value="en" className="bg-[#012E4A]">English</option>
          <option value="pt" className="bg-[#012E4A]">Português</option>
        </select>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <h4 className="font-semibold text-red-400 mb-4">Zona de peligro</h4>
        <div className="space-y-3">
          <button className="w-full py-3 bg-transparent border border-red-500/30 text-red-400 font-medium rounded-lg hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" />
            Eliminar cuenta
          </button>
          <button className="w-full py-3 bg-transparent border border-[#378BA4]/30 text-gray-300 font-medium rounded-lg hover:bg-[#036280]/30 transition-all flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;