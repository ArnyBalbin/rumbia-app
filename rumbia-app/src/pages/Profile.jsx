import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ENDPOINTS } from "../../config/api";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileSettings from "../components/profile/ProfileSettings";
import ProfileLoading from "../components/profile/ProfileLoading";
import EditLearnerModal from "../components/profile/EditLearnerModal";
import BecomeAMentorModal from "../components/profile/BecomeAMentorModal";
import ProfilePictureModal from "../components/profile/ProfilePictureModal";
import SessionManagement from "../components/profile/SessionManagement";
import { Edit2, Award } from "lucide-react";

const Profile = () => {
  const { user, uploadMentorImage } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEditLearnerModal, setShowEditLearnerModal] = useState(false);
  const [showBecomeMentorModal, setShowBecomeMentorModal] = useState(false);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (user?.user_code) {
      fetchUserData();
    } else {
      setLoading(false);
      setError("No hay sesión activa");
    }
  }, [user]);

  // =============================================
  // FETCH: Obtener datos del usuario
  // =============================================
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token || !user?.user_code) {
        throw new Error("No autorizado");
      }

      const response = await fetch(ENDPOINTS.GET_USER_INFO(user.user_code), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo cargar el perfil`);
      }

      const data = await response.json();
      setUserData(data);

      // Actualizar localStorage con datos frescos
      localStorage.setItem("currentUser", JSON.stringify({
        ...user,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mentor: data.mentor,
        learner: data.learner,
      }));

    } catch (err) {
      console.error("Error en fetchUserData:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // HANDLE: Actualizar perfil Learner
  // =============================================
  const handleSaveLearnerProfile = async (formData) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || !userData?.user_code) {
        throw new Error("No autorizado");
      }

      const response = await fetch(ENDPOINTS.POST_LEARNER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userData.user_code,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al actualizar perfil");
      }

      // Refrescar datos completos desde el servidor
      await fetchUserData();
      
      return { success: true };
    } catch (error) {
      console.error("Error actualizando learner:", error);
      throw error;
    }
  };

  // =============================================
  // HANDLE: Convertirse en Mentor
  // =============================================
  const handleBecomeMentor = async (mentorData) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || !userData?.user_code) {
        throw new Error("No autorizado");
      }

      const response = await fetch(ENDPOINTS.LEARNER_TO_MENTOR, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userData.user_code,
          ...mentorData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al convertir a mentor");
      }

      // Refrescar datos
      await fetchUserData();
      
      return { success: true };
    } catch (error) {
      console.error("Error convirtiéndose en mentor:", error);
      throw error;
    }
  };

  // =============================================
  // HANDLE: Subir foto de perfil (MEJORADO)
  // =============================================
  const handleSaveProfilePicture = async (file) => {
    try {
      // Verificar que el usuario es mentor
      if (!userData?.mentor?.is_mentor) {
        throw new Error("Solo los mentores pueden subir foto de perfil");
      }

      // Validaciones del archivo
      if (!file) {
        throw new Error("No se seleccionó ninguna imagen");
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("La imagen no debe superar los 5MB");
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Solo se permiten archivos JPG, JPEG o PNG");
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No autorizado");
      }

      const formData = new FormData();
      formData.append("user_code", userData.user_code);
      formData.append("profile_img", file);

      const response = await fetch(ENDPOINTS.POST_MENTOR_IMAGE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al subir imagen");
      }

      const result = await response.json();

      // Actualizar userData inmediatamente con la nueva imagen
      setUserData(prev => ({
        ...prev,
        mentor: {
          ...prev.mentor,
          profile_img: result.path
        }
      }));

      // Refrescar datos completos desde el servidor
      await fetchUserData();
      
      return { success: true, message: "Foto de perfil actualizada correctamente" };
    } catch (error) {
      console.error("Error al subir foto:", error);
      throw error;
    }
  };

  // =============================================
  // RENDER: Contenido de tabs
  // =============================================
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview userData={userData} />;
      case "activity":
        return <ProfileActivity userData={userData} />;
      case "sessions":
        return <SessionManagement userData={userData} />;
      case "settings":
        return <ProfileSettings userData={userData} onRefresh={fetchUserData} />;
      default:
        return <ProfileOverview userData={userData} />;
    }
  };

  // =============================================
  // ESTADOS DE CARGA Y ERROR
  // =============================================
  if (loading) return <ProfileLoading />;

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
        <div className="text-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md">
          <div className="mb-4 text-red-400">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-white font-semibold mb-2 text-lg">
            Error al cargar el perfil
          </p>
          <p className="text-gray-400 text-sm mb-6">
            {error || "Verifica que hayas iniciado sesión correctamente"}
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // =============================================
  // VARIABLES DE ESTADO
  // =============================================
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A]">
      {/* ========== MODALS ========== */}
      <ProfilePictureModal
        isOpen={showPictureModal}
        onClose={() => setShowPictureModal(false)}
        onSave={handleSaveProfilePicture}
        currentImage={userData.mentor?.profile_img 
          ? `https://api-rumbia.onrender.com${userData.mentor.profile_img}`
          : null
        }
      />
      
      <EditLearnerModal
        isOpen={showEditLearnerModal}
        onClose={() => setShowEditLearnerModal(false)}
        onSave={handleSaveLearnerProfile}
        userData={userData}
      />
      
      <BecomeAMentorModal
        isOpen={showBecomeMentorModal}
        onClose={() => setShowBecomeMentorModal(false)}
        onSave={handleBecomeMentor}
        userData={userData}
      />

      {/* ========== HEADER ========== */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <Header />
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-5 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* ========== SIDEBAR ========== */}
            <div
              className={`lg:col-span-3 space-y-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              {/* Profile Header */}
              <ProfileHeader
                userData={userData}
                onEditPicture={() => setShowPictureModal(true)}
              />

              {/* Botón: Editar Perfil (solo Learners) */}
              {hasLearner && (
                <button
                  onClick={() => setShowEditLearnerModal(true)}
                  className="w-full py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar perfil
                </button>
              )}

              {/* Botón: Convertirse en Mentor */}
              {hasLearner && !hasMentor && (
                <button
                  onClick={() => setShowBecomeMentorModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Award className="w-5 h-5" />
                  Convertirse en Orientador
                </button>
              )}

              {/* Stats para Mentores */}
              {hasMentor && <ProfileStats mentorData={userData.mentor} />}
            </div>

            {/* ========== MAIN CONTENT AREA ========== */}
            <div
              className={`lg:col-span-9 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 shadow-xl overflow-hidden">
                <ProfileTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  isMentor={hasMentor}
                />
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========== FOOTER ========== */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;