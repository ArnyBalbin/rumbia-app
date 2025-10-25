import { useState } from 'react';
import { GraduationCap, Briefcase, Building2, FileText, BookOpen, Calendar, Award, Star, Plus, X, Check } from 'lucide-react';

const RegisterStep2Mentor = ({ 
  mentorData, 
  onChange, 
  onBack, 
  onSubmit, 
  loading 
}) => {
  const [mentorType, setMentorType] = useState('');
  const [skills, setSkills] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ 
    company: '', 
    position: '', 
    duration: '', 
    description: '' 
  });

  const careersList = [
    { id: 1, name: 'Ingeniería de Sistemas' },
    { id: 2, name: 'Medicina' },
    { id: 3, name: 'Derecho' },
    { id: 4, name: 'Administración' },
    { id: 5, name: 'Psicología' },
    { id: 6, name: 'Arquitectura' },
    { id: 7, name: 'Contabilidad' },
    { id: 8, name: 'Enfermería' },
    { id: 9, name: 'Marketing' },
    { id: 10, name: 'Diseño Gráfico' },
    { id: 999, name: 'Otra (especificar)' }
  ];

  const skillsList = [
    'Liderazgo', 'Trabajo en equipo', 'Comunicación', 'Programación',
    'Análisis de datos', 'Gestión de proyectos', 'Creatividad', 'Resolución de problemas',
    'Idiomas', 'Marketing digital', 'Diseño', 'Finanzas'
  ];

  const toggleSkill = (skill) => {
    setSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setWorkExperiences([...workExperiences, { ...newExperience }]);
      setNewExperience({ company: '', position: '', duration: '', description: '' });
    }
  };

  const removeExperience = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  // Mentor Type Selection Screen
  if (!mentorType) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">¿Cuál es tu perfil?</h3>
          <p className="text-gray-300 text-sm">Selecciona la opción que mejor te describe</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setMentorType('student')}
            disabled={loading}
            className="group relative p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-center space-y-4">
              <GraduationCap className="w-16 h-16 mx-auto text-white" />
              <h3 className="text-2xl font-bold text-white">Estudiante</h3>
              <p className="text-gray-300 text-sm">Actualmente cursando una carrera universitaria</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMentorType('professional')}
            disabled={loading}
            className="group relative p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-center space-y-4">
              <Briefcase className="w-16 h-16 mx-auto text-white" />
              <h3 className="text-2xl font-bold text-white">Profesional</h3>
              <p className="text-gray-300 text-sm">Ya graduado y con experiencia laboral</p>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="w-full py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Atrás
        </button>
      </div>
    );
  }

  // Main Form
  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
      {/* Career Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <GraduationCap className="w-4 h-4 inline mr-2" />
          {mentorType === 'student' ? 'Tu carrera' : 'Carrera profesional'}
        </label>
        <select
          value={mentorData.id_career}
          onChange={(e) => onChange({ target: { name: 'id_career', value: e.target.value } })}
          disabled={loading}
          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" className="bg-gray-800">Selecciona una carrera</option>
          {careersList.map(career => (
            <option key={career.id} value={career.id} className="bg-gray-800">
              {career.name}
            </option>
          ))}
        </select>
        
        {mentorData.id_career === '999' && (
          <input
            type="text"
            placeholder="Especifica tu carrera"
            value={mentorData.alt_career}
            onChange={(e) => onChange({ target: { name: 'alt_career', value: e.target.value } })}
            disabled={loading}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )}
      </div>

      {/* College/University */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <Building2 className="w-4 h-4 inline mr-2" />
          {mentorType === 'student' ? 'Universidad/Instituto' : 'Institución donde estudiaste'}
        </label>
        <input
          type="text"
          placeholder="Nombre de la institución"
          value={mentorData.college}
          onChange={(e) => onChange({ target: { name: 'college', value: e.target.value } })}
          disabled={loading}
          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <FileText className="w-4 h-4 inline mr-2" />
          Descripción profesional
        </label>
        <textarea
          placeholder="Cuéntanos sobre tu experiencia y qué te hace un buen mentor..."
          value={mentorData.description}
          onChange={(e) => onChange({ target: { name: 'description', value: e.target.value } })}
          disabled={loading}
          rows={3}
          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Student-specific fields */}
      {mentorType === 'student' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-white pl-1">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Semestre/Ciclo actual
          </label>
          <select
            value={mentorData.current_semester}
            onChange={(e) => onChange({ target: { name: 'current_semester', value: e.target.value } })}
            disabled={loading}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" className="bg-gray-800">Selecciona tu semestre</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1} className="bg-gray-800">
                {i + 1}° Semestre
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Professional-specific fields */}
      {mentorType === 'professional' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white pl-1">
                <Award className="w-4 h-4 inline mr-2" />
                Título profesional
              </label>
              <input
                type="text"
                placeholder="Ej: Ingeniero de Sistemas"
                value={mentorData.pro_title}
                onChange={(e) => onChange({ target: { name: 'pro_title', value: e.target.value } })}
                disabled={loading}
                className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-white pl-1">
                <Calendar className="w-4 h-4 inline mr-2" />
                Año de graduación
              </label>
              <input
                type="number"
                placeholder="2020"
                min="1950"
                max="2025"
                value={mentorData.graduation_year}
                onChange={(e) => onChange({ target: { name: 'graduation_year', value: e.target.value } })}
                disabled={loading}
                className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-white pl-1">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Años de experiencia
            </label>
            <select
              value={mentorData.experience_years}
              onChange={(e) => onChange({ target: { name: 'experience_years', value: e.target.value } })}
              disabled={loading}
              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-gray-800">Selecciona tus años de experiencia</option>
              <option value="1-2" className="bg-gray-800">1-2 años</option>
              <option value="3-5" className="bg-gray-800">3-5 años</option>
              <option value="6-10" className="bg-gray-800">6-10 años</option>
              <option value="10+" className="bg-gray-800">Más de 10 años</option>
            </select>
          </div>
        </>
      )}

      {/* Skills */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white pl-1">
          <Star className="w-4 h-4 inline mr-2" />
          Habilidades (selecciona varias)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 bg-black/20 rounded-xl">
          {skillsList.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              disabled={loading}
              className={`group relative p-3 bg-white/10 backdrop-blur-xl rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                skills.includes(skill)
                  ? 'border-2 border-white shadow-lg shadow-white/30'
                  : 'border-2 border-white/20 hover:border-white/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-white text-sm">{skill}</span>
                {skills.includes(skill) && (
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
        {skills.length > 0 && (
          <div className="text-xs text-gray-300 pl-1">
            {skills.length} habilidad{skills.length !== 1 ? 'es' : ''} seleccionada{skills.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Work Experience */}
      {mentorType === 'professional' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-white pl-1">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Experiencia laboral (opcional)
          </label>
          
          <div className="space-y-3 p-4 bg-black/20 rounded-xl">
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Empresa"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Cargo"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <input
              type="text"
              placeholder="Duración (ej: 2 años)"
              value={newExperience.duration}
              onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#378BA4] focus:bg-white/15 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={addExperience}
              disabled={loading || !newExperience.company || !newExperience.position}
              className="w-full py-2 bg-gradient-to-r from-[#378BA4]/80 to-[#036280]/80 hover:from-[#378BA4] hover:to-[#036280] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Agregar experiencia
            </button>
          </div>

          {workExperiences.length > 0 && (
            <div className="space-y-2">
              {workExperiences.map((exp, index) => (
                <div key={index} className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{exp.position}</h4>
                      <p className="text-sm text-gray-300">{exp.company} • {exp.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      disabled={loading}
                      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 sticky bottom-0 bg-gradient-to-t from-[#0a1929] via-[#0a1929] to-transparent pb-4">
        <button
          type="button"
          onClick={() => setMentorType('')}
          disabled={loading}
          className="w-1/3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Atrás
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="group relative flex-1 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creando cuenta...
              </>
            ) : (
              <>
                Crear cuenta
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </button>
      </div>

      <style>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default RegisterStep2Mentor;