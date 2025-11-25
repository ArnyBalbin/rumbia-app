import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'
import SessionHeader from '../components/session/SessionHeader'
import MentorAbout from '../components/session/MentorAbout'
import SessionContent from '../components/session/SessionContent'
import BookingCard from '../components/session/BookingCard'

export default function Session() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getSessionInfo, user, inscribeLearner } = useAuth()

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrolling, setEnrolling] = useState(false)

  // 1. Cargar datos
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return
      try {
        setLoading(true)
        const result = await getSessionInfo(id)
        if (result.success) setSession(result.data)
        else setError('No pudimos encontrar la sesión o ha sido eliminada.')
      } catch (err) {
        console.error(err)
        setError('Error de conexión al cargar la sesión.')
      } finally {
        setLoading(false)
      }
    }
    fetchSession()
  }, [id, getSessionInfo])

  // 2. Manejar inscripción
  const handleEnroll = async () => {
    if (!user) return navigate('/login', { state: { from: `/session/${id}` } })
    if (!window.confirm('¿Confirmas tu inscripción a esta sesión?')) return

    try {
      setEnrolling(true)
      const result = await inscribeLearner(session.uuid)
      if (result.success) {
        alert('¡Te has inscrito exitosamente!')
        navigate('/profile')
      } else {
        alert(result.error || 'Hubo un problema al inscribirse.')
      }
    } catch (err) {
      alert('Error inesperado al procesar la inscripción.')
    } finally {
      setEnrolling(false)
    }
  }

  // --- Renderizados de carga y error ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#378BA4] mb-4"></div>
        <p className="text-white text-lg animate-pulse">Cargando...</p>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex flex-col">
        <div className="relative z-20">
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
            <Header />
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center px-4 text-center relative z-10">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md max-w-md">
            <h2 className="text-2xl font-bold text-white mb-2">Sesión no encontrada</h2>
            <button onClick={() => navigate('/discover')} className="mt-4 px-6 py-3 bg-[#378BA4] text-white rounded-xl font-bold">
              Volver a Explorar
            </button>
          </div>
        </div>
        <div className="relative z-20">
          <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
            <Footer />
          </div>
        </div>
      </div>
    )
  }

  const { mentor, topic, session_notes, schedule_date, duration_minutes, price, meeting_platform } = session
  const mentorCareer = mentor.career?.name_career

  return (
    // Estructura principal idéntica al Home: Flex col, min-h-screen, gradiente y overflow hidden
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden selection:bg-[#378BA4] selection:text-white">
      
      {/* Fondo Decorativo (Orbes similares al Home para consistencia visual) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        ></div>
      </div>

      {/* Header con Glassmorphism (Igual que Home) */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>
      
      {/* Main Content */}
      {/* flex-grow: empuja el footer hacia abajo */}
      {/* py-12 px-4 md:px-8 lg:px-12: Padding responsivo consistente */}
      <main className="flex-grow relative z-10 py-12 px-4 md:px-8 lg:px-12 xl:px-20">
        
        <div className="container mx-auto max-w-8xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
          {/* COLUMNA IZQUIERDA (8 columnas) */}
          <div className="lg:col-span-8 space-y-8">
            <SessionHeader 
              topic={topic}
              career={mentorCareer}
              mentor={mentor}
              onBack={() => navigate(-1)}
            />

            <MentorAbout 
              description={mentor.description}
              language={mentor.language}
            />

            <SessionContent 
              notes={session_notes}
            />
          </div>

          {/* COLUMNA DERECHA (4 columnas) */}
          <div className="lg:col-span-4 relative">
            {/* Sticky para que la tarjeta de pago te siga al hacer scroll si la desc es larga */}
            <div className="sticky top-8">
                <BookingCard 
                price={price}
                scheduleDate={schedule_date}
                duration={duration_minutes}
                platform={meeting_platform}
                onEnroll={handleEnroll}
                enrolling={enrolling}
                />
            </div>
          </div>

        </div>
      </main>

      {/* Footer con Glassmorphism (Igual que Home) */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <Footer />
        </div>
      </div>
      
      <WhatsAppButton phoneNumber="+51986107594" />

      {/* Animación para los orbes (si no está definida globalmente) */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>
    </div>
  )
}