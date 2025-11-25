import { ArrowLeft, Star } from 'lucide-react'
import { BASE_URL } from '../../../config/api'

const SessionHeader = ({ topic, career, mentor, onBack }) => {
  const mentorUser = mentor.user || {}
  const mentorName = `${mentorUser.first_name || 'Mentor'} ${mentorUser.last_name || ''}`.trim()
  
  const getImageUrl = (path) => path ? (path.startsWith('http') ? path : `${BASE_URL}${path}`) : null

  return (
    <div className="space-y-8">
      <button 
        onClick={onBack} 
        className="group flex items-center gap-2 text-white/60 hover:text-white transition-all px-4 py-2 rounded-lg hover:bg-white/5 w-fit"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Volver a resultados</span>
      </button>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-[#378BA4]/20 text-[#378BA4] text-sm font-bold border border-[#378BA4]/30 uppercase tracking-wider shadow-[0_0_15px_rgba(55,139,164,0.3)]">
            {career || mentor.alt_career || 'Mentoría'}
          </span>
          {mentor.rating > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-bold">
              <Star size={14} fill="currentColor" />
              {parseFloat(mentor.rating).toFixed(1)}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
          {topic || 'Sesión de Orientación Vocacional'}
        </h1>

        <div className="flex items-center gap-4 py-2">
          <div className="relative">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[#378BA4] to-[#036280]">
              {mentor.profile_img ? (
                <img 
                  src={getImageUrl(mentor.profile_img)} 
                  alt={mentorName} 
                  className="w-full h-full rounded-full object-cover border-2 border-[#012E4A]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#012E4A] flex items-center justify-center text-white font-bold">
                  {mentorName.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">Mentor experto</p>
            <p className="text-white font-bold text-lg">{mentorName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionHeader