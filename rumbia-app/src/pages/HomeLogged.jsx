import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SearchBar from '../components/discover/SearchBar'
import SessionCard from '../components/discover/SessionCard'
import { Calendar, Clock, Video, TrendingUp } from 'lucide-react'

const HomeLogged = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Sesiones agendadas (simuladas)
  const scheduledSessions = [
    {
      id: 1,
      title: 'Orientación: Ingeniería de Sistemas',
      mentor: 'Rubén Torres',
      date: '15/10/2025',
      time: '16:00 - 17:00',
      status: 'upcoming',
      meetingUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      title: 'Vida universitaria en PUCP',
      mentor: 'María Gonzales',
      date: '18/10/2025',
      time: '19:00 - 20:00',
      status: 'upcoming',
      meetingUrl: 'https://meet.google.com/xyz-uvwx-rst'
    }
  ]

  // Sesiones recomendadas basadas en intereses del usuario
  const recommendedSessions = [
    {
      id: 3,
      title: 'Explora Ingeniería de Sistemas',
      mentor: {
        name: 'Rubén Torres',
        university: 'UNMSM'
      },
      category: 'Ingeniería',
      date: '12/10/2025',
      time: '18:00 - 19:00',
      price: 20,
      participants: 15,
      rating: 4.8,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 4,
      title: 'Emprendimiento digital',
      mentor: {
        name: 'María Gonzales',
        university: 'PUCP'
      },
      category: 'Negocios',
      date: '20/10/2025',
      time: '17:00 - 18:30',
      price: 20,
      participants: 20,
      rating: 4.9,
      gradient: 'linear-gradient(135deg, #ffd93d 0%, #ff9800 100%)'
    },
    {
      id: 5,
      title: 'Innovación en salud pública',
      mentor: {
        name: 'Carlos Medina',
        university: 'Cayetano Heredia'
      },
      category: 'Salud',
      date: '15/10/2025',
      time: '15:00 - 16:00',
      price: 15,
      participants: 12,
      rating: 4.7,
      gradient: 'linear-gradient(135deg, #51cf66 0%, #20c997 100%)'
    },
    {
      id: 6,
      title: 'Arquitectura sostenible',
      mentor: {
        name: 'Andrea Quispe',
        university: 'UNI'
      },
      category: 'Diseño',
      date: '14/10/2025',
      time: '16:00 - 17:30',
      price: 15,
      participants: 10,
      rating: 4.6,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ]

  const filteredSessions = recommendedSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              ¡Hola, {user?.username}! 👋
            </h1>
            <p className="text-cream text-lg">
              Bienvenido a tu espacio de orientación vocacional
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="container mx-auto px-4 -mt-8">
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="card bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent bg-opacity-20 rounded-full flex items-center justify-center">
                  <Calendar className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{scheduledSessions.length}</p>
                  <p className="text-sm text-muted">Sesiones agendadas</p>
                </div>
              </div>
            </div>

            <div className="card bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center">
                  <Clock className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">8</p>
                  <p className="text-sm text-muted">Horas completadas</p>
                </div>
              </div>
            </div>

            <div className="card bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                  <Video className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-sm text-muted">Mentores conocidos</p>
                </div>
              </div>
            </div>

            <div className="card bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-light bg-opacity-40 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">92%</p>
                  <p className="text-sm text-muted">Satisfacción</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sesiones Agendadas */}
        {scheduledSessions.length > 0 && (
          <section className="container mx-auto px-4 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                Tus próximas sesiones
              </h2>
              <button 
                onClick={() => navigate('/discover')}
                className="text-accent hover:text-secondary font-medium"
              >
                Ver todas →
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scheduledSessions.map(session => (
                <div key={session.id} className="card hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-textDark mb-1">
                        {session.title}
                      </h3>
                      <p className="text-muted text-sm">con {session.mentor}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Confirmada
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted text-sm">
                      <Calendar size={16} />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted text-sm">
                      <Clock size={16} />
                      <span>{session.time}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/session/${session.id}`)}
                    className="w-full bg-primary text-white py-3 rounded-custom font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                  >
                    <Video size={20} />
                    Unirse a la sesión
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Búsqueda y Sesiones Recomendadas */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
            Sesiones recomendadas para ti
          </h2>

          <div className="mb-8">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por carrera, mentor o tema..."
            />
          </div>

          {filteredSessions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted text-lg mb-4">
                No se encontraron sesiones con "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-accent hover:text-secondary font-medium"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/discover')}
              className="btn-ghost"
            >
              Ver todas las sesiones disponibles
            </button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-cream py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              ¿Tienes una duda específica?
            </h2>
            <p className="text-muted text-lg mb-6 max-w-2xl mx-auto">
              Explora todas las sesiones disponibles o contacta directamente con un mentor
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/discover')}
                className="btn-primary"
              >
                Explorar sesiones
              </button>
              <button
                onClick={() => navigate('/discover')}
                className="btn-ghost"
              >
                Buscar mentores
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomeLogged