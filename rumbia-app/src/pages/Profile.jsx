import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../config/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileOverview from '../components/profile/ProfileOverview';
import ProfilePreferences from '../components/profile/ProfilePreferences';
import ProfileAchievements from '../components/profile/ProfileAchievements';
import ProfileSettings from '../components/profile/ProfileSettings';
import ProfileLoading from '../components/profile/ProfileLoading';
import { Sparkles, X, Check } from 'lucide-react';

// Modal para seleccionar carreras
const CareerInterestModal = ({ isOpen, onClose, onSave, userDetails }) => {
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  const careerOptions = [
    'Ingeniería de Sistemas', 'Medicina', 'Derecho', 'Administración',
    'Psicología', 'Arquitectura', 'Contabilidad', 'Enfermería',
    'Marketing', 'Diseño Gráfico', 'Educación', 'Gastronomía'
  ];

  useEffect(() => {
    // Cargar intereses existentes
    if (userDetails?.interests && Array.isArray(userDetails.interests)) {
      setSelectedCareers(userDetails.interests);
    }
  }, [userDetails, isOpen]);

  const toggleCareer = (career) => {
    setSelectedCareers(prev => 
      prev.includes(career)
        ? prev.filter(c => c !== career)
        : [...prev, career]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(selectedCareers);
      onClose();
    } catch (error) {
      console.error('Error guardando intereses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-r from-[#378BA4] to-[#036280] p-3 rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-black text-white">Mis Intereses</h2>
          <p className="text-gray-300 mt-2">Selecciona las carreras que te interesan</p>
        </div>

        {/* Carreras Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {careerOptions.map((career) => (
            <button
              key={career}
              onClick={() => toggleCareer(career)}
              disabled={loading}
              className={`p-4 bg-white/10 backdrop-blur-xl rounded-lg transition-all text-left font-medium text-sm disabled:opacity-50 ${
                selectedCareers.includes(career)
                  ? 'border-2 border-white bg-[#378BA4]/20'
                  : 'border-2 border-white/20 hover:border-white/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-white">{career}</span>
                {selectedCareers.includes(career) && (
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        {selectedCareers.length > 0 && (
          <div className="mb-6 p-3 bg-[#378BA4]/20 border border-[#378BA4]/50 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-white">{selectedCareers.length}</span> carrera{selectedCareers.length !== 1 ? 's' : ''} seleccionada{selectedCareers.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:border-white/50 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || selectedCareers.length === 0}
            className="flex-1 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar Intereses'}
          </button>
        </div>

        {/* Decoration */}
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#378BA4] rounded-full blur-md opacity-60"></div>
        <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-[#036280] rounded-full blur-md opacity-60"></div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showCareerModal, setShowCareerModal] = useState(false);

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
        
        // Combinar datos del localStorage con los datos del API
        const mergedDetails = {
          ...details,
          // Datos del registro que vienen en localStorage
          first_name: details.first_name || user.first_name,
          last_name: details.last_name || user.last_name,
          email: details.email || user.email,
          tipo: details.tipo || user.tipo,
          educational_level: details.educational_level || user.educational_level,
          current_grade: details.current_grade || user.current_grade,
          prefered_schedule: details.prefered_schedule || user.prefered_schedule,
          interests: details.interests || user.interests || []
        };
        
        setUserDetails(mergedDetails);
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

  const handleSaveInterests = async (careers) => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode || !token) {
        throw new Error('No autorizado');
      }

      const response = await fetch(ENDPOINTS.UPDATE_USER_PROFILE(userCode), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ interests: careers })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar intereses');
      }

      // Actualizar el estado local
      setUserDetails(prev => ({
        ...prev,
        interests: careers
      }));

      console.log('✅ Intereses actualizados correctamente');
    } catch (error) {
      console.error('Error guardando intereses:', error);
      throw error;
    }
  };

  if (loading) {
    return <ProfileLoading />;
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold mb-2">Error al cargar el perfil</p>
          <p className="text-gray-400 text-sm mb-4">
            Verifica que hayas iniciado sesión correctamente
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden">
      {/* Modal de Intereses */}
      <CareerInterestModal 
        isOpen={showCareerModal}
        onClose={() => setShowCareerModal(false)}
        onSave={handleSaveInterests}
        userDetails={userDetails}
      />

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

      {/* Header */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Header */}
          <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ProfileHeader 
              userDetails={userDetails}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
            />
          </div>

          {/* Botón de Intereses - Para estudiantes */}
          {!isMentor && (
            <div className={`mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                onClick={() => setShowCareerModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Actualizar Mis Intereses
                {userDetails.interests && userDetails.interests.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">
                    {userDetails.interests.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Stats (only for mentors) */}
          {isMentor && userDetails.mentor_profile && (
            <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <ProfileStats mentorProfile={userDetails.mentor_profile} />
            </div>
          )}

          {/* Tabs */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4]/10 to-[#036280]/10 rounded-xl blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-xl border border-white/20 p-2">
                <ProfileTabs 
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <Footer />
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