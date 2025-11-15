import { User, TrendingUp, Settings, Calendar } from "lucide-react";

const ProfileTabs = ({ activeTab, onTabChange, isMentor }) => {
  const tabs = [
    { id: "overview", label: "Vista General", icon: User },
    { id: "activity", label: "Actividad", icon: TrendingUp },
    ...(isMentor ? [{ id: "sessions", label: "Sesiones", icon: Calendar }] : []),
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="border-b border-[#378BA4]/30">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-white border-b-2 border-[#378BA4] bg-[#378BA4]/10"
                : "text-gray-400 hover:text-white hover:bg-[#036280]/20"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;