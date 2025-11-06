import { Users, MessageCircle, Star } from 'lucide-react';

const ProfileStats = ({ mentorProfile }) => {
  if (!mentorProfile) return null;

  const stats = [
    {
      icon: Users,
      label: 'Estudiantes',
      value: mentorProfile.students_helped || 0,
      color: 'text-[#378BA4]'
    },
    {
      icon: MessageCircle,
      label: 'Sesiones',
      value: mentorProfile.total_sessions || 0,
      color: 'text-[#378BA4]'
    },
    {
      icon: Star,
      label: 'Calificación',
      value: `${mentorProfile.rating || 0}/5.0`,
      color: 'text-[#378BA4]'
    }
  ];

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Estadísticas
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-white">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileStats;