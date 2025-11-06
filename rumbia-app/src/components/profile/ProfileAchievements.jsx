import { Award, Lock } from 'lucide-react';

const ProfileAchievements = ({ userDetails }) => {
  const achievements = [
    {
      id: 1,
      title: 'Primera Sesión',
      description: 'Completaste tu primera sesión',
      icon: '🎯',
      unlocked: true,
      date: '15 Oct 2024'
    },
    {
      id: 2,
      title: 'Estudiante Activo',
      description: '5 sesiones completadas',
      icon: '⚡',
      unlocked: true,
      date: '20 Oct 2024'
    },
    {
      id: 3,
      title: 'Explorador',
      description: 'Probaste 3 materias diferentes',
      icon: '🗺️',
      unlocked: true,
      date: '25 Oct 2024'
    },
    {
      id: 4,
      title: 'Dedicación',
      description: '10 sesiones completadas',
      icon: '🔥',
      unlocked: false,
      progress: '7/10'
    },
    {
      id: 5,
      title: 'Maestro',
      description: 'Alcanza calificación perfecta 5 veces',
      icon: '🏆',
      unlocked: false,
      progress: '2/5'
    },
    {
      id: 6,
      title: 'Colaborador',
      description: 'Ayuda a 3 compañeros',
      icon: '🤝',
      unlocked: false,
      progress: '0/3'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Logros</h3>
        <p className="text-gray-400">
          Tus insignias y reconocimientos ganados
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {achievements.filter(a => a.unlocked).length}
          </div>
          <div className="text-xs text-gray-400">Desbloqueados</div>
        </div>
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {achievements.length}
          </div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-[#378BA4] mb-1">
            {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
          </div>
          <div className="text-xs text-gray-400">Completado</div>
        </div>
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {achievements.filter(a => !a.unlocked).length}
          </div>
          <div className="text-xs text-gray-400">Por desbloquear</div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`relative bg-[#036280]/20 border rounded-lg p-5 transition-all ${
              achievement.unlocked 
                ? 'border-[#378BA4]/50 hover:border-[#378BA4] hover:bg-[#036280]/30' 
                : 'border-[#378BA4]/20 opacity-60'
            }`}
          >
            {/* Badge Icon */}
            <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
              {achievement.unlocked ? achievement.icon : '🔒'}
            </div>

            {/* Title and Description */}
            <h4 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
              {achievement.title}
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              {achievement.description}
            </p>

            {/* Date or Progress */}
            {achievement.unlocked ? (
              <div className="flex items-center gap-1 text-xs text-[#378BA4]">
                <Award className="w-3 h-3" />
                <span>Desbloqueado {achievement.date}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Progreso</span>
                  <span className="text-gray-400 font-medium">{achievement.progress}</span>
                </div>
                <div className="w-full bg-[#012E4A] rounded-full h-1.5">
                  <div 
                    className="bg-[#378BA4]/50 h-1.5 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1])) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Locked Overlay */}
            {!achievement.unlocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAchievements;