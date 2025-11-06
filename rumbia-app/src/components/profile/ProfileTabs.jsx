import { User, TrendingUp, Award, Settings } from 'lucide-react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'activity', label: 'Actividad', icon: TrendingUp },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <div className="border-b border-[#378BA4]/20">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-[#378BA4] bg-[#378BA4]/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#036280]/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;