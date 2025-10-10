import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ScheduleForm from '../components/schedule/ScheduleForm'
import { Calendar, Clock, Users, DollarSign, User } from 'lucide-react'

const Schedule = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Verificar si es la primera vez del usuario
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]')
    const userRegistrations = registrations.filter(r => r.userId === user?.id)
    setIsFirstTime(userRegistrations.length === 0)
  }, [isAuthenticated, user, navigate])

  // Datos de la sesión (simulados)
  const session = {
    id: parseInt(id),
    title: 'Explora Ingeniería de Sistemas',
    mentor: {
      name: 'Rubén Torres',
      university: 'UNMSM',
      career: 'Ingeniería de Sistemas',
      semester: '8° Semestre'
    },
    category: 'Ingeniería',
    date: '12/10/2025',
    time: '18:00 - 19:00',
    duration: '1 hora',
    price: 20,
    participants: 15,
    maxParticipants: 25,
    description: 'En esta sesión conocerás las herramientas más usadas en la carrera, los cursos clave que debes dominar, y lo que realmente nadie te cuenta sobre ser estudiante de Ingeniería de Sistemas.',
    topics: [
      'Perfil del estudiante de sistemas',
      'Cursos fundamentales y electivos',
      'Herramientas y tecnologías',
      'Oportunidades laborales',
      'Vida universitaria y consejos'
    ],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-accent hover:text-secondary mb-6 flex items-center gap-2"
          >
            ← Volver
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Información de la sesión */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <div 
                  className="h-48 rounded-t-custom -mt-6 -mx-6 mb-6 flex items-center justify-center text-white font-bold text-2xl"
                  style={{ background: session.gradient }}
                >
                  {session.category}
                </div>

                <h1 className="text-3xl font-bold text-primary mb-4">
                  {session.title}
                </h1>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-accent" size={20} />
                    <div>
                      <p className="text-sm text-muted">Fecha</p>
                      <p className="font-medium text-textDark">{session.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-accent" size={20} />
                    <div>
                      <p className="text-sm text-muted">Horario</p>
                      <p className="font-medium text-textDark">{session.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-accent" size={20} />
                    <div>
                      <p className="text-sm text-muted">Participantes</p>
                      <p className="font-medium text-textDark">
                        {session.participants} / {session.maxParticipants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-accent" size={20} />
                    <div>
                      <p className="text-sm text-muted">Precio</p>
                      <p className="font-medium text-textDark">
                        {isFirstTime ? (
                          <span className="text-green-600">¡Gratis! (1ra vez)</span>
                        ) : (
                          `S/ ${session.price}.00`
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-cream pt-6">
                  <h3 className="font-bold text-lg text-textDark mb-3">
                    Sobre la sesión
                  </h3>
                  <p className="text-muted mb-4">{session.description}</p>

                  <h4 className="font-semibold text-textDark mb-2">
                    Temas a tratar:
                  </h4>
                  <ul className="space-y-2">
                    {session.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted">
                        <span className="text-accent mt-1">✓</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-cream pt-6 mt-6">
                  <h3 className="font-bold text-lg text-textDark mb-4">
                    Tu mentor
                  </h3>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                      style={{ background: session.gradient }}
                    >
                      {session.mentor.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-textDark">{session.mentor.name}</h4>
                      <p className="text-sm text-muted">{session.mentor.career}</p>
                      <p className="text-sm text-muted">{session.mentor.university} · {session.mentor.semester}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de inscripción */}
            <div className="lg:col-span-1">
              <div className="card lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Inscríbete
                </h2>
                <ScheduleForm 
                  sessionId={session.id}
                  sessionPrice={session.price}
                  isFirstTime={isFirstTime}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Schedule