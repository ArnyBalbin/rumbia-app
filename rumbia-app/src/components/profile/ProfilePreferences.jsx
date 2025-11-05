import { Heart, Clock, MessageSquare, Sparkles } from 'lucide-react';

const ProfilePreferences = ({ userDetails }) => {
  const isMentor = userDetails.tipo === 'mentor';
  const isLearner = userDetails.tipo === 'learner';
  const mentorProfile = userDetails.mentor_profile;

  return (
    <div className="space-y-6">
      {/* Carreras de Interés Section */}
      {isLearner && userDetails.interests && userDetails.interests.length > 0 && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Heart className="text-[#378BA4]" size={24} />
              Carreras que me Interesan
            </h3>
            <div className="flex flex-wrap gap-3">
              {userDetails.interests.map((interest, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all"></div>
                  <div className="relative px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#378BA4]/30 text-white font-medium flex items-center gap-2 hover:scale-105 transition-all">
                    <Sparkles className="text-[#378BA4]" size={16} />
                    {interest}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Total: <span className="font-bold text-white">{userDetails.interests.length}</span> carrera{userDetails.interests.length !== 1 ? 's' : ''} seleccionada{userDetails.interests.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Sin intereses message */}
      {isLearner && (!userDetails.interests || userDetails.interests.length === 0) && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Heart className="text-[#378BA4]" size={24} />
              Carreras que me Interesan
            </h3>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
              <p className="text-gray-400">Aún no has seleccionado ninguna carrera</p>
              <p className="text-gray-500 text-sm mt-2">Dirígete al resumen de tu perfil y haz clic en "Actualizar Mis Intereses" para seleccionar carreras</p>
            </div>
          </div>
        </div>
      )}

      {/* Horario Preferido Section */}
      {isLearner && userDetails.prefered_schedule && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Clock className="text-[#378BA4]" size={24} />
              Horario Preferido
            </h3>
            <div className="inline-flex px-4 py-2 bg-gradient-to-r from-[#2a6d82]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#2a6d82]/30 text-white font-medium">
              <Clock className="text-[#378BA4] mr-2" size={16} />
              {userDetails.prefered_schedule === 'dia' ? 'Día (Mañana y tarde)' : 'Noche (Tarde y noche)'}
            </div>
          </div>
        </div>
      )}

      {/* Nivel Educativo y Estado */}
      {isLearner && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Sparkles className="text-[#378BA4]" size={24} />
              Detalles Educativos
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {userDetails.educational_level && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Nivel Educativo</p>
                  <p className="text-white font-bold">
                    {userDetails.educational_level === 'secundaria' ? 'Secundaria' : 'Superior'}
                  </p>
                </div>
              )}
              {userDetails.current_grade && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Estado Actual</p>
                  <p className="text-white font-bold">
                    {userDetails.current_grade === 'estudiando_secundaria' 
                      ? 'Estudiando Secundaria'
                      : userDetails.current_grade === 'estudiando_superior'
                      ? 'Estudiando Superior'
                      : userDetails.current_grade === 'graduado_secundaria'
                      ? 'Graduado de Secundaria'
                      : 'Graduado Superior'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Language Section */}
      {isMentor && mentorProfile?.language && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <MessageSquare className="text-[#378BA4]" size={24} />
              Idiomas
            </h3>
            <div className="inline-flex px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#378BA4]/30 text-white font-medium">
              {mentorProfile.language}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePreferences;