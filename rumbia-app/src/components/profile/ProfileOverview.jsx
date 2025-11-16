import { useState, useEffect } from "react";
import { User, GraduationCap, BookOpen, Clock, Briefcase, Globe, FileText, Heart, Target, Mail, Star, Award, Calendar } from "lucide-react";

const ProfileOverview = ({ userData }) => {
  const [careerData, setCareerData] = useState(null);
  const [loadingCareer, setLoadingCareer] = useState(false);
  
  const hasLearner = userData.learner && userData.learner.is_learner;
  const hasMentor = userData.mentor && userData.mentor.is_mentor;
  const learnerData = userData.learner || {};
  const mentorData = userData.mentor || {};

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
      <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#378BA4]" />
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Nombre Completo</p>
            <p className="text-white font-medium">
              {userData.first_name} {userData.last_name}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Correo Electrónico</p>
            <p className="text-white font-medium break-all">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Carrera Principal - MENTOR */}
      {hasMentor && mentorData.career && (
        <div className="bg-[#378BA4]/20 border border-[#378BA4]/40 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-[#81E6D9]" />
            <p className="text-xs text-[#81E6D9] font-semibold uppercase tracking-wide">
              Carrera
            </p>
          </div>
          
          {loadingCareer ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#378BA4] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-300 text-sm">Cargando...</span>
            </div>
          ) : careerData ? (
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-lg">
                {careerData.name_career}
              </h4>
              {careerData.desc_career && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  {careerData.desc_career}
                </p>
              )}
              {careerData.duration_years && (
                <p className="text-[#81E6D9] text-sm">
                  Duración: {careerData.duration_years} años
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No disponible</p>
          )}
        </div>
      )}

      {/* Información del Mentor */}
      {hasMentor && (
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#378BA4]" />
            Información del Orientador
          </h3>
          
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-2xl font-bold text-white mb-1">
                  {mentorData.total_sessions || 0}
                </p>
                <p className="text-xs text-gray-400">Sesiones</p>
              </div>
              
              <div className="text-center bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-2xl font-bold text-white">
                    {mentorData.rating ? Number(mentorData.rating).toFixed(1) : '0.0'}
                  </p>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-xs text-gray-400">Rating</p>
              </div>

              <div className="text-center bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-2xl font-bold text-white mb-1">
                  {mentorData.language || 'N/A'}
                </p>
                <p className="text-xs text-gray-400">Idioma</p>
              </div>
            </div>

            {/* Carrera Alternativa */}
            {mentorData.alt_career && (
              <div className="space-y-1 pt-2 border-t border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Carrera Alternativa</p>
                <p className="text-white font-medium">{mentorData.alt_career}</p>
              </div>
            )}

            {/* Descripción */}
            {mentorData.description && (
              <div className="space-y-1 pt-2 border-t border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Sobre mí</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {mentorData.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información Académica - LEARNER */}
      {hasLearner && (
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#378BA4]" />
            Información Académica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learnerData.educational_level && (
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Nivel Educativo</p>
                <p className="text-white font-medium capitalize">
                  {learnerData.educational_level}
                </p>
              </div>
            )}
            
            {learnerData.current_grade && (
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Grado Actual</p>
                <p className="text-white font-medium">
                  {learnerData.current_grade}
                </p>
              </div>
            )}
            
            {learnerData.prefered_schedule && (
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Horario Preferido</p>
                <p className="text-white font-medium capitalize">
                  {learnerData.prefered_schedule}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Intereses - LEARNER */}
      {hasLearner && (interests.length > 0 || careerInterests.length > 0) && (
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#378BA4]" />
            Intereses y Objetivos
          </h3>
          
          <div className="space-y-5">
            {interests.length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-3">Intereses Generales</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#378BA4]/20 border border-[#378BA4]/40 rounded-lg text-sm text-white"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {careerInterests.length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-3">Carreras de Interés</p>
                <div className="flex flex-wrap gap-2">
                  {careerInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#378BA4]/30 border border-[#81E6D9]/50 rounded-lg text-sm text-white"
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

      {/* Empty State */}
      {hasLearner && !hasMentor && interests.length === 0 && careerInterests.length === 0 && (
        <div className="bg-[#036280]/20 border border-[#378BA4]/30 rounded-xl p-8 text-center">
          <Heart className="w-12 h-12 text-[#378BA4]/50 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Edita tu perfil para agregar intereses y personalizar tu experiencia.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;