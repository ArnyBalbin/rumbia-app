import { User, Calendar, GraduationCap, BookOpen, Clock, Briefcase, Globe, FileText } from "lucide-react";

const ProfileOverview = ({ userData }) => {
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;
  const learnerData = userData.learner || {};
  const mentorData = userData.mentor || {};

  return (
    <div className="space-y-6">
      {/* Resumen de Usuario */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Resumen del Perfil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-[#378BA4]" />
              <h4 className="font-semibold text-white">Usuario</h4>
            </div>
            <p className="text-sm text-gray-300">
              Código: <span className="text-white font-mono">{userData.user_code}</span>
            </p>
            <p className="text-sm text-gray-300">
              Nombre: <span className="text-white">{userData.first_name} {userData.last_name}</span>
            </p>
          </div>

          <div className="bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#378BA4]" />
              <h4 className="font-semibold text-white">Cuenta</h4>
            </div>
            <p className="text-sm text-gray-300">
              Email: <span className="text-white">{userData.email}</span>
            </p>
            <p className="text-sm text-gray-300">
              Estado: <span className="text-green-400">Activo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Perfil de Learner */}
      {hasLearner && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Perfil de Estudiante</h3>
          <div className="bg-[#036280]/20 border border-[#378BA4]/20 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nivel Educativo</p>
                  <p className="text-white font-semibold capitalize">
                    {learnerData.educational_level || "No especificado"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Grado Actual</p>
                  <p className="text-white font-semibold">
                    {learnerData.current_grade || "No especificado"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Horario Preferido</p>
                  <p className="text-white font-semibold capitalize">
                    {learnerData.prefered_schedule || "No especificado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Perfil de Mentor */}
      {hasMentor && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Perfil de Mentor</h3>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
            <div className="space-y-4">
              {mentorData.alt_career && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Especialidad</p>
                    <p className="text-white font-semibold">{mentorData.alt_career}</p>
                  </div>
                </div>
              )}
              {mentorData.language && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Idiomas</p>
                    <p className="text-white font-semibold">{mentorData.language}</p>
                  </div>
                </div>
              )}
              {mentorData.description && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Sobre mí</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {mentorData.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;