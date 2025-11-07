import { Users, Award, Clock, Star } from "lucide-react";

const ProfileStats = ({ mentorData }) => {
  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Estadísticas de Mentor
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-gray-300">Sesiones</span>
          </div>
          <span className="text-white font-bold">0</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-gray-300">Calificación</span>
          </div>
          <span className="text-white font-bold">N/A</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-gray-300">Horas</span>
          </div>
          <span className="text-white font-bold">0h</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;