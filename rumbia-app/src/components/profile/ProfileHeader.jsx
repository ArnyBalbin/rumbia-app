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
    <div className="w-full py-6 border-b border-[#378BA4]/20 mb-6">
      <div className="flex flex-row items-start gap-5 md:gap-6">
        
        {/* --- 1. AVATAR (Estilo GitHub: Limpio, alineado arriba) --- */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-[#036280]/20 ring-1 ring-[#378BA4]/40 shadow-sm flex items-center justify-center">
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
                    className="w-10 h-10 text-[#378BA4]"
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
                  <User className="w-10 h-10 text-[#378BA4]" />
                )}
              </div>
            )}
          </div>

          {/* Botón de cámara: Más discreto, aparece en hover (desktop) o siempre visible pero sutil (móvil) */}
          {hasMentor && (
            <button
              onClick={onEditPicture}
              className="absolute bottom-0 -right-1 p-1.5 bg-[#012E4A] rounded-full border border-[#378BA4]/50 text-[#378BA4] hover:text-white hover:bg-[#378BA4] transition-all shadow-sm"
              title="Cambiar foto"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* --- 2. INFORMACIÓN (Alineación estricta a la izquierda) --- */}
        <div className="flex flex-col items-start pt-1 min-w-0">
          
          {/* Nombre: Reducido de tamaño, mejor interlineado */}
          <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug truncate max-w-full">
            {userData.first_name} {userData.last_name}
          </h1>

          {/* Email: Estilo "Metadata" gris suave */}
          <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1 mb-3">
            <Mail className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{userData.email}</span>
          </div>

          {/* Badges: Estilo Tags/Pills refinados */}
          <div className="flex flex-wrap gap-2">
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