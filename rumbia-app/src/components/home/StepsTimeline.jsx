import { useState, useEffect } from 'react'

// SVG Icons
const UserPlusIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)

const CalendarIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const MessageCircleIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const ArrowRightSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const RocketSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
)

const StepsTimeline = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const steps = [
    {
      icon: UserPlusIcon,
      number: "01",
      title: "Regístrate",
      description: "Crea tu perfil como estudiante que busca orientación o como universitario que desea orientar.",
      color: "from-[#012E4A] to-[#036280]"
    },
    {
      icon: CalendarIcon,
      number: "02",
      title: "Conecta y agenda",
      description: "Elige a un orientador que estudie la carrera que te interesa y programa una videollamada.",
      color: "from-[#378BA4] to-[#036280]"
    },
    {
      icon: MessageCircleIcon,
      number: "03",
      title: "Conversa y decide",
      description: "Habla con tu orientador, resuelve tus dudas y conoce la experiencia real antes de elegir tu carrera.",
      color: "from-[#036280] to-[#012E4A]"
    }
  ]

  return (
    <section id="lineadetiempo" className="relative py-24 overflow-hidden">
      {/* Fondo con malla 3D sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #378BA4 1px, transparent 1px),
            linear-gradient(to bottom, #378BA4 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>

      <div className={`container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header con efecto 3D */}
        <div className="text-center mb-20">
          {/* Badge animado */}
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            Cómo funciona 
            <span className="block mt-2 bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x" style={{
              backgroundSize: '200% auto'
            }}>
              Rumbía
            </span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            En solo 3 pasos simples conectarás con orientadores que transformarán tu decisión vocacional
          </p>
        </div>

        {/* Timeline para Desktop */}
        <div className="hidden lg:block relative mb-20">
          {/* Línea conectora 3D con gradiente animado */}
          <div className="absolute top-24 left-0 right-0 h-2 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-[#378BA4]/50 to-white/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="relative" style={{ animationDelay: `${idx * 100}ms` }}>
                  {/* Número flotante 3D */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl border-4 border-white/20 transform hover:scale-125 hover:rotate-12 transition-all duration-300`}>
                        <span className="text-2xl font-black text-white">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3D con glassmorphism */}
                  <div className="group mt-12 relative">
                    {/* Glow effect del card */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:border-[#378BA4]/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden h-full flex flex-col"
                      style={{
                        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon con efecto holográfico */}
                        <div className="relative mb-6 flex items-start gap-4">
                          <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity w-16 h-16`}></div>
                          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl flex-shrink-0`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white group-hover:text-[#378BA4] transition-colors">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed flex-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline para Mobile/Tablet */}
        <div className="lg:hidden space-y-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative flex gap-6">
                {/* Línea vertical con gradiente */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-50`}></div>
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl flex-shrink-0 transform hover:scale-110 hover:rotate-6 transition-all duration-300 border-4 border-white/20`}>
                      <span className="text-white text-xl font-black">{step.number}</span>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-white/30 via-[#378BA4]/50 to-white/30 mt-4 rounded-full"></div>
                  )}
                </div>

                {/* Card content */}
                <div className="flex-1 pb-8">
                  <div className="group relative">
                    {/* Glow effect */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:border-[#378BA4]/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      <div className="relative z-10">
                        <div className="relative inline-block mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#378BA4] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA con efectos 3D */}
        <div className="mt-16 text-center">
          <button
            className="group relative px-12 py-6 bg-gradient-to-r from-white to-white/90 text-[#012E4A] font-black text-lg rounded-2xl shadow-2xl shadow-black/20 hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            style={{
              boxShadow: '0 20px 60px -15px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Comenzar ahora
              <span className="group-hover:translate-x-2 transition-transform">
                <ArrowRightSVG />
              </span>
            </span>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default StepsTimeline