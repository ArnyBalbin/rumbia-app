import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MentorCard from './MentorCard'

const MentorCarousel = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

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
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
      gradient: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)'
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
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
      gradient: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)'
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
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
        Charlas Recomendadas
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-12 h-12 rounded-full shadow-custom flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="text-primary" />
        </button>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-12 h-12 rounded-full shadow-custom flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="text-primary" />
        </button>
      </div>
    </section>
  )
}

export default MentorCarousel