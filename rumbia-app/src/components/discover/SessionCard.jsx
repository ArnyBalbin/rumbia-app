import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

const SessionCard = ({ session }) => {
  const navigate = useNavigate()
  const { 
    id, sessionCode, title, mentor, category, career,
    date, time, price, participants, rating, gradient
  } = session

  const handleEnroll = () => {
    navigate(`/session/${sessionCode || id}`)
  }

  return (
    <article className="group flex flex-col h-full bg-[#023e61]/40 hover:bg-[#023e61]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#378BA4]/50 hover:-translate-y-1">
      
      {/* 1. Header: Categoría y Mentor */}
      <div className="relative p-5 pb-0">
        {/* Strip de color de categoría */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: gradient }}></div>
        
        <div className="flex items-start justify-between mb-4 mt-2">
          {/* Info del Mentor */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full ring-2 ring-white/10 overflow-hidden bg-[#012E4A]">
                {mentor.profileImg ? (
                  <img 
                    src={mentor.profileImg} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://ui-avatars.com/api/?name=" + mentor.name + "&background=0D8ABC&color=fff";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#378BA4] to-[#036280] text-white font-bold text-lg">
                    {mentor.name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Badge Verificado/Online opcional */}
              <div className="absolute -bottom-1 -right-1 bg-[#012E4A] rounded-full p-0.5">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-[#012E4A]"></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm leading-tight group-hover:text-[#378BA4] transition-colors">
                {mentor.name}
              </h4>
              <p className="text-white/50 text-xs mt-0.5 truncate max-w-[150px]">
                {mentor.career || 'Mentor Experto'}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          {rating > 0 && (
            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-yellow-100 text-xs font-bold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Body: Título y Detalles */}
      <div className="px-5 flex-grow flex flex-col gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[#378BA4]/10 text-[#378BA4] text-[10px] font-bold uppercase tracking-wider border border-[#378BA4]/20">
            {category}
          </span>
        </div>

        {/* Título de la sesión */}
        <h3 
          className="text-lg font-bold text-white leading-snug cursor-pointer line-clamp-2 min-h-[3.5rem]"
          onClick={handleEnroll}
        >
          {title}
        </h3>

        {/* Grid de Fecha y Hora */}
        <div className="grid grid-cols-2 gap-3 mt-auto py-4 border-t border-white/5 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="w-4 h-4 text-[#378BA4]" />
            <span className="truncate text-xs font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Clock className="w-4 h-4 text-[#378BA4]" />
            <span className="truncate text-xs font-medium">{time}</span>
          </div>
        </div>
      </div>

      {/* 3. Footer: Precio y Call to Action */}
      <div className="p-4 bg-black/20 flex items-center justify-between group-hover:bg-[#378BA4]/10 transition-colors">
        <div>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-0.5">Inversión</p>
          <p className="text-xl font-black text-white">
            {price === 0 ? 'Gratis' : `S/${price.toFixed(2)}`}
          </p>
        </div>
        
        <button 
          onClick={handleEnroll}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#012E4A] hover:bg-[#378BA4] hover:text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg transform active:scale-95"
        >
          Ver detalle
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  )
}

export default SessionCard