import { Calendar, Clock, Users, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'

const SessionCard = ({ session }) => {
  const navigate = useNavigate()
  const { id, title, mentor, category, date, time, price, participants, rating, gradient } = session

  return (
    <article className="card hover:shadow-xl transition-shadow">
      {/* Header con categoría */}
      <div 
        className="h-32 rounded-t-custom -mt-6 -mx-6 mb-4 flex items-center justify-center text-white font-bold text-xl"
        style={{ background: gradient }}
      >
        {category}
      </div>

      {/* Body */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-textDark">{title}</h3>

        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{participants} participantes</span>
          </div>
          {rating && (
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{rating} / 5.0</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-cream">
          <span className="text-2xl font-bold text-primary">S/{price}</span>
          <Button onClick={() => navigate(`/schedule/${id}`)}>
            Inscribirme
          </Button>
        </div>
      </div>

      {/* Footer - Mentor */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: gradient }}
        >
          {mentor.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-textDark text-sm">{mentor.name}</p>
          <p className="text-xs text-muted">{mentor.university}</p>
        </div>
      </div>
    </article>
  )
}

export default SessionCard