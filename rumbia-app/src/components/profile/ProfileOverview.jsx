import { User, Mail, BookOpen, Briefcase, Clock, Sparkles } from 'lucide-react';

const ProfileOverview = ({ userDetails }) => {
  const isMentor = userDetails.tipo === 'mentor';
  const mentorProfile = userDetails.mentor_profile;

  // Mapear valores a labels legibles
  const getEducationalLevelLabel = (level) => {
    const levels = {
      'secundaria': 'Secundaria',
      'superior': 'Superior'
    };
    return levels[level] || level;
  };

  const getCurrentGradeLabel = (grade) => {
    const grades = {
      'estudiando_secundaria': 'Estudiando Secundaria',
      'estudiando_superior': 'Estudiando Superior',
      'graduado_secundaria': 'Graduado de Secundaria',
      'graduado_superior': 'Graduado Superior'
    };
    return grades[grade] || grade;
  };

  const getScheduleLabel = (schedule) => {
    const schedules = {
      'dia': 'Día (Mañana y tarde)',
      'noche': 'Noche (Tarde y noche)'
    };
    return schedules[schedule] || schedule;
  };

  return (
    <div className="space-y-6">
      {/* Información Básica */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <User className="text-[#378BA4]" size={24} />
            Información Básica
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <User size={16} />
                Nombre Completo
              </p>
              <p className="text-white font-bold">
                {userDetails.first_name} {userDetails.last_name}
              </p>
            </div>

            {/* Email */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <Mail size={16} />
                Email
              </p>
              <p className="text-white font-bold break-all">{userDetails.email}</p>
            </div>

            {/* Tipo de Usuario */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <Briefcase size={16} />
                Tipo de Usuario
              </p>
              <p className="text-white font-bold">
                {isMentor ? 'Mentor' : 'Estudiante'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información Educativa (para estudiantes) */}
      {!isMentor && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <BookOpen className="text-[#378BA4]" size={24} />
              Información Educativa
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Nivel Educativo */}
              {userDetails.educational_level && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <BookOpen size={16} />
                    Nivel Educativo
                  </p>
                  <p className="text-white font-bold">
                    {getEducationalLevelLabel(userDetails.educational_level)}
                  </p>
                </div>
              )}

              {/* Estado Actual */}
              {userDetails.current_grade && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Briefcase size={16} />
                    Estado Actual
                  </p>
                  <p className="text-white font-bold">
                    {getCurrentGradeLabel(userDetails.current_grade)}
                  </p>
                </div>
              )}

              {/* Horario Preferido */}
              {userDetails.prefered_schedule && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Clock size={16} />
                    Horario Preferido
                  </p>
                  <p className="text-white font-bold">
                    {getScheduleLabel(userDetails.prefered_schedule)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Carreras de Interés */}
      {!isMentor && userDetails.interests && userDetails.interests.length > 0 && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Sparkles className="text-[#378BA4]" size={24} />
              Mis Intereses
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {userDetails.interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 border border-[#378BA4]/50 rounded-full text-white text-sm font-semibold hover:from-[#378BA4]/30 hover:to-[#036280]/30 transition-all"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Información del Mentor */}
      {isMentor && mentorProfile && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Briefcase className="text-[#378BA4]" size={24} />
              Información Profesional
            </h3>

            {mentorProfile.description && (
              <p className="text-gray-300 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                {mentorProfile.description}
              </p>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              {mentorProfile.pro_title && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Título Profesional</p>
                  <p className="text-white font-bold">{mentorProfile.pro_title}</p>
                </div>
              )}
              {mentorProfile.college && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Universidad</p>
                  <p className="text-white font-bold">{mentorProfile.college}</p>
                </div>
              )}
              {mentorProfile.current_semester && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Semestre Actual</p>
                  <p className="text-white font-bold">{mentorProfile.current_semester}° Semestre</p>
                </div>
              )}
              {mentorProfile.experience_years && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Años de Experiencia</p>
                  <p className="text-white font-bold">{mentorProfile.experience_years}</p>
                </div>
              )}
              {mentorProfile.graduation_year && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <p className="text-gray-400 text-sm mb-1">Año de Graduación</p>
                  <p className="text-white font-bold">{mentorProfile.graduation_year}</p>
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