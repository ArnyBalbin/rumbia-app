import { User, Mail, Phone, Calendar, Camera, Shield, GraduationCap, Briefcase, Building2, BookOpen, Edit, Save } from 'lucide-react';

const ProfileHeader = ({ userDetails, isEditing, onEditToggle }) => {
  const fullName = `${userDetails.first_name} ${userDetails.last_name}`;
  const isMentor = userDetails.tipo === 'mentor';
  const isLearner = userDetails.tipo === 'learner';

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-3xl blur-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Profile Picture */}
          <div className="relative -mt-16 mb-4">
            <div className="inline-block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-lg opacity-75"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full flex items-center justify-center border-4 border-[#0a1929] shadow-2xl">
                <User className="text-white" size={48} />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#378BA4] rounded-full flex items-center justify-center border-4 border-[#0a1929] hover:bg-[#036280] transition-all shadow-lg">
                <Camera className="text-white" size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Name and Badge */}
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-white">{fullName}</h1>
                {isMentor && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 rounded-full border border-[#378BA4]/50">
                    <Shield className="text-[#378BA4]" size={16} />
                    <span className="text-sm font-bold text-white">Mentor</span>
                  </div>
                )}
                {isLearner && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full border border-blue-500/50">
                    <GraduationCap className="text-blue-400" size={16} />
                    <span className="text-sm font-bold text-white">Estudiante</span>
                  </div>
                )}
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail size={16} className="text-[#378BA4]" />
                  {userDetails.email}
                </div>
                {userDetails.phone && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={16} className="text-[#378BA4]" />
                    {userDetails.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} className="text-[#378BA4]" />
                  Miembro desde {new Date(userDetails.created_at || Date.now()).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Mentor Info */}
              {isMentor && userDetails.mentor_profile && (
                <div className="space-y-2 text-sm">
                  {userDetails.mentor_profile.career_name && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Briefcase size={16} className="text-[#378BA4]" />
                      {userDetails.mentor_profile.career_name}
                    </div>
                  )}
                  {userDetails.mentor_profile.college && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Building2 size={16} className="text-[#378BA4]" />
                      {userDetails.mentor_profile.college}
                    </div>
                  )}
                </div>
              )}

              {/* Learner Info */}
              {isLearner && userDetails.learner_profile && (
                <div className="space-y-2 text-sm">
                  {userDetails.learner_profile.educational_level && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <GraduationCap size={16} className="text-[#378BA4]" />
                      {userDetails.learner_profile.educational_level === 'secundaria' ? 'Secundaria' : 'Superior'}
                    </div>
                  )}
                  {userDetails.learner_profile.current_grade && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <BookOpen size={16} className="text-[#378BA4]" />
                      {userDetails.learner_profile.current_grade.replace(/_/g, ' ')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button 
              onClick={onEditToggle}
              className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save size={18} />
                  Guardar
                </>
              ) : (
                <>
                  <Edit size={18} />
                  Editar Perfil
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;