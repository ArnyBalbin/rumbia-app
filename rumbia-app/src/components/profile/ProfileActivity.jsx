import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, TrendingUp, AlertCircle, BookOpen, Award, CheckCircle, XCircle } from "lucide-react";
import { ENDPOINTS } from "../../../config/api";

const ProfileActivity = ({ userData }) => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    scheduled: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData?.user_code) {
      fetchUserActivity();
    }
  }, [userData]);

  const fetchUserActivity = async () => {
    try {
      setLoading(true);
      setError(null);

      // ELIMINADO: const token = localStorage.getItem("accessToken");
      
      const response = await fetch(ENDPOINTS.GET_SESSIONS, {
        headers: {
          "Content-Type": "application/json",
          // ELIMINADO: Authorization header
        },
        credentials: "include", // <--- AGREGADO
      });

      if (!response.ok) {
        throw new Error("Error al cargar la actividad");
      }
      
      // ... El resto de la lógica se mantiene igual (procesar datos) ...
      const data = await response.json();
      const allSessions = Array.isArray(data.results) 
        ? data.results 
        : Array.isArray(data) 
        ? data 
        : [];

      const userSessions = allSessions.filter(
        session => session.mentor?.user?.user_code === userData.user_code || 
                   session.mentor?.user_code === userData.user_code ||
                   session.user_code === userData.user_code
      );

      const sortedSessions = userSessions.sort((a, b) => 
        new Date(b.schedule_date) - new Date(a.schedule_date)
      );

      setSessions(sortedSessions);

      // Calcular estadísticas
      const statistics = {
        total: sortedSessions.length,
        completed: sortedSessions.filter(s => s.session_status === 'completed').length,
        scheduled: sortedSessions.filter(s => s.session_status === 'scheduled').length,
        cancelled: sortedSessions.filter(s => s.session_status === 'cancelled').length,
      };
      setStats(statistics);

    } catch (err) {
      console.error("Error fetching activity:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      scheduled: {
        label: "Programada",
        icon: Calendar,
        className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        iconColor: "text-blue-400",
      },
      completed: {
        label: "Completada",
        icon: CheckCircle,
        className: "bg-green-500/20 text-green-300 border-green-500/30",
        iconColor: "text-green-400",
      },
      cancelled: {
        label: "Cancelada",
        icon: XCircle,
        className: "bg-red-500/20 text-red-300 border-red-500/30",
        iconColor: "text-red-400",
      },
      in_progress: {
        label: "En Curso",
        icon: TrendingUp,
        className: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        iconColor: "text-amber-400",
      },
    };

    return configs[status] || configs.scheduled;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#378BA4]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 font-semibold">{error}</p>
          <button
            onClick={fetchUserActivity}
            className="mt-4 px-6 py-2 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 font-semibold">No hay actividad reciente</p>
          <p className="text-sm text-gray-500 mt-2">
            Aquí aparecerán tus sesiones y logros
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Actividad Reciente</h3>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#036280]/30 backdrop-blur-sm rounded-lg border border-[#378BA4]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#378BA4]/20 rounded-lg">
              <Calendar className="w-5 h-5 text-[#378BA4]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 backdrop-blur-sm rounded-lg border border-green-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-xs text-gray-400">Completadas</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg border border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.scheduled}</p>
              <p className="text-xs text-gray-400">Programadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActivity;