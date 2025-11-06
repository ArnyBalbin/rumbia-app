import { GraduationCap, BookOpen, Clock, Edit2 } from 'lucide-react';

const ProfilePreferences = ({ userDetails }) => {
  const isMentor = userDetails?.tipo === 'mentor';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Preferencias</h3>
        <p className="text-gray-400 mb-6">
          Administra tus preferencias de aprendizaje y disponibilidad
        </p>
      </div>

      {!isMentor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Educational Level */}
          {userDetails?.educational_level && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#378BA4]" />
                  <h4 className="font-semibold text-white">Nivel Educativo</h4>
                </div>
                <Edit2 className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-300 capitalize">{userDetails.educational_level}</p>
            </div>
          )}

          {/* Current Grade */}
          {userDetails?.current_grade && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#378BA4]" />
                  <h4 className="font-semibold text-white">Grado Actual</h4>
                </div>
                <Edit2 className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-300">{userDetails.current_grade}</p>
            </div>
          )}

          {/* Preferred Schedule */}
          {userDetails?.prefered_schedule && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#378BA4]" />
                  <h4 className="font-semibold text-white">Horario Preferido</h4>
                </div>
                <Edit2 className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-300 capitalize">{userDetails.prefered_schedule}</p>
            </div>
          )}

          {/* Interests */}
          {userDetails?.interests && userDetails.interests.length > 0 && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-5 md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Áreas de Interés</h4>
                <Edit2 className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex flex-wrap gap-2">
                {userDetails.interests.map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-[#378BA4]/20 border border-[#378BA4]/30 rounded-full text-xs text-white font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isMentor && (
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-8 text-center">
          <p className="text-gray-400">Las preferencias de mentor estarán disponibles pronto</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePreferences;