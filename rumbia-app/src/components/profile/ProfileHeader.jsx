import { User, Mail, Camera } from "lucide-react";

const ProfileHeader = ({ userData, onEditPicture }) => {
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#378BA4]/50 bg-[#036280]/20">
          {userData.profile_picture ? (
            <img
              src={userData.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-[#378BA4]" />
            </div>
          )}
        </div>
        <button
          onClick={onEditPicture}
          className="absolute bottom-0 right-0 p-2 bg-[#378BA4] rounded-full border-2 border-[#012E4A] hover:bg-[#036280] transition-all"
        >
          <Camera className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">
          {userData.first_name} {userData.last_name}
        </h2>
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          {userData.email}
        </p>
      </div>

      {/* Badges */}
      <div className="flex gap-2 justify-center flex-wrap">
        {hasLearner && (
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full text-xs font-semibold">
            Estudiante
          </span>
        )}
        {hasMentor && (
          <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-300 rounded-full text-xs font-semibold">
            Mentor
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;