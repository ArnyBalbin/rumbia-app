import { User } from 'lucide-react'

const MentorAbout = ({ description, language }) => {
  return (
    <section className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-colors">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <User className="text-[#378BA4]" />
        Sobre el Mentor
      </h3>
      <p className="text-white/80 leading-relaxed text-lg font-light">
        {description || "Este mentor está listo para compartir su experiencia universitaria contigo y resolver todas tus dudas sobre la carrera."}
      </p>
      {language && (
        <div className="mt-6 pt-4 border-t border-white/10 flex gap-2 text-sm text-white/60">
          <span className="font-semibold uppercase tracking-wider">Idiomas:</span>
          <span className="text-white">{language}</span>
        </div>
      )}
    </section>
  )
}

export default MentorAbout