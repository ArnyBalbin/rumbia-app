import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'

const MentorCard = ({ mentor }) => (
  <div className="w-[300px] h-[420px] flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
    {/* Imagen de portada */}
    <div className="h-48 w-full relative overflow-hidden bg-gray-200">
      <img 
        src={mentor.image}
        alt={mentor.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div 
        className="w-full h-full items-center justify-center text-white text-4xl font-bold hidden"
        style={{ background: mentor.gradient }}
      >
        {mentor.title.charAt(0)}
      </div>
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-md">
        S/{mentor.price}
      </div>
    </div>

    {/* Contenido */}
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-[#012E4A] bg-[#378BA4]/10 px-2 py-1 rounded-full">
          {mentor.category}
        </span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500">Límite: {mentor.deadline}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        {mentor.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
        {mentor.description}
      </p>
      
      {/* Perfil del mentor */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#036280] to-[#378BA4] flex items-center justify-center overflow-hidden">
            {mentor.avatar ? (
              <img 
                src={mentor.avatar} 
                alt={mentor.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="text-white" />
            )}
          </div>
          <span className="text-sm text-gray-700 font-medium">{mentor.username}</span>
        </div>
        <span className="text-xs text-gray-400">{mentor.date}</span>
      </div>
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
      const cardWidth = 316
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
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Charlas Recomendadas
        </h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'bg-[#012E4A] text-white hover:bg-[#036280] shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'bg-[#012E4A] text-white hover:bg-[#036280] shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative group">
        {/* Left Arrow - Mobile */}
        <button
          onClick={() => scroll('left')}
          className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? 'bg-white shadow-lg opacity-0 group-hover:opacity-100'
              : 'hidden'
          }`}
          aria-label="Anterior"
        >
          <ChevronLeft className="text-[#012E4A]" size={20} />
        </button>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none"
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

        {/* Right Arrow - Mobile */}
        <button
          onClick={() => scroll('right')}
          className={`md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? 'bg-white shadow-lg opacity-0 group-hover:opacity-100'
              : 'hidden'
          }`}
          aria-label="Siguiente"
        >
          <ChevronRight className="text-[#012E4A]" size={20} />
        </button>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {mentors.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MentorCarousel