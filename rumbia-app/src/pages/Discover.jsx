import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BASE_URL } from '../../config/api'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SearchBar from '../components/discover/SearchBar'
import FilterPanel from '../components/discover/FilterPanel'
import SessionGrid from '../components/discover/SessionGrid'
import WhatsAppButton from '../components/common/WhatsAppButton'

const Discover = () => {
  const { isAuthenticated, getSessions, getCareers, getCategories } = useAuth()
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    careers: [], categories: [], priceRange: [], schedule: []
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
        setSessions(sessionsResult.data || [])
      } else {
        setSessions([])
      }

      if (careersResult.success) setCareers(careersResult.data || [])
      if (categoriesResult.success) setCategories(categoriesResult.data || [])

    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('No se pudieron cargar los datos.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-PE', { 
      day: '2-digit', month: '2-digit', year: 'numeric' 
    })
  }

  const formatTime = (dateString, durationMinutes) => {
    if (!dateString) return ''
    const startDate = new Date(dateString)
    const endDate = new Date(startDate.getTime() + (durationMinutes || 60) * 60000)
    
    const fmt = (d) => d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })
    return `${fmt(startDate)} - ${fmt(endDate)}`
  }

  const getScheduleType = (dateString) => {
    if (!dateString) return 'afternoon'
    const date = new Date(dateString)
    const hour = date.getHours()
    const day = date.getDay()
    
    if (day === 0 || day === 6) return 'weekend'
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    return 'evening'
  }

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id_category === id)
    return cat?.category_name || 'General'
  }

  const getCategoryGradient = (id) => {
    const gradients = {
        1: 'linear-gradient(90deg, #FF512F 0%, #DD2476 100%)',
        2: 'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
        3: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
        default: 'linear-gradient(90deg, #378BA4 0%, #036280 100%)'
    }
    return gradients[id] || gradients.default
  }

  const transformedSessions = sessions.map(session => {
    const mentorData = session.mentor || {}
    const userData = mentorData.user || {}
    const careerData = mentorData.career || {}
    
    let profileImageUrl = null;
    if (mentorData.profile_img) {
        if (mentorData.profile_img.startsWith('http')) {
            profileImageUrl = mentorData.profile_img;
        } else {
            profileImageUrl = `${BASE_URL}${mentorData.profile_img}`;
        }
    }

    return {
      id: session.id_session,
      sessionCode: session.uuid,
      title: session.topic || 'Sesión de Orientación',
      
      mentor: {
        name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Mentor Rumbia',
        career: careerData.name_career || mentorData.alt_career || 'Profesional', 
        profileImg: profileImageUrl,
      },
      
      category: getCategoryName(careerData.category),
      career: careerData.name_career || 'General',
      careerId: careerData.id_career,
      categoryId: careerData.category,
      
      date: formatDate(session.schedule_date),
      time: formatTime(session.schedule_date, session.duration_minutes),
      scheduleType: getScheduleType(session.schedule_date),
      
      price: parseFloat(session.price) || 0,
      participants: mentorData.total_sessions || 0,
      rating: parseFloat(mentorData.rating) || 0,
      gradient: getCategoryGradient(careerData.category)
    }
  })

  const filteredSessions = transformedSessions.filter(session => {
    const search = searchQuery.toLowerCase()
    const matchesSearch = 
      session.title.toLowerCase().includes(search) ||
      session.category.toLowerCase().includes(search) ||
      session.career.toLowerCase().includes(search) ||
      session.mentor.name.toLowerCase().includes(search)

    if (!matchesSearch) return false

    const matchesCareer = filters.careers.length === 0 || filters.careers.includes(session.careerId)
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(session.categoryId)
    const matchesSchedule = filters.schedule.length === 0 || filters.schedule.includes(session.scheduleType)
    
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

    return matchesCareer && matchesCategory && matchesPrice && matchesSchedule
  })

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilters({ careers: [], categories: [], priceRange: [], schedule: [] })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#012E4A] relative overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#036280]/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#378BA4]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-50">
        <Header />
      </div>

      <main className="flex-grow relative z-10">

        <section className="py-20 px-4 lg:px-24"> 
          <div className="container mx-auto">

            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#378BA4] to-[#00d2ff]">Mentor Ideal</span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl font-light">
                Explora sesiones personalizadas y conecta con estudiantes y profesionales que resolverán tus dudas vocacionales.
              </p>
            </div>

            <div className="mb-10 max-w-3xl">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-white text-sm backdrop-blur-sm">
                ⚠️ {error} <button onClick={loadInitialData} className="underline ml-2 hover:text-white font-bold">Reintentar</button>
              </div>
            )}

            <div className="grid lg:grid-cols-4 gap-8 items-start">

              <aside className="lg:col-span-1 lg:sticky lg:top-24 z-20">
                <FilterPanel 
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={filterOpen}
                  setIsOpen={setFilterOpen}
                  careers={careers}
                  categories={categories}
                />
              </aside>

              <div className="lg:col-span-3">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-4">
                  <p className="text-white font-medium pl-1">
                    Mostrando <span className="text-[#378BA4] font-bold">{filteredSessions.length}</span> sesiones disponibles
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-sm">Ordenar por:</span>
                    <select className="bg-[#023e61] text-white text-sm border border-white/20 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#378BA4]">
                      <option>Más recientes</option>
                      <option>Precio: Menor a Mayor</option>
                      <option>Mejor Valoradas</option>
                    </select>
                  </div>
                </div>

                <SessionGrid 
                    sessions={filteredSessions} 
                    loading={loading}
                    hasFilters={filteredSessions.length < sessions.length}
                    onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-20 mt-auto border-t border-white/5 bg-[#012E4A]">
        <Footer />
      </div>

      <WhatsAppButton phoneNumber="+51986107594" />
    </div>
  )
}

export default Discover