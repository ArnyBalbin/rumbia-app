import { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
import { BASE_URL } from "../../../config/api";

const ProfileHeader = ({ userData, onEditPicture }) => {
  const [imageError, setImageError] = useState(false);
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;

  const mentorImageUrl = userData.mentor?.profile_img
    ? `${BASE_URL}${userData.mentor.profile_img}`
    : null;

  useEffect(() => {
    setImageError(false);
  }, [mentorImageUrl]);

  const AvatarContent = (
    <div className="relative pt-[100%] rounded-full overflow-hidden bg-[#036280]/40 ring-2 ring-[#378BA4]/40 shadow-lg flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {mentorImageUrl && !imageError ? (
          <img
            src={mentorImageUrl}
            alt={`${userData.first_name} ${userData.last_name}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#012E4A]">
            {mentorImageUrl ? (
              <svg
                className="w-16 h-16 md:w-20 md:h-20 text-[#378BA4] transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            ) : (
              <User className="w-16 h-16 md:w-20 md:h-20 text-[#378BA4] transition-all duration-300" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="relative group w-full flex justify-center">
          {hasMentor ? (
            <div className="flex flex-col items-center w-full max-w-xs md:max-w-sm lg:max-w-md">
              <button
                onClick={onEditPicture}
                className="p-0 border-none bg-transparent cursor-pointer focus:outline-none w-full"
              >
                {AvatarContent}
              </button>
              <button
                onClick={onEditPicture}
                className="absolute top-full mt-2 px-3 py-1 rounded text-sm font-medium bg-gray-700/80 text-white/90 shadow-md backdrop-blur-sm 
                           hidden group-hover:block transition-all duration-300 transform translate-y-0 hover:bg-gray-600/90 focus:outline-none z-20"
              >
                Cambiar foto de perfil
              </button>
            </div>
          ) : (
            <div className="rounded-full relative w-full max-w-xs md:max-w-sm lg:max-w-md">
              {AvatarContent}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start min-w-0 w-full mt-2">
          <span className="text-xl font-medium text-gray-200 tracking-tight truncate w-full text-left mb-1">
            {userData.first_name} {userData.last_name}
          </span>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3 w-full">
            <Mail className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{userData.email}</span>
          </div>
          <div className="flex flex-wrap justify-start gap-2 w-full">
            {hasMentor && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-200 border border-amber-500/20 select-none">
                Mentor
              </span>
            )}
            {hasLearner && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-500/10 text-blue-200 border border-blue-500/20 select-none">
                Estudiante
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
