import { useState, useEffect } from 'react'

// SVG Icons
const ChatIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const BookIcon = ({ className = "w-10 h-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
  </svg>
);


const ClockIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// Emojis como SVG
const ChatBubbleSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v3l6-6h-2c5.52 0 10-4.48 10-10S17.52 2 12 2z" opacity="0.8"/>
  </svg>
)

const BookSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
  </svg>
)

const LightningBoltSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const PeopleSVG = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
)

const StarSVG = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
)

const CheckSVG = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
)

const Benefits = () => {
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

  const benefits = [
    {
      icon: ChatIcon,
      title: 'Conversaciones reales',
      description: 'Habla con quien ya está en la carrera que te interesa.',
      color: 'from-[#012E4A] to-[#036280]',
      highlight: 'Conecta directamente'
    },
    {
      icon: BookIcon,
      title: 'Recursos prácticos',
      description: 'Guías, rutas y comparativas para decidir mejor.',
      color: 'from-[#036280] to-[#378BA4]',
      highlight: 'Todo en un lugar'
    },
    {
      icon: ClockIcon,
      title: 'Reserva en minutos',
      description: 'Agenda en línea y recordatorios automáticos.',
      color: 'from-[#378BA4] to-[#036280]',
      highlight: 'Rápido y fácil'
    }
  ]

  return (
    <section id="beneficios" className="relative py-24 bg-[#012E4A] overflow-hidden">
      {/* Fondo con malla 3D animada */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #036280 1px, transparent 1px),
            linear-gradient(to bottom, #036280 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>

      {/* Orbes flotantes 3D */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20" style={{
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      
      <div className={`container mx-auto px-4 relative z-10 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge con efecto neón */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#036280]/30 to-[#378BA4]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg shadow-[#378BA4]/20 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#378BA4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#378BA4] shadow-lg shadow-[#378BA4]/50"></span>
            </span>
            <span className="text-sm font-bold text-white tracking-wide">Ventajas exclusivas</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{
            textShadow: '0 0 30px rgba(55, 139, 164, 0.5)'
          }}>
            ¿Por qué usar 
            <span className="block mt-2 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] bg-clip-text text-transparent animate-gradient-x" style={{
              backgroundSize: '200% auto',
              filter: 'drop-shadow(0 0 20px rgba(55, 139, 164, 0.6))'
            }}>
              Rumbía?
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Herramientas diseñadas para que tomes la mejor decisión sobre tu futuro académico
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            
            return (
              <article 
                key={idx} 
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-[#378BA4]/50 overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{
                  boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                  animationDelay: `${idx * 100}ms`
                }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${benefit.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon con efecto holográfico */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}
                      style={{
                        boxShadow: '0 10px 30px -10px rgba(55, 139, 164, 0.5)'
                      }}
                    >
                      <Icon className="w-10 h-10 text-white relative z-10" />
                    </div>
                    
                    {/* Highlight badge mejorado */}
                    <span className="px-4 py-2 bg-[#378BA4]/20 backdrop-blur-xl border border-[#378BA4]/30 text-white rounded-full text-xs font-bold shadow-lg group-hover:bg-[#378BA4]/30 transition-all">
                      {benefit.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#378BA4] transition-colors" style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Arrow indicator con efecto 3D */}
                  <div className="flex items-center text-[#378BA4] font-bold text-sm opacity-70 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-3 transition-all duration-300">
                    <span className="mr-2">Conocer más</span>
                    <ArrowRightIcon />
                  </div>
                </div>

                {/* Decorative corner element con brillo */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-300 blur-xl`}></div>
              </article>
            )
          })}
        </div>

        {/* Stats cards 3D mejoradas */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: '+500', label: 'Estudiantes asesorados', icon: PeopleSVG, color: 'from-[#012E4A] to-[#036280]' },
            { value: '4.8/5', label: 'Calificación promedio', icon: StarSVG, color: 'from-[#036280] to-[#378BA4]' },
            { value: '100%', label: 'Satisfacción garantizada', icon: CheckSVG, color: 'from-[#378BA4] to-[#036280]' }
          ].map((stat, idx) => {
            const StatIcon = stat.icon
            return (
            <div 
              key={idx}
              className="group relative text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 hover:border-[#378BA4]/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              style={{
                boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)',
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-6 transition-transform inline-block text-white">
                  <StatIcon />
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-[#378BA4] transition-colors" style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          )})}
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Benefits