import { CheckCircle } from 'lucide-react'

const SessionContent = ({ notes }) => {
  return (
    <section>
      <h3 className="text-2xl font-bold text-white mb-6">Lo que obtendrás de esta sesión</h3>
      <div className="bg-[#023e61]/30 rounded-3xl p-8 border border-white/10 space-y-6">
        <p className="text-white/90 leading-relaxed text-lg">
          {notes || "Conversación directa y honesta sobre el futuro profesional, mitos de la carrera y oportunidades laborales."}
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          {[
            "Visión real del campo laboral",
            "Consejos académicos personalizados",
            "Resolución de dudas en vivo",
            "Networking con un futuro colega"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <CheckCircle size={20} className="text-[#378BA4] flex-shrink-0 mt-0.5" />
              <span className="text-white/90 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SessionContent