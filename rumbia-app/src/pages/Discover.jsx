import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SearchBar from '../components/discover/SearchBar'
import FilterPanel from '../components/discover/FilterPanel'
import SessionCard from '../components/discover/SessionCard'
import WhatsAppButton from '../components/common/WhatsAppButton'

const Discover = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    careers: [],
    priceRange: [],
    schedule: []
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Todas las sesiones disponibles
  const allSessions = [
    {
      id: 1,
      title: 'Explora Ingeniería de Sistemas',
      mentor: { name: 'Rubén Torres', university: 'UNMSM' },
      category: 'Ingeniería',
      date: '12/10/2025',
      time: '18:00 - 19:00',
      price: 20,
      participants: 15,
      rating: 4.8,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      scheduleType: 'evening'
    },
    {
      id: 2,
      title: 'Emprendimiento digital',
      mentor: { name: 'María Gonzales', university: 'PUCP' },
      category: 'Negocios',
      date: '20/10/2025',
      time: '17:00 - 18:30',
      price: 20,
      participants: 20,
      rating: 4.9,
      gradient: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)',
      scheduleType: 'afternoon'
    },
    {
      id: 3,
      title: 'Innovación en salud pública',
      mentor: { name: 'Carlos Medina', university: 'Cayetano Heredia' },
      category: 'Salud',
      date: '15/10/2025',
      time: '15:00 - 16:00',
      price: 15,
      participants: 12,
      rating: 4.7,
      gradient: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)',
      scheduleType: 'afternoon'
    },
    {
      id: 4,
      title: 'Arquitectura sostenible',
      mentor: { name: 'Andrea Quispe', university: 'UNI' },
      category: 'Artes & Diseño',
      date: '14/10/2025',
      time: '16:00 - 17:30',
      price: 15,
      participants: 10,
      rating: 4.6,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      scheduleType: 'afternoon'
    },
    {
      id: 5,
      title: 'Productividad universitaria',
      mentor: { name: 'Lucía Ramos', university: 'UNFV' },
      category: 'Psicología',
      date: '18/10/2025',
      time: '19:00 - 20:00',
      price: 15,
      participants: 18,
      rating: 4.8,
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      scheduleType: 'evening'
    },
    {
      id: 6,
      title: 'Introducción a Data Science',
      mentor: { name: 'Jorge Paredes', university: 'UPC' },
      category: 'Tecnología',
      date: '16/10/2025',
      time: '10:00 - 11:30',
      price: 25,
      participants: 22,
      rating: 4.9,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      scheduleType: 'morning'
    },
    {
      id: 7,
      title: 'Ciencias Sociales en acción',
      mentor: { name: 'Daniela Flores', university: 'PUCP' },
      category: 'Ciencias Sociales',
      date: '19/10/2025',
      time: '14:00 - 15:30',
      price: 0,
      participants: 30,
      rating: 4.5,
      gradient: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)',
      scheduleType: 'afternoon'
    },
    {
      id: 8,
      title: 'Pedagogía moderna',
      mentor: { name: 'Rosa Martinez', university: 'Villarreal' },
      category: 'Educación',
      date: '21/10/2025',
      time: '09:00 - 10:00',
      price: 10,
      participants: 14,
      rating: 4.4,
      gradient: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)',
      scheduleType: 'morning'
    }
  ]

  // Filtrar sesiones
  const filteredSessions = allSessions.filter(session => {
    // Búsqueda por texto
    const matchesSearch = 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    // Filtro por carrera
    const matchesCareer = 
      filters.careers.length === 0 || 
      filters.careers.some(career => session.category.includes(career))

    // Filtro por precio
    let matchesPrice = filters.priceRange.length === 0
    if (filters.priceRange.length > 0) {
      matchesPrice = filters.priceRange.some(range => {
        if (range === 'free') return session.price === 0
        if (range === '0-20') return session.price > 0 && session.price <= 20
        if (range === '20-50') return session.price > 20 && session.price <= 50
        if (range === '50+') return session.price > 50
        return false
      })
    }

    // Filtro por horario
    const matchesSchedule = 
      filters.schedule.length === 0 || 
      filters.schedule.includes(session.scheduleType)

    return matchesCareer && matchesPrice && matchesSchedule
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden">
      {/* Orbes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        ></div>
      </div>

      {/* Header con glassmorphism */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{
                textShadow: '0 0 30px rgba(55, 139, 164, 0.5)'
              }}>
                Descubre sesiones
                <span className="block mt-2 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] bg-clip-text text-transparent animate-gradient-x" style={{
                  backgroundSize: '200% auto'
                }}>
                  para ti
                </span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Encuentra mentores y sesiones según tus intereses
              </p>
            </div>

            <div className="mb-8">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar con filtros */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <FilterPanel 
                    filters={filters}
                    setFilters={setFilters}
                    isOpen={filterOpen}
                    setIsOpen={setFilterOpen}
                  />
                </div>
              </aside>

              {/* Resultados */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/80 font-medium">
                    {filteredSessions.length} {filteredSessions.length === 1 ? 'sesión encontrada' : 'sesiones encontradas'}
                  </p>
                  <select className="px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#378BA4] bg-white/10 backdrop-blur-xl text-white font-medium text-sm hover:border-white/50 transition-colors">
                    <option className="bg-[#012E4A]">Más recientes</option>
                    <option className="bg-[#012E4A]">Mejor valoradas</option>
                    <option className="bg-[#012E4A]">Precio: menor a mayor</option>
                    <option className="bg-[#012E4A]">Precio: mayor a menor</option>
                  </select>
                </div>

                {filteredSessions.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredSessions.map(session => (
                      <SessionCard key={session.id} session={session} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      No se encontraron sesiones
                    </h3>
                    <p className="text-white/70 mb-6">
                      Intenta ajustar los filtros o la búsqueda
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setFilters({ careers: [], priceRange: [], schedule: [] })
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer con glassmorphism */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <Footer />
        </div>
      </div>

      <WhatsAppButton phoneNumber="+51986107594" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Discover