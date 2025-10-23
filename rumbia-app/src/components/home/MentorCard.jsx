import { Calendar, User } from 'lucide-react'

const MentorCard = ({ mentor }) => {
  const { title, category, price, date, deadline, description, username, gradient } = mentor

  return (
    <article className="card min-w-[300px] flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
      {/* Card Image */}
      <div className="h-40 rounded-t-custom -mt-6 -mx-6 mb-4 overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
          style={{ background: gradient }}
        >
          {category}
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-textDark">{title}</h3>
          <span className="text-primary font-bold text-lg whitespace-nowrap ml-2">
            S/{price}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar size={16} />
          <span>{date} · Inscripción hasta {deadline}</span>
        </div>

        <p className="text-muted">{description}</p>

        <button className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors">
          Inscribirme
        </button>
      </div>

      {/* Card Footer */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: gradient }}
        >
          {username.charAt(1).toUpperCase()}
        </div>
        <span className="text-muted text-sm">{username}</span>
      </div>
    </article>
  )
}

export default MentorCard