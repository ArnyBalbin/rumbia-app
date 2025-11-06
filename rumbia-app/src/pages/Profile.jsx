import { useState, useEffect, useRef } from 'react';
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
import { Sparkles, X, Check, Camera, Upload, User, Mail, GraduationCap, Clock, Edit2, Save } from 'lucide-react';

// Modal para actualizar foto de perfil
const ProfilePictureModal = ({ isOpen, onClose, onSave, currentImage }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      await onSave(selectedFile);
      onClose();
    } catch (error) {
      console.error('Error al subir la foto:', error);
      alert('Error al subir la foto de perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-md w-full shadow-2xl">
        <button onClick={onClose} disabled={loading} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Actualizar foto de perfil</h2>
          <p className="text-gray-400 text-sm">Selecciona una imagen (JPG, PNG, GIF - Max 5MB)</p>
        </div>

        <div className="mb-6">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#378BA4]/50 bg-[#036280]/20">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : currentImage ? (
                <img src={currentImage} alt="Current" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-[#378BA4]" />
                </div>
              )}
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          
          <button onClick={() => fileInputRef.current?.click()} disabled={loading}
            className="w-full py-3 bg-[#036280] border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#378BA4] transition-all flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            Seleccionar Imagen
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={loading || !selectedFile}
            className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50">
            {loading ? 'Subiendo...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal para editar información básica del perfil
const EditProfileModal = ({ isOpen, onClose, onSave, userDetails }) => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', educational_level: '', current_grade: '', prefered_schedule: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userDetails) {
      setFormData({
        first_name: userDetails.first_name || '',
        last_name: userDetails.last_name || '',
        email: userDetails.email || '',
        educational_level: userDetails.educational_level || '',
        current_grade: userDetails.current_grade || '',
        prefered_schedule: userDetails.prefered_schedule || ''
      });
    }
  }, [isOpen, userDetails]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isMentor = userDetails?.tipo === 'mentor';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} disabled={loading} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Editar perfil</h2>
          <p className="text-gray-400">Actualiza tu información personal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                placeholder="Tu apellido" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} disabled
              className="w-full px-4 py-2.5 bg-[#036280]/20 border border-[#378BA4]/20 rounded-lg text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-500 mt-1">El correo no puede ser modificado</p>
          </div>

          {!isMentor && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nivel Educativo</label>
                <select name="educational_level" value={formData.educational_level} onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:outline-none transition-all">
                  <option value="" className="bg-[#012E4A]">Seleccionar...</option>
                  <option value="primaria" className="bg-[#012E4A]">Primaria</option>
                  <option value="secundaria" className="bg-[#012E4A]">Secundaria</option>
                  <option value="preparatoria" className="bg-[#012E4A]">Preparatoria</option>
                  <option value="universidad" className="bg-[#012E4A]">Universidad</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Grado Actual</label>
                <input type="text" name="current_grade" value={formData.current_grade} onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                  placeholder="Ej: 5to grado, 3er año" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Horario Preferido</label>
                <select name="prefered_schedule" value={formData.prefered_schedule} onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#036280]/30 border border-[#378BA4]/30 rounded-lg text-white focus:border-[#378BA4] focus:outline-none transition-all">
                  <option value="" className="bg-[#012E4A]">Seleccionar...</option>
                  <option value="mañana" className="bg-[#012E4A]">Mañana</option>
                  <option value="tarde" className="bg-[#012E4A]">Tarde</option>
                  <option value="noche" className="bg-[#012E4A]">Noche</option>
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    if (userDetails?.interests && Array.isArray(userDetails.interests)) {
      setSelectedCareers(userDetails.interests);
    }
  }, [userDetails, isOpen]);

  const toggleCareer = (career) => {
    setSelectedCareers(prev => 
      prev.includes(career) ? prev.filter(c => c !== career) : [...prev, career]
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#012E4A] rounded-2xl border border-[#378BA4]/30 p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} disabled={loading} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Intereses de carrera</h2>
          <p className="text-gray-400">Selecciona las carreras que te interesan</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {careerOptions.map((career) => (
            <button key={career} onClick={() => toggleCareer(career)} disabled={loading}
              className={`p-3 rounded-lg transition-all text-left text-sm font-medium ${
                selectedCareers.includes(career)
                  ? 'bg-[#378BA4] text-white border-2 border-[#378BA4]'
                  : 'bg-[#036280]/30 text-gray-300 border-2 border-[#378BA4]/20 hover:border-[#378BA4]/50'
              }`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs">{career}</span>
                {selectedCareers.includes(career) && <Check className="w-4 h-4 flex-shrink-0" />}
              </div>
            </button>
          ))}
        </div>

        {selectedCareers.length > 0 && (
          <div className="mb-6 p-3 bg-[#378BA4]/20 border border-[#378BA4]/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-white">{selectedCareers.length}</span> carrera{selectedCareers.length !== 1 ? 's' : ''} seleccionada{selectedCareers.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 py-3 bg-transparent border border-[#378BA4]/30 text-white font-medium rounded-lg hover:bg-[#036280]/50 transition-all">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={loading || selectedCareers.length === 0}
            className="flex-1 py-3 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all disabled:opacity-50">
            {loading ? 'Guardando...' : 'Guardar Intereses'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchUserData();
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
        setLoading(false);
        return;
      }

      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const details = await response.json();
        
        const mergedDetails = {
          ...details,
          first_name: details.first_name || user.first_name,
          last_name: details.last_name || user.last_name,
          email: details.email || user.email,
          tipo: details.tipo || user.tipo,
          educational_level: details.educational_level || user.educational_level,
          current_grade: details.current_grade || user.current_grade,
          prefered_schedule: details.prefered_schedule || user.prefered_schedule,
          interests: details.interests || user.interests || [],
          profile_picture: details.profile_picture || null
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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSaveInterests = async (careers) => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode || !token) throw new Error('No autorizado');

      const response = await fetch(ENDPOINTS.UPDATE_USER_PROFILE(userCode), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ interests: careers })
      });

      if (!response.ok) throw new Error('Error al actualizar intereses');

      setUserDetails(prev => ({ ...prev, interests: careers }));
      console.log('✅ Intereses actualizados correctamente');
    } catch (error) {
      console.error('Error guardando intereses:', error);
      throw error;
    }
  };

  const handleSaveProfilePicture = async (file) => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode || !token) throw new Error('No autorizado');

      // Simulación temporal (reemplazar con endpoint real)
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails(prev => ({ ...prev, profile_picture: reader.result }));
      };
      reader.readAsDataURL(file);

      console.log('✅ Foto de perfil actualizada');
    } catch (error) {
      console.error('Error al subir foto:', error);
      throw error;
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode || !token) throw new Error('No autorizado');

      const response = await fetch(ENDPOINTS.UPDATE_USER_PROFILE(userCode), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al actualizar perfil');

      setUserDetails(prev => ({ ...prev, ...formData }));

      const updatedUser = { ...userData, ...formData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      console.log('✅ Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  };

  if (loading) return <ProfileLoading />;

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-semibold mb-2">Error al cargar el perfil</p>
          <p className="text-gray-400 text-sm mb-4">Verifica que hayas iniciado sesión correctamente</p>
          <button onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg transition-all">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const isMentor = userDetails.tipo === 'mentor';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <ProfileOverview userDetails={userDetails} />;
      case 'preferences': return <ProfilePreferences userDetails={userDetails} />;
      case 'achievements': return <ProfileAchievements userDetails={userDetails} />;
      case 'settings': return <ProfileSettings />;
      default: return <ProfileOverview userDetails={userDetails} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A]">
      {/* Modals */}
      <ProfilePictureModal isOpen={showPictureModal} onClose={() => setShowPictureModal(false)} onSave={handleSaveProfilePicture} currentImage={userDetails.profile_picture} />
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleSaveProfile} userDetails={userDetails} />
      <CareerInterestModal isOpen={showCareerModal} onClose={() => setShowCareerModal(false)} onSave={handleSaveInterests} userDetails={userDetails} />

      {/* Header */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SIDEBAR */}
            <div className={`lg:col-span-3 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <ProfileHeader userDetails={userDetails} onEditPicture={() => setShowPictureModal(true)} />

              <button onClick={() => setShowEditModal(true)}
                className="w-full py-2.5 bg-[#378BA4] text-white font-medium rounded-lg hover:bg-[#036280] transition-all flex items-center justify-center gap-2 text-sm">
                <Edit2 className="w-4 h-4" />
                Editar perfil
              </button>

              {!isMentor && userDetails.educational_level && (
                <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Información</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-[#378BA4] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Nivel</p>
                        <p className="text-sm text-white font-medium capitalize">{userDetails.educational_level}</p>
                      </div>
                    </div>
                    {userDetails.current_grade && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#378BA4] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Grado</p>
                          <p className="text-sm text-white font-medium">{userDetails.current_grade}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!isMentor && (
                <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Intereses</h3>
                    <button onClick={() => setShowCareerModal(true)} className="text-[#378BA4] hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  {userDetails.interests && userDetails.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {userDetails.interests.map((interest, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#378BA4]/20 border border-[#378BA4]/30 rounded-full text-xs text-white font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No has agregado intereses aún</p>
                  )}
                </div>
              )}

              {isMentor && <ProfileStats mentorProfile={userDetails.mentor_profile} />}
            </div>

            {/* MAIN CONTENT */}
            <div className={`lg:col-span-9 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 shadow-xl overflow-hidden">
                <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
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