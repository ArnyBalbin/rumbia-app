import { useState, useEffect } from "react";
import { User, GraduationCap, BookOpen, Clock, Briefcase, Globe, FileText, Heart, Target, Mail, Star, Award } from "lucide-react";

const ProfileOverview = ({ userData }) => {
  const [careerData, setCareerData] = useState(null);
  const [loadingCareer, setLoadingCareer] = useState(false);
  
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;
  const learnerData = userData.learner || {};
  const mentorData = userData.mentor || {};

  // Fetch career data si mentor tiene career ID
  useEffect(() => {
    const fetchCareer = async () => {
      if (!hasMentor || !mentorData.career) return;
      
      setLoadingCareer(true);
      try {
        const response = await fetch('https://api-rumbia.onrender.com/api/get-careers/', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const careers = await response.json();
          const foundCareer = careers.find(c => c.id_career === mentorData.career);
          if (foundCareer) {
            setCareerData(foundCareer);
          }
        }
      } catch (error) {
        console.error("Error fetching career:", error);
      } finally {
        setLoadingCareer(false);
      }
    };

    fetchCareer();
  }, [hasMentor, mentorData.career]);

  // Función helper para parsear intereses
  const parseInterests = (interestsString) => {
    if (!interestsString) return [];
    if (Array.isArray(interestsString)) return interestsString;
    return interestsString.split(',').map(i => i.trim()).filter(i => i);
  };

  const interests = parseInterests(learnerData.interests);
  const careerInterests = parseInterests(learnerData.career_interests);

  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <div className="bg-[#036280]/30 border border-[#378BA4]/40 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#378BA4]" />
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-[#378BA4] mt-1" />
            <div>
              <p className="text-xs text-gray-400 mb-1">Nombre Completo</p>
              <p className="text-white font-semibold">
                {userData.first_name} {userData.last_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#378BA4] mt-1" />
            <div>
              <p className="text-xs text-gray-400 mb-1">Correo Electrónico</p>
              <p className="text-white font-semibold break-all">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Orientador (Mentor) */}
      {hasMentor && (
        <>
          {/* Carrera Principal - DESTACADO */}
          {mentorData.career && (
            <div className="bg-gradient-to-br from-[#378BA4]/40 to-[#036280]/40 border-2 border-[#378BA4]/60 rounded-lg p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-[#378BA4]/30 p-3 rounded-lg">
                  <Briefcase className="w-7 h-7 text-[#81E6D9]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#81E6D9]" />
                    <p className="text-xs text-[#81E6D9] font-medium uppercase tracking-wide">
                      Carrera
                    </p>
                  </div>
                  {loadingCareer ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#378BA4] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-300 text-sm">Cargando carrera...</span>
                    </div>
                  ) : careerData ? (
                    <>
                      <h4 className="text-white font-bold text-2xl mb-2">
                        {careerData.name_career}
                      </h4>
                      {careerData.desc_career && (
                        <p className="text-gray-200 text-sm leading-relaxed mb-2">
                          {careerData.desc_career}
                        </p>
                      )}
                      {careerData.duration_years && (
                        <p className="text-[#81E6D9] text-sm">
                          📅 Duración: {careerData.duration_years} años
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm">Carrera no disponible</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Detalles Profesionales */}
          <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#378BA4]" />
              Detalles Profesionales
            </h3>
            <div className="space-y-5">
              {/* Carrera Alternativa */}
              {mentorData.alt_career && (
                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <GraduationCap className="w-5 h-5 text-[#378BA4] mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Carrera Alternativa</p>
                    <p className="text-white font-semibold">{mentorData.alt_career}</p>
                  </div>
                </div>
              )}

              {/* Idiomas */}
              {mentorData.language && (
                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <Globe className="w-5 h-5 text-[#378BA4] mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Idiomas</p>
                    <p className="text-white font-semibold">{mentorData.language}</p>
                  </div>
                </div>
              )}

              {/* Descripción */}
              {mentorData.description && (
                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <FileText className="w-5 h-5 text-[#378BA4] mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-2">Sobre mí</p>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {mentorData.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#378BA4]/10 rounded-lg p-4 text-center border border-[#378BA4]/30">
                  <p className="text-3xl font-bold text-[#81E6D9] mb-1">
                    {mentorData.total_sessions || 0}
                  </p>
                  <p className="text-xs text-gray-300">Sesiones Completadas</p>
                </div>
                <div className="bg-[#378BA4]/10 rounded-lg p-4 text-center border border-[#378BA4]/30">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <p className="text-3xl font-bold text-[#81E6D9]">
                      {mentorData.rating ? Number(mentorData.rating).toFixed(1) : '0.0'}
                    </p>
                    <Star className="w-5 h-5 text-[#81E6D9] fill-[#81E6D9]" />
                  </div>
                  <p className="text-xs text-gray-300">Calificación</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Información Académica (Learner) */}
      {hasLearner && (
        <>
          <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#378BA4]" />
              Información Académica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nivel Educativo</p>
                  <p className="text-white font-semibold capitalize">
                    {learnerData.educational_level || "No especificado"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Grado Actual</p>
                  <p className="text-white font-semibold">
                    {learnerData.current_grade || "No especificado"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#378BA4] mt-1" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Horario Preferido</p>
                  <p className="text-white font-semibold capitalize">
                    {learnerData.prefered_schedule || "No especificado"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Intereses y Objetivos */}
          {(interests.length > 0 || careerInterests.length > 0) && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#378BA4]" />
                Intereses y Objetivos
              </h3>
              
              <div className="space-y-5">
                {/* Intereses Generales */}
                {interests.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-[#378BA4]" />
                      <h4 className="text-sm font-semibold text-gray-300">Intereses Generales</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#378BA4]/20 border border-[#378BA4]/40 rounded-lg text-sm text-white"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Carreras de Interés */}
                {careerInterests.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-[#81E6D9]" />
                      <h4 className="text-sm font-semibold text-gray-300">Carreras de Interés</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {careerInterests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#378BA4]/30 border border-[#81E6D9]/50 rounded-lg text-sm text-white"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mensaje si no hay intereses */}
          {interests.length === 0 && careerInterests.length === 0 && !hasMentor && (
            <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-lg p-8 text-center">
              <Heart className="w-12 h-12 text-[#378BA4]/50 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">
                Aún no has agregado intereses. Edita tu perfil para añadirlos y personalizar tu experiencia.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileOverview;