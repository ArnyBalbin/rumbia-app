import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BASE_URL } from '../../config/api'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import Header from '../components/common/Header'

const SessionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getSessionInfo, user, inscribeLearner } = useAuth()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await getSessionInfo(id)
        if (result.success) {
          setSession(result.data)
        } else {
          setError('No pudimos encontrar la sesión.')
        }
      } catch (err) {
        setError('Error de conexión.')
      } finally {
        setLoading(false)
      }
    }
    fetchSession()
  }, [id, getSessionInfo])

  const handleEnroll = async () => {
    if (!user) return navigate('/login')
    
    setEnrolling(true)
    const result = await inscribeLearner(session.uuid)
    if (result.success) {
      alert('¡Inscripción exitosa!')
      navigate('/dashboard')
    } else {
      alert(result.error || 'Error al inscribirse')
    }
    setEnrolling(false)
  }

  const getImageUrl = (path) => path ? (path.startsWith('http') ? path : `${BASE_URL}${path}`) : null
  
  if (loading) return <div className="min-h-screen bg-[#012E4A] flex items-center justify-center text-white">Cargando detalles...</div>
  if (error) return <div className="min-h-screen bg-[#012E4A] flex items-center justify-center text-white">{error}</div>
  if (!session) return null

  const { mentor, topic, description, schedule_date, duration_minutes, price, meeting_platform } = session
  const mentorName = `${mentor.user.first_name} ${mentor.user.last_name}`

  return (
    <div className="min-h-screen bg-[#012E4A]">
      <Header />
      
      <main className="py-20 px-4 lg:px-24">
        <div className="container mx-auto max-w-5xl">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#378BA4]/20 text-[#378BA4] text-sm font-bold mb-4 border border-[#378BA4]/30">
                  {mentor.career?.name_career || 'Mentoría'}
                </span>
                <h1 className="text-4xl font-bold text-white mb-4">{topic}</h1>
                <div className="flex items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span>Por {mentorName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                        <span>★</span>
                        <span>{mentor.rating}</span>
                    </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Sobre el Mentor</h3>
                <div className="flex gap-4">
                    <img 
                        src={getImageUrl(mentor.profile_img)} 
                        alt={mentorName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#378BA4]"
                    />
                    <div>
                        <p className="text-white/80 leading-relaxed">
                            {mentor.description || "Sin descripción disponible."}
                        </p>
                    </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Detalles de la sesión</h3>
                <p className="text-white/80">{session.session_notes}</p>
              </div>

            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                
                <div className="mb-6">
                    <p className="text-white/60 text-sm font-medium uppercase">Precio Total</p>
                    <p className="text-4xl font-black text-white">
                        {parseFloat(price) === 0 ? 'Gratis' : `S/${parseFloat(price).toFixed(2)}`}
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-white/90">
                        <Calendar className="text-[#378BA4]" />
                        <span>{new Date(schedule_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                        <Clock className="text-[#378BA4]" />
                        <span>{duration_minutes} min de duración</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                        <MapPin className="text-[#378BA4]" />
                        <span>Vía {meeting_platform}</span>
                    </div>
                </div>

                <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/40 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {enrolling ? 'Procesando...' : 'Reservar Lugar Ahora'}
                </button>
                
                <p className="text-center text-white/40 text-xs mt-4">
                    Garantía de satisfacción Rumbia
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default SessionDetail