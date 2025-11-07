import { ArrowRight, ArrowLeft, Download, SkipForward, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import '../styles/scroll.css'

// 🧩 Importa tus componentes comunes
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'

const StepsForVocation = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [testStarted, setTestStarted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Ocultar scrollbars del body
    document.body.style.overflow = 'hidden'
    
    return () => {
      // Restaurar scroll al desmontar
      document.body.style.overflow = 'auto'
    }
  }, [])

  const steps = Array.from({ length: 19 }, (_, i) => ({
    number: i + 1,
    title: `Paso ${i + 1}`,
    image: `/images/step${i + 1}.jpg`,
    description: `Descubre más sobre ti en el paso ${i + 1}`
  }))

  const handleStartTest = () => {
    setTestStarted(true)
    window.open("https://ponteencarrera.minedu.gob.pe/pec-portal-web/", "_blank")
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      setImageLoaded(false)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setImageLoaded(false)
    }
  }

  const canAdvance = currentStep === 1 ? testStarted : true
  const currentStepData = steps[currentStep - 1]

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden">
      {/* 🔵 Orbes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        ></div>
      </div>

      {/* 🧭 Header con glassmorphism */}
      <div className="relative z-20 flex-shrink-0">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>

      {/* 🎯 Contenido principal con scroll interno */}
      <main className="flex-grow relative z-10 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">

            {/* Title Section */}
            <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#378BA4]" />
                <span className="text-[#378BA4] font-semibold uppercase tracking-wider text-sm">Tu Camino Vocacional</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Descubre tu Carrera Ideal
              </h2>
              <p className="text-gray-300 text-lg">
                Sigue este proceso de {steps.length} pasos para encontrar la carrera perfecta para ti
              </p>
            </div>

            {/* Contenido del Test */}
            <div className={`bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 md:p-12 shadow-2xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Step Counter */}
              <div className="text-center mb-6">
                <p className="text-[#378BA4] font-bold text-lg">
                  PASO {currentStep} de {steps.length}
                </p>
                <div className="w-full bg-[#036280]/30 rounded-full h-2 mt-3 overflow-hidden border border-[#378BA4]/20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#378BA4] to-[#036280] transition-all duration-500"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Image Carousel - Adaptive Container */}
              <div className="relative mb-8 flex justify-center">
                <div className="relative w-full max-w-4xl rounded-xl overflow-hidden border-2 border-[#378BA4]/30 bg-[#036280]/20 shadow-lg">
                  {/* Loading state */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#036280]/30 z-10">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 border-4 border-[#378BA4]/30 border-t-[#378BA4] rounded-full animate-spin"></div>
                        <p className="text-[#378BA4] text-sm font-semibold">Cargando imagen...</p>
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <img 
                    src={currentStepData.image} 
                    alt={currentStepData.title}
                    className={`w-full h-auto object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x600?text=${currentStepData.title}`
                      setImageLoaded(true)
                    }}
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 z-20 p-3 bg-[#378BA4] hover:bg-[#036280] disabled:bg-gray-600 disabled:opacity-50 text-white rounded-full transition-all shadow-lg hover:shadow-[#378BA4]/50 disabled:cursor-not-allowed hover:scale-110"
                  title="Paso anterior"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={!canAdvance || currentStep === steps.length}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 z-20 p-3 bg-[#378BA4] hover:bg-[#036280] disabled:bg-gray-600 disabled:opacity-50 text-white rounded-full transition-all shadow-lg hover:shadow-[#378BA4]/50 disabled:cursor-not-allowed hover:scale-110"
                  title={!canAdvance ? "Debes iniciar el test primero" : currentStep === steps.length ? "Último paso" : "Siguiente paso"}
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* Step Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h3>
                <p className="text-gray-300">{currentStepData.description}</p>
              </div>

              {/* Start Button */}
              {currentStep === 1 && !testStarted && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={handleStartTest}
                    className="px-10 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all transform hover:scale-105 flex items-center gap-3 group text-lg"
                  >
                    <Sparkles className="w-6 h-6" />
                    <span>¡Empieza aquí con el test!</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* Info Boxes */}
              {currentStep === 1 && !testStarted && (
                <div className="bg-[#378BA4]/20 border border-[#378BA4]/30 rounded-xl p-4 mb-8">
                  <p className="text-gray-300 text-center text-sm">
                    Debes comenzar el test para continuar con los siguientes pasos
                  </p>
                </div>
              )}
              {currentStep === 1 && testStarted && currentStep < steps.length && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8">
                  <p className="text-green-300 text-center text-sm font-semibold">
                    ✅ ¡Test iniciado! Ahora puedes avanzar a los siguientes pasos
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                  <a
                    href="/pdfs/guia-vocacional.pdf"
                    download
                    className="px-6 py-3 bg-[#036280]/50 border border-[#378BA4]/30 text-white font-semibold rounded-lg hover:bg-[#036280] transition-all flex items-center gap-2 group hover:scale-105"
                  >
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>DESCARGAR GUIA</span>
                  </a>

                  <a
                    href="/"
                    className="px-6 py-3 bg-transparent border border-[#378BA4]/30 text-gray-300 font-semibold rounded-lg hover:bg-[#036280]/30 hover:text-white transition-all flex items-center gap-2 group hover:scale-105"
                  >
                    <SkipForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Skip</span>
                  </a>
                </div>

                <div className="text-gray-400 text-sm text-center md:text-right">
                  <p>Paso {currentStep} de {steps.length}</p>
                  {!canAdvance && currentStep === 1 && (
                    <p className="text-[#378BA4] font-semibold mt-1">Comienza el test para continuar</p>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className={`mt-8 mb-8 grid grid-cols-3 gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-4 text-center">
                <p className="text-[#378BA4] font-bold text-2xl">{currentStep}</p>
                <p className="text-gray-400 text-sm">Paso Actual</p>
              </div>
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-4 text-center">
                <p className="text-[#378BA4] font-bold text-2xl">{Math.round((currentStep / steps.length) * 100)}%</p>
                <p className="text-gray-400 text-sm">Progreso</p>
              </div>
              <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-4 text-center">
                <p className="text-[#378BA4] font-bold text-2xl">{steps.length - currentStep}</p>
                <p className="text-gray-400 text-sm">Restantes</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🦶 Footer con glassmorphism */}
      <div className="relative z-20 flex-shrink-0">
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <Footer />
        </div>
      </div>

      {/* 💬 Botón de WhatsApp */}
      <WhatsAppButton phoneNumber="+51986107594" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        
        /* Ocultar scrollbar pero mantener funcionalidad */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE y Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari y Opera */
        }
      `}</style>
    </div>
  )
}

export default StepsForVocation