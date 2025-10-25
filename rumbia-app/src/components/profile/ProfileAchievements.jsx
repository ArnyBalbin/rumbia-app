import { Award, Check } from 'lucide-react';

const ProfileAchievements = ({ userDetails }) => {
  const isMentor = userDetails.tipo === 'mentor';

  const achievements = [
    { 
      title: 'Primer Paso', 
      desc: 'Completaste tu perfil', 
      color: 'from-yellow-400 to-yellow-600', 
      unlocked: true 
    },
    { 
      title: 'Dedicado', 
      desc: '10 horas de mentoría', 
      color: 'from-blue-400 to-blue-600', 
      unlocked: isMentor 
    },
    { 
      title: 'Estrella Brillante', 
      desc: 'Calificación 5 estrellas', 
      color: 'from-purple-400 to-purple-600', 
      unlocked: false 
    },
    { 
      title: 'Perseverante', 
      desc: '5 sesiones completadas', 
      color: 'from-green-400 to-green-600', 
      unlocked: false 
    },
    { 
      title: 'Mentor Popular', 
      desc: '20 estudiantes', 
      color: 'from-orange-400 to-orange-600', 
      unlocked: false 
    },
    { 
      title: 'Experto', 
      desc: '100 horas de mentoría', 
      color: 'from-red-400 to-red-600', 
      unlocked: false 
    }
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <Award className="text-[#378BA4]" size={24} />
          Mis Logros
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, idx) => (
            <div key={idx} className={`group relative ${!achievement.unlocked && 'opacity-50'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all text-center">
                <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full items-center justify-center mb-3 shadow-lg`}>
                  <Award className="text-white" size={32} />
                </div>
                <h4 className="text-white font-bold mb-1">{achievement.title}</h4>
                <p className="text-gray-400 text-sm">{achievement.desc}</p>
                {achievement.unlocked && (
                  <div className="mt-2">
                    <span className="text-xs text-green-400 flex items-center justify-center gap-1">
                      <Check size={14} />
                      Desbloqueado
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAchievements;