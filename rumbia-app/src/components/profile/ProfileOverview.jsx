import { Target, Calendar, BarChart3 } from 'lucide-react';

const ProfileOverview = ({ userDetails }) => {
  const recentActivity = [
    { action: 'Completaste la lección', title: 'Álgebra Lineal', time: 'Hace 2 horas' },
    { action: 'Nueva sesión agendada', title: 'Física Cuántica', time: 'Hace 1 día' },
    { action: 'Obtuviste una insignia', title: 'Estudiante Dedicado', time: 'Hace 3 días' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Resumen del perfil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Progress Card */}
          <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-[#378BA4]" />
              <h4 className="font-semibold text-white">Progreso de aprendizaje</h4>
            </div>
            <p className="text-sm text-gray-400 mb-3">Has completado 12 de 20 lecciones este mes</p>
            <div className="w-full bg-[#012E4A] rounded-full h-2">
              <div className="bg-[#378BA4] h-2 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Next Session Card */}
          <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#378BA4]" />
              <h4 className="font-semibold text-white">Próxima sesión</h4>
            </div>
            <p className="text-sm text-gray-400">Matemáticas Avanzadas</p>
            <p className="text-xs text-[#378BA4] mt-1">Viernes, 15:00 PM</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#378BA4]" />
          Actividad reciente
        </h4>
        <div className="space-y-3">
          {recentActivity.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-[#036280]/20 border border-[#378BA4]/20 rounded-lg hover:border-[#378BA4]/40 transition-all">
              <div className="w-2 h-2 bg-[#378BA4] rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-white">{item.action}</p>
                <p className="text-xs text-gray-400">{item.title}</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;