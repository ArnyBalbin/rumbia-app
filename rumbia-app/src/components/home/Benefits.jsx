import { useState, useEffect } from 'react'
import { MessageCircle, BookOpen, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const Benefits = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate();

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
      icon: MessageCircle,
      title: 'Conversaciones reales',
      description: 'Habla con quien ya está en la carrera que te interesa.',
      color: 'from-[#012E4A] to-[#036280]',
      highlight: 'Conecta directamente',
      emoji: '💬'
    },
    {
      icon: Clock,
      title: 'Reserva en minutos',
      description: 'Agenda en línea y recordatorios automáticos.',
      color: 'from-[#378BA4] to-[#036280]',
      highlight: 'Rápido y fácil',
      emoji: '⚡'
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
                      <Icon className="w-10 h-10 text-white relative z-10" strokeWidth={2} />
                      {/* Emoji flotante */}
                      <span className="absolute -top-2 -right-2 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform">
                        {benefit.emoji}
                      </span>
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
                    <ArrowRight className="w-5 h-5" />
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
            { value: '+500', label: 'Estudiantes asesorados', icon: '👥', color: 'from-[#012E4A] to-[#036280]' },
            { value: '4.8/5', label: 'Calificación promedio', icon: '⭐', color: 'from-[#036280] to-[#378BA4]' },
            { value: '100%', label: 'Satisfacción garantizada', icon: '✅', color: 'from-[#378BA4] to-[#036280]' }
          ].map((stat, idx) => (
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
                <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-6 transition-transform inline-block">{stat.icon}</div>
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
          ))}
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