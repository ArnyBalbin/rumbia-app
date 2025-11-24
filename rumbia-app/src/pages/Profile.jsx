import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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
import { BASE_URL } from "../../config/api";
import { Edit2, Award } from "lucide-react";

const Profile = () => {
  const { 
    user, 
    loading, 
    updateLearnerProfile, 
    convertLearnerToMentor, 
    uploadMentorImage,
    checkAuth 
  } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEditLearnerModal, setShowEditLearnerModal] = useState(false);
  const [showBecomeMentorModal, setShowBecomeMentorModal] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSaveLearner = async (data) => {
    const result = await updateLearnerProfile(data);
    if (!result.success) throw new Error(result.error);
    return result;
  };

  const onBecomeMentor = async (data) => {
    const result = await convertLearnerToMentor(data);
    if (!result.success) throw new Error(result.error);
    return result;
  };

  const onSavePicture = async (file) => {
    const result = await uploadMentorImage(file);
    if (!result.success) throw new Error(result.error);
    return result;
  };

  if (loading) return <ProfileLoading />;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
        <div className="text-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <p className="text-white font-semibold mb-2">No se encontró sesión activa</p>
          <button onClick={() => window.location.href = "/"} className="text-[#378BA4] hover:text-white transition-colors">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const hasLearner = user.learner && user.learner.is_learner;
  const hasMentor = user.mentor && user.mentor.is_mentor;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview": return <ProfileOverview userData={user} />;
      case "activity": return <ProfileActivity userData={user} />;
      case "sessions": return <SessionManagement userData={user} />;
      case "settings": return <ProfileSettings userData={user} onRefresh={checkAuth} />;
      default: return <ProfileOverview userData={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A]">
      {/* ========== MODALS ========== */}
      <ProfilePictureModal
        isOpen={showPictureModal}
        onClose={() => setShowPictureModal(false)}
        onSave={onSavePicture}
        currentImage={user.mentor?.profile_img 
          ? `${BASE_URL}${user.mentor.profile_img}`
          : null
        }
      />
      
      <EditLearnerModal
        isOpen={showEditLearnerModal}
        onClose={() => setShowEditLearnerModal(false)}
        onSave={onSaveLearner}
        userData={user}
      />
      
      <BecomeAMentorModal
        isOpen={showBecomeMentorModal}
        onClose={() => setShowBecomeMentorModal(false)}
        onSave={onBecomeMentor}
        userData={user}
      />

      {/* ========== HEADER ========== */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <Header />
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-5 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sidebar */}
            <div className={`lg:col-span-3 space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <ProfileHeader
                userData={user}
                onEditPicture={() => setShowPictureModal(true)}
              />

              {hasLearner && (
                <button
                  onClick={() => setShowEditLearnerModal(true)}
                  className="w-full py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar perfil
                </button>
              )}

              {hasLearner && !hasMentor && (
                <button
                  onClick={() => setShowBecomeMentorModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Award className="w-5 h-5" />
                  Convertirse en Orientador
                </button>
              )}

              {hasMentor && <ProfileStats mentorData={user.mentor} />}
            </div>

            {/* Content Area */}
            <div className={`lg:col-span-9 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 shadow-xl overflow-hidden">
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} isMentor={hasMentor} />
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;