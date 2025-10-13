import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User, Star, Calendar, Clock } from 'lucide-react'

const MentorCard = ({ mentor }) => (
  <div className="w-[320px] h-[440px] flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col group border border-gray-100">
    {/* Imagen de portada con overlay gradient */}
    <div className="h-48 w-full relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
      <img 
        src={mentor.image}
        alt={mentor.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badge de precio mejorado */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#036280] to-[#378BA4] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
        <span className="text-sm font-bold text-white">S/{mentor.price}</span>
      </div>

      {/* Badge de categoría */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
        <span className="text-xs font-bold text-[#012E4A]">{mentor.category}</span>
      </div>
    </div>

    {/* Contenido */}
    <div className="p-6 flex-1 flex flex-col">
      {/* Info superior con iconos */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={14} className="text-[#378BA4]" />
          <span>{mentor.date}</span>
        </div>
        <span className="text-xs text-gray-300">•</span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={14} className="text-[#378BA4]" />
          <span>Límite: {mentor.deadline}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-[#012E4A] mb-3 line-clamp-2 group-hover:text-[#036280] transition-colors leading-tight">
        {mentor.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3 leading-relaxed">
        {mentor.description}
      </p>
      
      {/* Rating simulado */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
      </div>
      
      {/* Perfil del mentor mejorado */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#036280] to-[#378BA4] flex items-center justify-center overflow-hidden ring-2 ring-[#378BA4]/20 group-hover:ring-[#378BA4]/40 transition-all">
            {mentor.avatar ? (
              <img 
                src={mentor.avatar} 
                alt={mentor.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={18} className="text-white" />
            )}
          </div>
          <div>
            <span className="text-sm text-[#012E4A] font-semibold block">{mentor.username}</span>
            <span className="text-xs text-gray-500">Mentor verificado</span>
          </div>
        </div>
      </div>
    </div>

    {/* Botón de acción en hover */}
    <div className="px-6 pb-6 opacity-50 group-hover:opacity-100 transition-opacity duration-300 -mt-2">
      <button className="w-full py-3 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/30 transition-all duration-300 transform hover:scale-105">
        Inscribirme
      </button>
    </div>
  </div>
)

const MentorCarousel = () => {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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
      const cardWidth = 336 // 320px + 16px gap
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
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header mejorado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#012E4A] mb-2">
              Charlas Recomendadas
            </h2>
            <p className="text-gray-600 text-lg">
              Conecta con mentores que ya están en la carrera que te interesa
            </p>
          </div>
          
          {/* Controles de navegación - Desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-gradient-to-r from-[#036280] to-[#378BA4] text-white hover:shadow-lg hover:shadow-[#378BA4]/30 hover:scale-110'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-gradient-to-r from-[#036280] to-[#378BA4] text-white hover:shadow-lg hover:shadow-[#378BA4]/30 hover:scale-110'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow - Mobile con mejor posicionamiento */}
          <button
            onClick={() => scroll('left')}
            className={` md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              canScrollLeft
                ? 'bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100'
                : 'hidden'
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft className="text-[#012E4A]" size={24} />
          </button>

          {/* Carousel Track con mejor padding */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none py-4 px-2"
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

          {/* Right Arrow - Mobile con mejor posicionamiento */}
          <button
            onClick={() => scroll('right')}
            className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              canScrollRight
                ? 'bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100'
                : 'hidden'
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight className="text-[#012E4A]" size={24} />
          </button>
        </div>

        {/* CTA al final */}
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#378BA4]/30 transition-all duration-300 transform hover:scale-105">
            Ver todas las charlas →
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
      `}</style>
    </section>
  )
}

export default MentorCarousel