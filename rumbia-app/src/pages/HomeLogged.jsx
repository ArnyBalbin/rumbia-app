import { useState, useEffect } from 'react';
import { 
  Home, Users, BookOpen, TrendingUp, Bell, Search, 
  Settings, LogOut, ChevronRight, Sparkles, Award,
  Activity, Calendar, MessageSquare, User, Menu, X
} from 'lucide-react';

const HomeLogged = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchUserData();

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = localStorage.getItem('currentUser');
      const token = localStorage.getItem('accessToken');
      
      console.log('📦 userData desde localStorage:', userData);
      console.log('🔑 token desde localStorage:', token);
      
      if (!userData || !token) {
        console.log('❌ No hay userData o token, redirigiendo a login');
        window.location.href = '/login';
        return;
      }

      const user = JSON.parse(userData);
      console.log('👤 Usuario parseado:', user);
      console.log('🔍 Propiedades del usuario:', Object.keys(user));
      console.log('🆔 user_id:', user.user_id);
      console.log('🆔 id:', user.id);
      console.log('🆔 pk:', user.pk);
      
      // Intentar obtener el ID del usuario de diferentes campos posibles
      const userId = user.user_id || user.id || user.pk;
      console.log('✨ ID final a usar:', userId);
      
      if (!userId) {
        console.error('❌ No se pudo obtener el user_id del usuario');
        console.error('📦 Objeto completo del usuario:', user);
        setLoading(false);
        return;
      }
      
      setCurrentUser(user);

      // Obtener información detallada del usuario
      const url = `https://api-rumbia.onrender.com/api/get-user-info/${userId}/`;
      console.log('🌐 URL de la petición:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📊 Status de la respuesta:', response.status);
      console.log('📊 Status text:', response.statusText);

      if (response.ok) {
        const details = await response.json();
        setUserDetails(details);
        console.log('✅ Datos del usuario obtenidos:', details);
      } else {
        const errorData = await response.text();
        console.error('❌ Error al obtener datos del usuario');
        console.error('❌ Status:', response.status);
        console.error('❌ Error data:', errorData);
      }
    } catch (error) {
      console.error('❌ Error en fetchUserData:', error);
      console.error('❌ Error completo:', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const stats = [
    { icon: BookOpen, label: 'Cursos Activos', value: userDetails?.courses_count || '0', color: 'from-[#378BA4] to-[#036280]' },
    { icon: Award, label: 'Certificados', value: userDetails?.certificates_count || '0', color: 'from-[#036280] to-[#378BA4]' },
    { icon: Activity, label: 'Horas Totales', value: userDetails?.total_hours || '0', color: 'from-[#378BA4] to-[#2a6d82]' },
    { icon: TrendingUp, label: 'Progreso', value: userDetails?.progress ? `${userDetails.progress}%` : '0%', color: 'from-[#2a6d82] to-[#036280]' }
  ];

  const recentCourses = userDetails?.recent_courses || [
    { title: 'Desarrollo Web Avanzado', progress: 75, lessons: 24, instructor: 'Cargando...' },
    { title: 'Machine Learning Básico', progress: 45, lessons: 18, instructor: 'Cargando...' },
    { title: 'Diseño UI/UX', progress: 90, lessons: 12, instructor: 'Cargando...' }
  ];

  const activities = userDetails?.recent_activities || [
    { type: 'completed', text: 'Completaste "Introducción a React"', time: 'Hace 2 horas' },
    { type: 'new', text: 'Nuevo curso disponible: "Python Avanzado"', time: 'Hace 5 horas' },
    { type: 'achievement', text: 'Obtuviste el badge "Estudiante Dedicado"', time: 'Hace 1 día' }
  ];

  const firstName = userDetails?.first_name || currentUser?.first_name || currentUser?.name?.split(' ')[0] || 'Usuario';
  const fullName = userDetails ? `${userDetails.first_name} ${userDetails.last_name}` : currentUser?.name || 'Usuario';
  const userEmail = userDetails?.email || currentUser?.email || 'user@example.com';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#378BA4]/30 border-t-[#378BA4] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#378BA4]/20 rounded-full blur-3xl animate-float"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#036280]/20 rounded-full blur-3xl animate-float-reverse"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
      </div>

      {/* Header */}
      <header className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="bg-white/5 backdrop-blur-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-xl flex items-center justify-center shadow-lg shadow-[#378BA4]/50">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-black text-white">Rumbia</h1>
                  <p className="text-xs text-gray-400">Plataforma de Aprendizaje</p>
                </div>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar cursos, instructores..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all"
                  />
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell size={22} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#378BA4] rounded-full"></span>
                </button>
                
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{fullName}</p>
                    <p className="text-xs text-gray-400">{userEmail}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/5 backdrop-blur-2xl border-b border-white/10">
            <div className="px-4 py-4 space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] transition-all"
                />
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all">
                <Home size={20} />
                <span>Inicio</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all">
                <BookOpen size={20} />
                <span>Mis Cursos</span>
              </button>
              <button 
                onClick={() => window.location.href = '/profile'}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <User size={20} />
                <span>Mi Perfil</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all">
                <Settings size={20} />
                <span>Configuración</span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                ¡Hola, {firstName}! 👋
              </h2>
              <p className="text-gray-400">Continúa tu camino de aprendizaje hoy</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 transition-all transform hover:scale-105">
                Explorar Cursos
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all transform hover:scale-105">
                <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-4 shadow-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <BookOpen className="text-[#378BA4]" size={24} />
                    Continuar Aprendiendo
                  </h3>
                  <button className="text-[#378BA4] hover:text-white transition-colors flex items-center gap-1 font-semibold text-sm">
                    Ver todos
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {recentCourses.map((course, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-bold mb-1">{course.title}</h4>
                            <p className="text-gray-400 text-sm">{course.instructor} • {course.lessons} lecciones</p>
                          </div>
                          <span className="text-[#378BA4] font-bold text-sm">{course.progress}%</span>
                        </div>
                        <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-6">
                  <Activity className="text-[#378BA4]" size={24} />
                  Actividad Reciente
                </h3>

                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'completed' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {activity.type === 'completed' ? '✓' : activity.type === 'new' ? '★' : '🏆'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium mb-1">{activity.text}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all">
                  Ver todo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-black text-white mb-4">Accesos Rápidos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: 'Mi Calendario', color: 'from-[#378BA4] to-[#036280]' },
                  { icon: MessageSquare, label: 'Mensajes', color: 'from-[#036280] to-[#2a6d82]' },
                  { icon: Users, label: 'Comunidad', color: 'from-[#2a6d82] to-[#378BA4]' },
                  { icon: Settings, label: 'Ajustes', color: 'from-[#378BA4] to-[#036280]' }
                ].map((action, index) => (
                  <button key={index} className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all"></div>
                    <div className="relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all text-center">
                      <div className={`inline-flex p-3 bg-gradient-to-r ${action.color} rounded-lg mb-2`}>
                        <action.icon className="text-white" size={20} />
                      </div>
                      <p className="text-white text-sm font-semibold">{action.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeLogged;