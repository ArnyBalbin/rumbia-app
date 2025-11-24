import { useState, useEffect } from "react";
import { Calendar, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ProfileActivity = ({ userData }) => {
  const { getSessions } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, scheduled: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData?.user_code) {
      loadActivity();
    }
  }, [userData]);

  const loadActivity = async () => {
    setLoading(true);
    setError(null);

    const result = await getSessions({
        mentor: userData.mentor?.user_code
    });

    if (result.success) {
      const allSessions = Array.isArray(result.data) ? result.data : [];
      
      const userSessions = allSessions.filter(
        session => session.mentor?.user?.user_code === userData.user_code || 
                   session.mentor?.user_code === userData.user_code ||
                   session.user_code === userData.user_code
      );

      const sortedSessions = userSessions.sort((a, b) => 
        new Date(b.schedule_date) - new Date(a.schedule_date)
      );

      setSessions(sortedSessions);
      setStats({
        total: sortedSessions.length,
        completed: sortedSessions.filter(s => s.session_status === 'completed').length,
        scheduled: sortedSessions.filter(s => s.session_status === 'scheduled').length,
        cancelled: sortedSessions.filter(s => s.session_status === 'cancelled').length,
      });
    } else {
      setError(result.error || "Error al cargar la actividad");
    }
    setLoading(false);
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
          <button onClick={loadActivity} className="mt-4 px-6 py-2 bg-[#378BA4] text-white rounded-lg hover:bg-[#036280] transition-all">
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
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Actividad Reciente</h3>
      </div>

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