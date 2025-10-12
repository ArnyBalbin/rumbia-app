import { UserPlus, Calendar, MessageCircle } from 'lucide-react'
import { useNavigate } from "react-router-dom"

const StepsTimeline = () => {
  const navigate = useNavigate()
  const isAuthenticated = false

  const handleReserve = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Regístrate",
      description: "Crea tu perfil como estudiante que busca orientación o como universitario que desea orientar.",
      color: "from-[#012E4A] to-[#036280]",
      delay: "0ms"
    },
    {
      icon: Calendar,
      number: "02",
      title: "Conecta y agenda",
      description: "Elige a un orientador que estudie la carrera que te interesa y programa una videollamada.",
      color: "from-[#378BA4] to-[#036280]",
      delay: "150ms"
    },
    {
      icon: MessageCircle,
      number: "03",
      title: "Conversa y decide",
      description: "Habla con tu orientador, resuelve tus dudas y conoce la experiencia real antes de elegir tu carrera.",
      color: "from-[#036280] to-[#012E4A]",
      delay: "300ms"
    }
  ]

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#378BA4]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#012E4A]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#012E4A] mb-4">
            💡 Cómo funciona Rumbía
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            En solo 3 pasos simples conectarás con orientadores que transformarán tu decisión vocacional
          </p>
        </div>

        {/* Timeline for Desktop */}
        <div className="hidden lg:block relative">
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#012E4A] via-[#036280] via-[#378BA4] to-[#012E4A] opacity-20"></div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="relative" style={{ animationDelay: step.delay }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-[#378BA4]/20 flex items-center justify-center z-10">
                    <span className={`text-2xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                  </div>
                  <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-[#012E4A] mb-3 group-hover:text-[#036280] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline for Mobile/Tablet */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-[#036280] to-[#378BA4] opacity-30 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-[#012E4A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={handleReserve}
            className="px-8 py-4 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#378BA4]/30 transition-all duration-300 transform hover:scale-105">
            Comenzar ahora
          </button>
        </div>
      </div>
    </section>
  )
}

export default StepsTimeline
