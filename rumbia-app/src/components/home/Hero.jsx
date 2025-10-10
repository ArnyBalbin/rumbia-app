import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'

const Hero = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleReserve = () => {
    if (isAuthenticated) {
      document.querySelector('#booking-section')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/login')
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Orientación vocacional por{' '}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              videollamada
            </span>
          </h1>
          
          <p className="text-lg text-muted leading-relaxed">
            Estudiantes de educación superior guían a adolescentes y jóvenes (12–27 años) de Perú e internacional.
            Aclara tus dudas y elige con seguridad tu camino.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={handleReserve}>
              Reservar sesión
            </Button>
            <Button 
              variant="ghost"
              onClick={() => document.querySelector('#valor')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver mapa de valor
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {['Perú', 'Freemium', 'Síncrono', 'Accesible'].map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 bg-light bg-opacity-20 text-primary rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="bg-white rounded-custom shadow-custom overflow-hidden">
            {/* Video topbar */}
            <div className="bg-gradient-to-r from-primary to-secondary p-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* Video body */}
            <div className="p-6 space-y-4">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/video-thumbnail.jpg"
                >
                  <source src="/videos/Wong-Carry.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>

              <div className="space-y-2">
                <div className="bg-cream p-3 rounded-lg text-primary font-medium">
                  💡 Consejos reales
                </div>
                <div className="bg-cream p-3 rounded-lg text-primary font-medium">
                  🎯 Experiencia cercana
                </div>
                <div className="bg-cream p-3 rounded-lg text-primary font-medium">
                  ✅ Decide con seguridad
                </div>
              </div>
            </div>
            {/* Toolbar */}
            <div className="bg-gray-100 p-4 flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full bg-white hover:bg-gray-200 transition-colors flex items-center justify-center text-xl">
                🔇
              </button>
              <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center text-white text-xl">
                ⏹
              </button>
              <button className="w-12 h-12 rounded-full bg-white hover:bg-gray-200 transition-colors flex items-center justify-center text-xl">
                🖥️
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero