import { TrendingUp } from "lucide-react";

const ProfileActivity = ({ userData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
      <div className="text-center py-12">
        <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No hay actividad reciente</p>
        <p className="text-sm text-gray-500 mt-2">
          Aquí aparecerán tus sesiones y logros
        </p>
      </div>
    </div>
  );
};

export default ProfileActivity;