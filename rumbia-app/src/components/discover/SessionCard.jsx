import { useNavigate } from 'react-router-dom'

// SVG Icons
const CalendarSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const UsersSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const StarSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 10.26 23 10.27 17 15.14 19.09 23.41 12 18.54 4.91 23.41 6.91 15.14 1 10.27 8.91 10.26 12 2" />
  </svg>
)

const SessionCard = ({ session }) => {
  const navigate = useNavigate()
  const { 
    id, 
    sessionCode,
    title, 
    mentor, 
    category, 
    career,
    date, 
    time, 
    price, 
    participants, 
    rating, 
    gradient,
    meetingPlatform 
  } = session

  const handleEnroll = () => {
    navigate(`/session/${sessionCode || id}`)
  }

  return (
    <article className="group relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 hover:border-[#378BA4] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_-15px_rgba(55,139,164,0.6)]">
      {/* Glow effect animado */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4] via-[#51cf66] to-[#378BA4] rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-gradient-rotate"></div>

      {/* Header con categoría */}
      <div 
        className="relative h-40 flex flex-col items-center justify-center text-white font-bold group-hover:scale-105 transition-transform duration-500 z-10 p-6"
        style={{ background: gradient }}
      >
        <div className="text-center space-y-2">
          <span className="text-2xl drop-shadow-lg block">{category}</span>
          {career && career !== category && (
            <span className="text-sm text-white/95 drop-shadow-md block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
              {career}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative p-6 space-y-5 z-10">
        <h3 className="font-bold text-xl text-white line-clamp-2 group-hover:text-[#378BA4] transition-colors duration-300 min-h-[3.5rem] leading-snug">
          {title}
        </h3>

        <div className="space-y-3.5 text-sm text-white/80">
          <div className="flex items-center gap-3 group/item hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover/item:bg-[#378BA4]/30 transition-colors">
              <CalendarSVG size={18} />
            </div>
            <span className="font-medium">{date}</span>
          </div>
          
          <div className="flex items-center gap-3 group/item hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover/item:bg-[#378BA4]/30 transition-colors">
              <ClockSVG size={18} />
            </div>
            <span className="font-medium">{time}</span>
          </div>
          
          {meetingPlatform && (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 rounded-xl font-semibold border border-white/30 text-white backdrop-blur-sm">
                {meetingPlatform}
              </div>
            </div>
          )}
          
          {participants > 0 && (
            <div className="flex items-center gap-3 group/item hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover/item:bg-[#378BA4]/30 transition-colors">
                <UsersSVG size={18} />
              </div>
              <span className="font-medium">{participants} participantes</span>
            </div>
          )}
          
          {rating && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <StarSVG size={18} />
              </div>
              <span className="text-yellow-300 font-bold text-base">{rating.toFixed(1)} / 5.0</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/30">
          <div className="flex flex-col">
            <span className="text-xs text-white/60 font-medium mb-1">Precio</span>
            <span className="text-3xl font-black text-transparent bg-gradient-to-r from-[#378BA4] to-[#51cf66] bg-clip-text">
              {price === 0 ? 'Gratis' : `S/${price.toFixed(2)}`}
            </span>
          </div>
          <button 
            onClick={handleEnroll}
            className="px-6 py-3.5 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#378BA4]/60 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Inscribirme
          </button>
        </div>
      </div>

      {/* Footer - Mentor */}
      <div className="relative flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-white/10 to-white/5 border-t border-white/30 z-10 backdrop-blur-sm">
        {mentor.profileImg ? (
          <img 
            src={mentor.profileImg} 
            alt={mentor.name}
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 shadow-lg border-2 border-white/30 group-hover:border-[#378BA4] transition-all ring-2 ring-white/20"
          />
        ) : (
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg border-2 border-white/30 group-hover:border-[#378BA4] transition-all"
            style={{ background: gradient }}
          >
            {mentor.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-bold text-white text-base truncate">{mentor.name}</p>
          <p className="text-sm text-white/70 truncate">{mentor.university}</p>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
      
      <style>{`
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-rotate {
          background-size: 200% auto;
          animation: gradient-rotate 3s ease infinite;
        }
      `}</style>
    </article>
  )
}

export default SessionCard