import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User, Star, Calendar, Clock, Sparkles } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const MentorCard = ({ mentor }) => (
  <div className="group w-[340px] h-[480px] flex-shrink-0 relative">
    {/* Glow effect externo */}
    <div className="absolute -inset-2 bg-gradient-to-r from-[#036280] to-[#378BA4] rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
    
    <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 flex flex-col border border-white/20 group-hover:border-[#378BA4]/50"
      style={{
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"></div>
      
      {/* Imagen de portada mejorada - MÁS GRANDE */}
      <div className="h-56 w-full relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
        <img 
          src={mentor.image}
          alt={mentor.title}
          className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700 ease-out"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div 
          className="w-full h-full items-center justify-center text-white text-5xl font-bold hidden"
          style={{ background: mentor.gradient }}
        >
          {mentor.title.charAt(0)}
        </div>
        
        {/* Overlay gradient dinámico */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#012E4A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Badge de precio 3D */}
        <div className="absolute top-4 right-4 group/price">
          <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] rounded-full blur-lg opacity-60 group-hover/price:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-[#036280] to-[#378BA4] backdrop-blur-sm px-5 py-2.5 rounded-full shadow-2xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 border border-white/30">
            <span className="text-sm font-black text-white">S/{mentor.price}</span>
          </div>
        </div>

        {/* Badge de categoría mejorado */}
        <div className="absolute top-4 left-4 group/category">
          <div className="relative bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg group-hover/category:bg-gradient-to-r group-hover/category:from-[#036280] group-hover/category:to-[#378BA4] transition-all duration-300 border border-white/30 transform group-hover:scale-110">
            <span className="text-xs font-bold text-white transition-colors">{mentor.category}</span>
          </div>
        </div>

        {/* Sparkle badge - aparece en hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 bg-[#378BA4] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/30">
              <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Info superior con iconos */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-300 group-hover:text-[#378BA4] transition-colors">
            <Calendar size={14} className="text-[#378BA4]" />
            <span className="font-medium">{mentor.date}</span>
          </div>
          <span className="text-xs text-gray-500">•</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-300 group-hover:text-[#378BA4] transition-colors">
            <Clock size={14} className="text-[#378BA4]" />
            <span className="font-medium">Límite: {mentor.deadline}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-[#378BA4] transition-colors leading-tight">
          {mentor.title}
        </h3>
        
        <p className="text-sm text-gray-300 mb-4 flex-1 line-clamp-3 leading-relaxed group-hover:text-gray-200 transition-colors">
          {mentor.description}
        </p>
        
        {/* Rating con animación escalonada */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={15} 
              className={`transition-all duration-300 ${
                i < 4 
                  ? "fill-yellow-400 text-yellow-400 group-hover:scale-125 group-hover:rotate-12" 
                  : "text-gray-500 group-hover:text-gray-400"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2 font-semibold group-hover:text-[#378BA4] transition-colors">(4.8)</span>
        </div>
        
        {/* Perfil del mentor con efectos */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-[#378BA4]/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#036280] to-[#378BA4] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#036280] to-[#378BA4] flex items-center justify-center overflow-hidden ring-2 ring-[#378BA4]/30 group-hover:ring-4 group-hover:ring-[#378BA4]/60 transition-all duration-300 group-hover:scale-110 shadow-lg">
                {mentor.avatar ? (
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-white font-bold block group-hover:text-[#378BA4] transition-colors">{mentor.username}</span>
              <span className="text-xs text-gray-400 font-medium group-hover:text-[#378BA4] transition-colors">Mentor verificado ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de acción mejorado */}
      <div className="px-6 pb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300 -mt-2">
        <button className="relative w-full py-3.5 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-black rounded-xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#378BA4]/40">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Inscribirme
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
        </button>
      </div>
    </div>
  </div>
)

const MentorCarousel = () => {
  const scrollRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const mentors = [
    {
      id: 1,
      title: 'Explora Ingeniería de Sistemas',
      category: 'Ingeniería',
      price: 20,
      date: '12/10/2025',
      deadline: '10/10',
      description: 'Conoce herramientas, cursos clave y lo que no te cuentan de la carrera.',
      username: '@ruben.tech',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      gradient: 'linear-gradient(135deg, #036280 0%, #378BA4 100%)'
    },
    {
      id: 2,
      title: 'Emprendimiento digital',
      category: 'Negocios',
      price: 20,
      date: '20/10/2025',
      deadline: '18/10',
      description: 'Cómo iniciar tu startup mientras estudias la universidad.',
      username: '@maria_biz',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      gradient: 'linear-gradient(135deg, #012E4A 0%, #036280 100%)'
    },
    {
      id: 3,
      title: 'Arquitectura del futuro',
      category: 'Diseño',
      price: 15,
      date: '14/10/2025',
      deadline: '12/10',
      description: 'Diseño sostenible y nuevas tecnologías en construcción.',
      username: '@andrea_tech',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      gradient: 'linear-gradient(135deg, #036280 0%, #378BA4 100%)'
    },
    {
      id: 4,
      title: 'Innovación y salud pública',
      category: 'Salud',
      price: 15,
      date: '15/10/2025',
      deadline: '13/10',
      description: 'Oportunidades reales para jóvenes en carreras de salud e innovación.',
      username: '@carlos_med',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      gradient: 'linear-gradient(135deg, #378BA4 0%, #036280 100%)'
    },
    {
      id: 5,
      title: 'Productividad universitaria',
      category: 'Psicología',
      price: 15,
      date: '18/10/2025',
      deadline: '16/10',
      description: 'Descubre apps, hábitos y herramientas que te salvan el ciclo.',
      username: '@lucia_psi',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      gradient: 'linear-gradient(135deg, #012E4A 0%, #378BA4 100%)'
    },
    {
      id: 6,
      title: 'Marketing Digital',
      category: 'Marketing',
      price: 18,
      date: '22/10/2025',
      deadline: '20/10',
      description: 'Estrategias modernas para destacar en redes sociales.',
      username: '@jose_mkt',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      gradient: 'linear-gradient(135deg, #036280 0%, #012E4A 100%)'
    }
  ]

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 360
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons)
      checkScrollButtons()
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons)
    }
  }, [])

  return (
    <section className="relative bg-[#012E4A] py-20 px-4 lg:px-24 overflow-hidden">
      {/* Fondo con malla 3D */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #036280 1px, transparent 1px), linear-gradient(to bottom, #036280 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>

      {/* Orbes flotantes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#036280] rounded-full blur-3xl opacity-20" style={{
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div className={`container mx-auto px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>

            <h2 className="text-4xl lg:text-5xl font-black text-white mb-2" style={{
              textShadow: '0 0 30px rgba(55, 139, 164, 0.5)'
            }}>
              Charlas 
              <span className="block mt-1 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] bg-clip-text text-transparent animate-gradient-x" style={{
                backgroundSize: '200% auto',
                filter: 'drop-shadow(0 0 20px rgba(55, 139, 164, 0.6))'
              }}>
                Recomendadas
              </span>
            </h2>
            <p className="text-gray-300 text-lg">
              Conecta con mentores que ya están en la carrera que te interesa
            </p>
          </div>
          
          {/* Controles de navegación - Desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden ${
                canScrollLeft
                  ? 'bg-gradient-to-r from-[#036280] to-[#378BA4] text-white hover:shadow-xl hover:shadow-[#378BA4]/40 hover:scale-110 group'
                  : 'bg-white/10 text-gray-600 cursor-not-allowed'
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft size={28} className="relative z-10" />
              {canScrollLeft && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              )}
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden ${
                canScrollRight
                  ? 'bg-gradient-to-r from-[#036280] to-[#378BA4] text-white hover:shadow-xl hover:shadow-[#378BA4]/40 hover:scale-110 group'
                  : 'bg-white/10 text-gray-600 cursor-not-allowed'
              }`}
              aria-label="Siguiente"
            >
              <ChevronRight size={28} className="relative z-10" />
              {canScrollRight && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              )}
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none py-4 px-2"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-black text-lg rounded-2xl shadow-2xl shadow-[#378BA4]/40 hover:shadow-[#378BA4]/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            style={{
              boxShadow: '0 20px 60px -15px rgba(55, 139, 164, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Ver todas las charlas
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

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

export default MentorCarousel