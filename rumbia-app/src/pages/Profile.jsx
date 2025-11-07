import { useState, useEffect } from "react";
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
import { Edit2 } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEditLearnerModal, setShowEditLearnerModal] = useState(false);
  const [showBecomeMentorModal, setShowBecomeMentorModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("currentUser");

      if (!token || !storedUser) {
        console.error("No hay sesión activa");
        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(storedUser);
      const userCode = user.user_code;

      if (!userCode) {
        console.error("No se pudo obtener el user_code del usuario");
        setLoading(false);
        return;
      }

      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Error al obtener datos del usuario:", response.status);
      }
    } catch (error) {
      console.error("Error en fetchUserData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLearnerProfile = async (formData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const userCode = userData.user_code;

      if (!userCode || !token) throw new Error("No autorizado");

      const response = await fetch(ENDPOINTS.POST_LEARNER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al actualizar learner");
      }

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      // Actualizar estado local inmediatamente con los datos del formulario
      setUserData((prevData) => ({
        ...prevData,
        first_name: formData.first_name || prevData.first_name,
        last_name: formData.last_name || prevData.last_name,
        learner: {
          ...prevData.learner,
          educational_level: formData.educational_level || prevData.learner?.educational_level,
          current_grade: formData.current_grade || prevData.learner?.current_grade,
          prefered_schedule: formData.prefered_schedule || prevData.learner?.prefered_schedule,
        },
      }));
      
      // Actualizar localStorage
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      const updatedUser = { 
        ...storedUser, 
        first_name: formData.first_name || storedUser.first_name,
        last_name: formData.last_name || storedUser.last_name,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Refrescar datos del servidor
      await fetchUserData();

      console.log("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando learner:", error);
      throw error;
    }
  };

  const handleBecomeMentor = async (mentorData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const userCode = userData.user_code;

      if (!userCode || !token) throw new Error("No autorizado");

      const response = await fetch(ENDPOINTS.LEARNER_TO_MENTOR, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...mentorData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al convertir a mentor");
      }

      await fetchUserData();
      alert("🎉 ¡Ahora eres un mentor!");
    } catch (error) {
      console.error("Error convirtiéndose en mentor:", error);
      alert(error.message);
      throw error;
    }
  };

  const handleSaveProfilePicture = async (file) => {
    try {
      const token = localStorage.getItem("accessToken");
      const userCode = userData.user_code;

      if (!userCode || !token) throw new Error("No autorizado");

      // Simulación temporal - Reemplazar con endpoint real cuando esté disponible
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profile_picture: reader.result }));
      };
      reader.readAsDataURL(file);

      console.log("✅ Foto de perfil actualizada");
    } catch (error) {
      console.error("Error al subir foto:", error);
      throw error;
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) return <ProfileLoading />;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold mb-2">
            Error al cargar el perfil
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Verifica que hayas iniciado sesión correctamente
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview userData={userData} />;
      case "activity":
        return <ProfileActivity userData={userData} />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <ProfileOverview userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A]">
      {/* Modals */}
      <ProfilePictureModal
        isOpen={showPictureModal}
        onClose={() => setShowPictureModal(false)}
        onSave={handleSaveProfilePicture}
        currentImage={userData.profile_picture}
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

      {/* Header */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SIDEBAR */}
            <div
              className={`lg:col-span-3 space-y-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <ProfileHeader
                userData={userData}
                onEditPicture={() => setShowPictureModal(true)}
              />

              {/* Botón: Editar Perfil */}
              {hasLearner && (
                <button
                  onClick={() => setShowEditLearnerModal(true)}
                  className="w-full py-2.5 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar perfil
                </button>
              )}

              {/* Botón: Convertirse en Mentor */}
              {hasLearner && !hasMentor && (
                <button
                  onClick={() => setShowBecomeMentorModal(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Convertirse en Mentor
                </button>
              )}

              {/* Stats para Mentores */}
              {hasMentor && <ProfileStats mentorData={userData.mentor} />}
            </div>

            {/* MAIN CONTENT */}
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
                  onTabChange={handleTabChange}
                />
                <div className="p-6">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;