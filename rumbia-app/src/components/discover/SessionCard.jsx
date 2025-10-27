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
  const { id, title, mentor, category, date, time, price, participants, rating, gradient } = session

  return (
    <article className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:border-[#378BA4]/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      {/* Header con categoría */}
      <div 
        className="relative h-32 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 z-10"
        style={{ background: gradient }}
      >
        {category}
      </div>

      {/* Body */}
      <div className="relative p-6 space-y-4 z-10">
        <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-[#378BA4] transition-colors">
          {title}
        </h3>

        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-center gap-3">
            <CalendarSVG size={16} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3">
            <ClockSVG size={16} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <UsersSVG size={16} />
            <span>{participants} participantes</span>
          </div>
          {rating && (
            <div className="flex items-center gap-3">
              <StarSVG size={16} />
              <span className="text-yellow-300 font-medium">{rating} / 5.0</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <span className="text-2xl font-bold text-[#378BA4]">S/{price}</span>
          <button 
            onClick={() => navigate(`/schedule/${id}`)}
            className="px-4 py-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
          >
            Inscribirme
          </button>
        </div>
      </div>

      {/* Footer - Mentor */}
      <div className="relative flex items-center gap-3 px-6 py-4 bg-white/5 border-t border-white/20 z-10">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg"
          style={{ background: gradient }}
        >
          {mentor.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white text-sm truncate">{mentor.name}</p>
          <p className="text-xs text-white/60 truncate">{mentor.university}</p>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </article>
  )
}

export default SessionCard