import { User, Heart, Award, Settings } from 'lucide-react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'preferences', label: 'Preferencias', icon: Heart },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-xl blur-lg"></div>
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#378BA4] to-[#036280] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;