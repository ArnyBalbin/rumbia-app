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
  const { isAuthenticated, getSessions, getCareers, getCategories } = useAuth()
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    careers: [],
    categories: [],
    priceRange: [],
    schedule: []
  })
  
  const [sessions, setSessions] = useState([])
  const [careers, setCareers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      loadInitialData()
    }
  }, [isAuthenticated, navigate])

  const loadInitialData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [sessionsResult, careersResult, categoriesResult] = await Promise.all([
        getSessions({ session_status: 'scheduled' }),
        getCareers(),
        getCategories()
      ])

      if (sessionsResult.success) {
        const sessionsData = sessionsResult.data || []
        console.log('Sesiones cargadas:', sessionsData.length)
        setSessions(sessionsData)
      } else {
        console.error('Error cargando sesiones:', sessionsResult.error)
        setSessions([])
      }

      if (careersResult.success) {
        setCareers(careersResult.data || [])
      } else {
        console.error('Error cargando carreras:', careersResult.error)
        setCareers([])
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.data || [])
      } else {
        console.error('Error cargando categorías:', categoriesResult.error)
        setCategories([])
      }
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('No se pudieron cargar los datos. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-PE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  const formatTime = (dateString, durationMinutes) => {
    if (!dateString) return ''
    const startDate = new Date(dateString)
    const endDate = new Date(startDate.getTime() + (durationMinutes || 60) * 60000)
    
    const formatHour = (date) => {
      return date.toLocaleTimeString('es-PE', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    }
    
    return `${formatHour(startDate)} - ${formatHour(endDate)}`
  }

  const getScheduleType = (dateString) => {
    if (!dateString) return 'afternoon'
    const date = new Date(dateString)
    const hour = date.getHours()
    const day = date.getDay()
    
    if (day === 0 || day === 6) return 'weekend'
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    if (hour >= 18 && hour < 24) return 'evening'
    return 'afternoon'
  }

  const getCategoryGradient = (categoryId) => {
    const gradients = {
      1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      2: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)',
      3: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)',
      4: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      5: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)',
      6: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)',
      7: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
    return gradients[categoryId] || 'linear-gradient(135deg, #378BA4 0%, #036280 100%)'
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id_category === categoryId)
    return category?.category_name || 'General'
  }

  const transformedSessions = sessions.map(session => {
    const mentor = session.mentor || {}
    const user = mentor.user || {}
    const career = mentor.career || {}
    const categoryId = career.category

    return {
      id: session.id_session,
      sessionCode: session.uuid,
      title: session.topic || 'Sesión de mentoría',
      mentor: {
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Mentor',
        university: 'Universidad',
        profileImg: mentor.profile_img || null
      },
      category: getCategoryName(categoryId),
      career: career.name_career || 'Carrera',
      careerId: career.id_career,
      categoryId: categoryId,
      date: formatDate(session.schedule_date),
      time: formatTime(session.schedule_date, session.duration_minutes),
      price: parseFloat(session.price) || 0,
      participants: mentor.total_sessions || 0,
      rating: parseFloat(mentor.rating) || null,
      gradient: getCategoryGradient(categoryId),
      scheduleType: getScheduleType(session.schedule_date),
      meetingPlatform: session.meeting_platform,
      sessionNotes: session.session_notes,
      sessionStatus: session.session_status
    }
  })

  const filteredSessions = transformedSessions.filter(session => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      session.title.toLowerCase().includes(searchLower) ||
      session.category.toLowerCase().includes(searchLower) ||
      session.career.toLowerCase().includes(searchLower) ||
      session.mentor.name.toLowerCase().includes(searchLower) ||
      session.sessionNotes.toLowerCase().includes(searchLower)

    if (!matchesSearch) return false

    const matchesCareer = 
      filters.careers.length === 0 || 
      filters.careers.includes(session.careerId)

    const matchesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(session.categoryId)

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

    const matchesSchedule = 
      filters.schedule.length === 0 || 
      filters.schedule.includes(session.scheduleType)

    return matchesCareer && matchesCategory && matchesPrice && matchesSchedule
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#378BA4] mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando sesiones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden">
      {/* Orbes de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#378BA4] rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Header */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>

      <main className="flex-grow relative z-10">
        {/* Hero Section - Mismo padding que el hero original */}
        <section className="py-24 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Hero Title */}
            <div className="mb-16 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight" style={{
                textShadow: '0 0 40px rgba(55, 139, 164, 0.6)'
              }}>
                Descubre sesiones
                <span className="block mt-3 bg-gradient-to-r from-[#378BA4] via-[#51cf66] to-[#378BA4] bg-clip-text text-transparent animate-gradient-x" style={{
                  backgroundSize: '200% auto'
                }}>
                  perfectas para ti
                </span>
              </h1>
              <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-light">
                Conecta con mentores expertos y encuentra la mentoría ideal para tu crecimiento
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-12 max-w-4xl mx-auto">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            {error && (
              <div className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-2xl text-white backdrop-blur-xl max-w-4xl mx-auto">
                <p className="font-semibold">{error}</p>
                <button 
                  onClick={loadInitialData}
                  className="mt-3 underline hover:text-red-200 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Filters and Results */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-8">
                  <FilterPanel 
                    filters={filters}
                    setFilters={setFilters}
                    isOpen={filterOpen}
                    setIsOpen={setFilterOpen}
                    careers={careers}
                    categories={categories}
                  />
                </div>
              </aside>

              {/* Results */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-white/90 font-semibold text-lg">
                    {filteredSessions.length} {filteredSessions.length === 1 ? 'sesión encontrada' : 'sesiones encontradas'}
                  </p>
                  <select className="px-5 py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#378BA4] bg-white/10 backdrop-blur-xl text-white font-medium hover:border-[#378BA4]/50 transition-all cursor-pointer">
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
                  <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-16 text-center">
                    <div className="text-7xl mb-6 opacity-50">🔍</div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      No se encontraron sesiones
                    </h3>
                    <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                      {sessions.length === 0 
                        ? 'Aún no hay sesiones programadas. ¡Vuelve pronto!' 
                        : 'Intenta ajustar los filtros o la búsqueda'}
                    </p>
                    {sessions.length > 0 && (
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setFilters({ careers: [], categories: [], priceRange: [], schedule: [] })
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#378BA4]/50 transition-all duration-300 hover:scale-105"
                      >
                        Limpiar todos los filtros
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-20px); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Discover