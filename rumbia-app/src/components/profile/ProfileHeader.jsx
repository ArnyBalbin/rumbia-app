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
    <div className="py-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Contenedor de la Imagen */}
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#012E4A] bg-[#036280]/20 shadow-sm ring-2 ring-[#378BA4]/30 flex items-center justify-center">
            {/* 4. Renderizado condicional basado en Estado, no en manipulación del DOM */}
            {mentorImageUrl && !imageError ? (
              <img
                src={mentorImageUrl}
                alt={`${userData.first_name} ${userData.last_name}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)} // Solo cambiamos el estado
              />
            ) : (
              // Fallback visual
              <div className="w-full h-full flex items-center justify-center bg-[#036280]/20">
                {mentorImageUrl ? (
                  // Si había URL pero falló, mostramos el icono de error o usuario
                  <svg
                    className="w-14 h-14 text-[#378BA4]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                ) : (
                  // Si no hay URL, mostramos el icono por defecto
                  <User className="w-14 h-14 text-[#378BA4]/60" />
                )}
              </div>
            )}
          </div>

          {/* Botón de cámara */}
          {hasMentor && (
            <button
              onClick={onEditPicture}
              className="absolute bottom-0 right-0 p-1.5 bg-[#378BA4] rounded-full border-2 border-[#012E4A] text-white shadow-sm hover:bg-[#036280] hover:scale-105 transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
              title="Cambiar foto de perfil"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Información del Usuario */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {userData.first_name} {userData.last_name}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Mail className="w-4 h-4" />
            <span>{userData.email}</span>
          </div>

          <div className="flex gap-2 pt-2">
            {hasLearner && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-700/50">
                Estudiante
              </span>
            )}
            {hasMentor && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/50 text-amber-200 border border-amber-700/50">
                Mentor
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
