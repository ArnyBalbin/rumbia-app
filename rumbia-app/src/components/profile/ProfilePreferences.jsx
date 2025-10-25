import { Heart, Clock, MessageSquare, Sparkles } from 'lucide-react';

const ProfilePreferences = ({ userDetails }) => {
  const isMentor = userDetails.tipo === 'mentor';
  const isLearner = userDetails.tipo === 'learner';
  const learnerProfile = userDetails.learner_profile;
  const mentorProfile = userDetails.mentor_profile;

  return (
    <div className="space-y-6">
      {/* Interests Section */}
      {isLearner && learnerProfile?.interests && learnerProfile.interests.length > 0 && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Heart className="text-[#378BA4]" size={24} />
              Mis Intereses
            </h3>
            <div className="flex flex-wrap gap-3">
              {learnerProfile.interests.map((interest, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all"></div>
                  <div className="relative px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#378BA4]/30 text-white font-medium flex items-center gap-2 hover:scale-105 transition-all">
                    <Sparkles className="text-[#378BA4]" size={16} />
                    {interest}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Section */}
      {isLearner && learnerProfile?.prefered_schedule && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Clock className="text-[#378BA4]" size={24} />
              Horario Preferido
            </h3>
            <div className="inline-flex px-4 py-2 bg-gradient-to-r from-[#2a6d82]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#2a6d82]/30 text-white font-medium">
              <Clock className="text-[#378BA4] mr-2" size={16} />
              {learnerProfile.prefered_schedule === 'dia' ? 'Día (Mañana y tarde)' : 'Noche (Tarde y noche)'}
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