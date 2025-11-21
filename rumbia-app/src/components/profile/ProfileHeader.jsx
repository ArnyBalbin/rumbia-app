import { User, Mail, Camera } from "lucide-react";

const ProfileHeader = ({ userData, onEditPicture }) => {
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;

  const mentorImageUrl = userData.mentor?.profile_img 
    ? `http://127.0.0.1:8000${userData.mentor.profile_img}`
    : null;

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#378BA4]/50 bg-[#036280]/20">
          {mentorImageUrl ? (
            <img
              src={mentorImageUrl}
              alt={`${userData.first_name} ${userData.last_name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Si la imagen falla al cargar, mostrar el icono por defecto
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-[#378BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-[#378BA4]" />
            </div>
          )}
        </div>
        
        {/* Botón de cámara solo visible para mentores */}
        {hasMentor && (
          <button
            onClick={onEditPicture}
            className="absolute bottom-0 right-0 p-2 bg-[#378BA4] rounded-full border-2 border-[#012E4A] hover:bg-[#036280] transition-all shadow-lg hover:shadow-xl"
            title="Cambiar foto de perfil"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
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