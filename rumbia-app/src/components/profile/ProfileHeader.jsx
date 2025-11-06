import { Camera, User } from 'lucide-react';

const ProfileHeader = ({ userDetails, onEditPicture }) => {
  const isMentor = userDetails?.tipo === 'mentor';

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <div className="relative group mb-4">
        <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-[#378BA4]/50 bg-[#036280]/20">
          {userDetails?.profile_picture ? (
            <img 
              src={userDetails.profile_picture} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-20 h-20 text-[#378BA4]" />
            </div>
          )}
          <button 
            onClick={onEditPicture}
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white mb-1">
          {userDetails?.first_name} {userDetails?.last_name}
        </h2>
        <p className="text-sm text-gray-400 mb-3">{userDetails?.email}</p>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          isMentor 
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        }`}>
          {isMentor ? '🎓 Mentor' : '📚 Estudiante'}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;