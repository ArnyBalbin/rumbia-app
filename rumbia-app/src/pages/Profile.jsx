import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, BookOpen, 
  Clock, Star, Edit, Save, X, Check, Shield, Briefcase,
  Heart, Target, Sparkles, ChevronRight, Camera, Settings,
  GraduationCap, Building2
} from 'lucide-react';

const Profile = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
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

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'preferences', label: 'Preferencias', icon: Heart },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#378BA4]/30 border-t-[#378BA4] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold">Error al cargar el perfil</p>
          <button 
            onClick={() => window.location.href = '/HomeLogged'}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${userDetails.first_name} ${userDetails.last_name}`;
  const isMentor = userDetails.tipo === 'mentor';
  const isLearner = userDetails.tipo === 'learner';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] relative overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="inline-block relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-lg opacity-75"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full flex items-center justify-center border-4 border-[#0a1929] shadow-2xl">
                      <User className="text-white" size={48} />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#378BA4] rounded-full flex items-center justify-center border-4 border-[#0a1929] hover:bg-[#036280] transition-all shadow-lg">
                      <Camera className="text-white" size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-black text-white">{fullName}</h1>
                      {isMentor && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 rounded-full border border-[#378BA4]/50">
                          <Shield className="text-[#378BA4]" size={16} />
                          <span className="text-sm font-bold text-white">Mentor</span>
                        </div>
                      )}
                      {isLearner && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full border border-blue-500/50">
                          <GraduationCap className="text-blue-400" size={16} />
                          <span className="text-sm font-bold text-white">Estudiante</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail size={16} className="text-[#378BA4]" />
                        {userDetails.email}
                      </div>
                      {userDetails.phone && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone size={16} className="text-[#378BA4]" />
                          {userDetails.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={16} className="text-[#378BA4]" />
                        Miembro desde {new Date(userDetails.created_at || Date.now()).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    {isMentor && userDetails.mentor_profile && (
                      <div className="space-y-2 text-sm">
                        {userDetails.mentor_profile.career_name && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Briefcase size={16} className="text-[#378BA4]" />
                            {userDetails.mentor_profile.career_name}
                          </div>
                        )}
                        {userDetails.mentor_profile.college && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Building2 size={16} className="text-[#378BA4]" />
                            {userDetails.mentor_profile.college}
                          </div>
                        )}
                      </div>
                    )}

                    {isLearner && userDetails.learner_profile && (
                      <div className="space-y-2 text-sm">
                        {userDetails.learner_profile.educational_level && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <GraduationCap size={16} className="text-[#378BA4]" />
                            {userDetails.learner_profile.educational_level === 'secundaria' ? 'Secundaria' : 'Superior'}
                          </div>
                        )}
                        {userDetails.learner_profile.current_grade && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <BookOpen size={16} className="text-[#378BA4]" />
                            {userDetails.learner_profile.current_grade.replace(/_/g, ' ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    {isEditing ? (
                      <>
                        <Save size={18} />
                        Guardar
                      </>
                    ) : (
                      <>
                        <Edit size={18} />
                        Editar Perfil
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMentor && userDetails.mentor_profile && (
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { icon: Star, label: 'Calificación', value: userDetails.mentor_profile.rating || '5.0', color: 'from-yellow-400 to-yellow-600' },
              { icon: Users, label: 'Estudiantes', value: userDetails.mentor_profile.students_count || '0', color: 'from-blue-400 to-blue-600' },
              { icon: BookOpen, label: 'Sesiones', value: userDetails.mentor_profile.sessions_count || '0', color: 'from-green-400 to-green-600' },
              { icon: Clock, label: 'Horas', value: userDetails.mentor_profile.total_hours || '0', color: 'from-purple-400 to-purple-600' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all">
                  <div className={`inline-flex p-2 bg-gradient-to-r ${stat.color} rounded-lg mb-2`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-xl blur-lg"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-2">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#378BA4] to-[#036280] text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <User className="text-[#378BA4]" size={24} />
                    Información Personal
                  </h3>
                  {isMentor && userDetails.mentor_profile?.description && (
                    <p className="text-gray-300 mb-4">{userDetails.mentor_profile.description}</p>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {isMentor && userDetails.mentor_profile && (
                      <>
                        {userDetails.mentor_profile.current_semester && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-gray-400 text-sm mb-1">Semestre Actual</p>
                            <p className="text-white font-bold">{userDetails.mentor_profile.current_semester}° Semestre</p>
                          </div>
                        )}
                        {userDetails.mentor_profile.pro_title && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-gray-400 text-sm mb-1">Título Profesional</p>
                            <p className="text-white font-bold">{userDetails.mentor_profile.pro_title}</p>
                          </div>
                        )}
                        {userDetails.mentor_profile.experience_years && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-gray-400 text-sm mb-1">Experiencia</p>
                            <p className="text-white font-bold">{userDetails.mentor_profile.experience_years}</p>
                          </div>
                        )}
                        {userDetails.mentor_profile.graduation_year && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-gray-400 text-sm mb-1">Año de Graduación</p>
                            <p className="text-white font-bold">{userDetails.mentor_profile.graduation_year}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {isLearner && userDetails.learner_profile?.interests && userDetails.learner_profile.interests.length > 0 && (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                      <Heart className="text-[#378BA4]" size={24} />
                      Mis Intereses
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {userDetails.learner_profile.interests.map((interest, idx) => (
                        <div key={idx} className="group relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all"></div>
                          <div className="relative px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#378BA4]/30 text-white font-medium flex items-center gap-2 hover:scale-105 transition-all">
                            <Sparkles className="text-[#378BA4]" size={16} />
                            {interest}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isLearner && userDetails.learner_profile?.prefered_schedule && (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                      <Clock className="text-[#378BA4]" size={24} />
                      Horario Preferido
                    </h3>
                    <div className="inline-flex px-4 py-2 bg-gradient-to-r from-[#2a6d82]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#2a6d82]/30 text-white font-medium">
                      <Clock className="text-[#378BA4] mr-2" size={16} />
                      {userDetails.learner_profile.prefered_schedule === 'dia' ? 'Día (Mañana y tarde)' : 'Noche (Tarde y noche)'}
                    </div>
                  </div>
                </div>
              )}

              {isMentor && userDetails.mentor_profile?.language && (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                      <MessageSquare className="text-[#378BA4]" size={24} />
                      Idiomas
                    </h3>
                    <div className="inline-flex px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-full border border-[#378BA4]/30 text-white font-medium">
                      {userDetails.mentor_profile.language}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Award className="text-[#378BA4]" size={24} />
                  Mis Logros
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Primer Paso', desc: 'Completaste tu perfil', color: 'from-yellow-400 to-yellow-600', unlocked: true },
                    { title: 'Dedicado', desc: '10 horas de mentoría', color: 'from-blue-400 to-blue-600', unlocked: isMentor },
                    { title: 'Estrella Brillante', desc: 'Calificación 5 estrellas', color: 'from-purple-400 to-purple-600', unlocked: false },
                    { title: 'Perseverante', desc: '5 sesiones completadas', color: 'from-green-400 to-green-600', unlocked: false },
                    { title: 'Mentor Popular', desc: '20 estudiantes', color: 'from-orange-400 to-orange-600', unlocked: false },
                    { title: 'Experto', desc: '100 horas de mentoría', color: 'from-red-400 to-red-600', unlocked: false }
                  ].map((achievement, idx) => (
                    <div key={idx} className={`group relative ${!achievement.unlocked && 'opacity-50'}`}>
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all text-center">
                        <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full items-center justify-center mb-3 shadow-lg`}>
                          <Award className="text-white" size={32} />
                        </div>
                        <h4 className="text-white font-bold mb-1">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.desc}</p>
                        {achievement.unlocked && (
                          <div className="mt-2">
                            <span className="text-xs text-green-400 flex items-center justify-center gap-1">
                              <Check size={14} />
                              Desbloqueado
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Settings className="text-[#378BA4]" size={24} />
                  Configuración
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <p className="text-white font-semibold">Notificaciones por email</p>
                      <p className="text-gray-400 text-sm">Recibe actualizaciones en tu correo</p>
                    </div>
                    <button className="w-12 h-6 bg-[#378BA4] rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <p className="text-white font-semibold">Perfil público</p>
                      <p className="text-gray-400 text-sm">Permite que otros usuarios vean tu perfil</p>
                    </div>
                    <button className="w-12 h-6 bg-[#378BA4] rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('currentUser');
                      window.location.href = '/';
                    }}
                    className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default Profile;