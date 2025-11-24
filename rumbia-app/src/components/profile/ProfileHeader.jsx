import { useState, useEffect } from "react";
import { User, Mail, Camera } from "lucide-react";
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

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="relative group w-full flex justify-center">
          
          {/* Contenedor del Avatar (el padre relativo para el botón) */}
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden bg-[#036280]/40 ring-2 ring-[#378BA4]/40 shadow-lg flex items-center justify-center relative z-0">
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
                    className="w-28 h-28 text-[#378BA4]"
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
                  <User className="w-28 h-28 text-[#378BA4]" />
                )}
              </div>
            )}
          </div>
          
          {/* BOTÓN DE CÁMARA MEJORADO */}
          {hasMentor && (
            <button
              onClick={onEditPicture}
              // Posicionamiento absoluto relativo al *padre del avatar*.
              // bottom-0 y right-0 lo lleva a la esquina inferior derecha del padre.
              // translate-x-3 translate-y-3 lo empuja fuera de esa esquina para que flote bien.
              // El `z-10` asegura que esté sobre el avatar.
              className="absolute bottom-2 right-2 md:bottom-3 md:right-3 p-2 bg-[#012E4A] rounded-full border border-[#378BA4]/50 text-[#378BA4] hover:text-white hover:bg-[#378BA4] transition-colors shadow-sm z-10"
              title="Cambiar foto"
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center min-w-0 w-full mt-2">
          <span className="text-xl font-medium text-gray-200 tracking-tight truncate w-full text-center mb-1">
            {userData.first_name} {userData.last_name}
          </span>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-3 w-full">
            <Mail className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{userData.email}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 w-full">
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