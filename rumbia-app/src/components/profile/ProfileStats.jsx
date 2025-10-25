import { Star, Users, BookOpen, Clock } from 'lucide-react';

const ProfileStats = ({ mentorProfile }) => {
  const stats = [
    { 
      icon: Star, 
      label: 'Calificación', 
      value: mentorProfile?.rating || '5.0', 
      color: 'from-yellow-400 to-yellow-600' 
    },
    { 
      icon: Users, 
      label: 'Estudiantes', 
      value: mentorProfile?.students_count || '0', 
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      icon: BookOpen, 
      label: 'Sesiones', 
      value: mentorProfile?.sessions_count || '0', 
      color: 'from-green-400 to-green-600' 
    },
    { 
      icon: Clock, 
      label: 'Horas', 
      value: mentorProfile?.total_hours || '0', 
      color: 'from-purple-400 to-purple-600' 
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all">
            <div className={`inline-flex p-2 bg-gradient-to-r ${stat.color} rounded-lg mb-2`}>
              <stat.icon className="text-white" size={20} />
            </div>
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;