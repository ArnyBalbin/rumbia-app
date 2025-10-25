import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../config/api';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileOverview from '../components/profile/ProfileOverview';
import ProfilePreferences from '../components/profile/ProfilePreferences';
import ProfileAchievements from '../components/profile/ProfileAchievements';
import ProfileSettings from '../components/profile/ProfileSettings';
import ProfileLoading from '../components/profile/ProfileLoading';

const Profile = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
      
      if (!userData || !token) {
        console.error('No hay datos de usuario o token');
        window.location.href = '/login';
        return;
      }

      const user = JSON.parse(userData);
      const userCode = user.user_code;
      
      if (!userCode) {
        console.error('No se pudo obtener el user_code del usuario');
        console.log('Datos del usuario en localStorage:', user);
        setLoading(false);
        return;
      }

      console.log('Obteniendo datos para user_code:', userCode);
      
      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const details = await response.json();
        console.log('Datos del usuario obtenidos:', details);
        setUserDetails(details);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error al obtener datos del usuario:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error en fetchUserData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) {
    return <ProfileLoading />;
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold mb-2">Error al cargar el perfil</p>
          <p className="text-gray-400 text-sm mb-4">
            Verifica que hayas iniciado sesión correctamente
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const isMentor = userDetails.tipo === 'mentor';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileOverview userDetails={userDetails} />;
      case 'preferences':
        return <ProfilePreferences userDetails={userDetails} />;
      case 'achievements':
        return <ProfileAchievements userDetails={userDetails} />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <ProfileOverview userDetails={userDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ProfileHeader 
            userDetails={userDetails}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
          />
        </div>

        {/* Stats (only for mentors) */}
        {isMentor && userDetails.mentor_profile && (
          <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ProfileStats mentorProfile={userDetails.mentor_profile} />
          </div>
        )}

        {/* Tabs */}
        <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ProfileTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {renderTabContent()}
        </div>
      </div>

      {/* Animations */}
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