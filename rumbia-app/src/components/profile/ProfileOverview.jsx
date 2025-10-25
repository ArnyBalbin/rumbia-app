import { User } from 'lucide-react';

const ProfileOverview = ({ userDetails }) => {
  const isMentor = userDetails.tipo === 'mentor';
  const mentorProfile = userDetails.mentor_profile;

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <User className="text-[#378BA4]" size={24} />
          Información Personal
        </h3>
        
        {isMentor && mentorProfile?.description && (
          <p className="text-gray-300 mb-4">{mentorProfile.description}</p>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          {isMentor && mentorProfile && (
            <>
              {mentorProfile.current_semester && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Semestre Actual</p>
                  <p className="text-white font-bold">{mentorProfile.current_semester}° Semestre</p>
                </div>
              )}
              {mentorProfile.pro_title && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Título Profesional</p>
                  <p className="text-white font-bold">{mentorProfile.pro_title}</p>
                </div>
              )}
              {mentorProfile.experience_years && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Experiencia</p>
                  <p className="text-white font-bold">{mentorProfile.experience_years}</p>
                </div>
              )}
              {mentorProfile.graduation_year && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Año de Graduación</p>
                  <p className="text-white font-bold">{mentorProfile.graduation_year}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;