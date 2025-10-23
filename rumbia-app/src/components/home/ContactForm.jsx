import { useState, useEffect } from 'react'
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react'

const ContactForm = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    const phoneRegex = /^[+]?[\d\s()-]{9,}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setShowModal(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: ''
    })
    setErrors({})
    setShowModal(false)
  }

  return (
    <>
      <section id="contacto" className="relative py-20 bg-[#012E4A] overflow-hidden">
        {/* Fondo con malla 3D animada */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #036280 1px, transparent 1px),
              linear-gradient(to bottom, #036280 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.1s ease-out'
          }}></div>
        </div>

        {/* Orbes flotantes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20" style={{
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <div className={`container mx-auto px-4 max-w-6xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge animado */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#036280]/30 to-[#378BA4]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg shadow-[#378BA4]/20 mb-6">
              <span className="text-2xl">📧</span>
              <span className="text-sm font-bold text-white tracking-wide">Estamos aquí para ti</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black mb-4 text-white" style={{
              textShadow: '0 0 30px rgba(55, 139, 164, 0.5)'
            }}>
              Contáctanos
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o necesitas más información? Estamos aquí para ayudarte. 
              Envíanos un mensaje y te responderemos a la brevedad.
            </p>
          </div>

          {/* Formulario con efecto 3D */}
          <div className="relative max-w-4xl mx-auto">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-20"></div>
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20"
              style={{
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre completo */}
                <div className="group">
                  <label htmlFor="fullName" className="block text-sm font-bold mb-2 text-white">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-[#378BA4]" />
                      Nombre completo *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez García"
                      className={`w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all text-white placeholder-gray-400 ${
                        errors.fullName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#378BA4] group-hover:border-white/30'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        ⚠️ {errors.fullName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email y Teléfono */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-white">
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-[#378BA4]" />
                        Email *
                      </div>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com"
                      className={`w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all text-white placeholder-gray-400 ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#378BA4] group-hover:border-white/30'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        ⚠️ {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-bold mb-2 text-white">
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-[#378BA4]" />
                        Teléfono *
                      </div>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className={`w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all text-white placeholder-gray-400 ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#378BA4] group-hover:border-white/30'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        ⚠️ {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-white">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={18} className="text-[#378BA4]" />
                      Mensaje *
                    </div>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows="6"
                    className={`w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 rounded-2xl focus:outline-none transition-all resize-none text-white placeholder-gray-400 ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-white/20 focus:border-[#378BA4] group-hover:border-white/30'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      ⚠️ {errors.message}
                    </p>
                  )}
                </div>

                {/* Botón de envío con efectos 3D */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-5 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-2xl font-black text-white text-lg transition-all transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 overflow-hidden"
                  style={{
                    boxShadow: '0 20px 60px -15px rgba(55, 139, 164, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar mensaje
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                      </>
                    )}
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Modal de éxito con efectos 3D */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="relative max-w-md w-full">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 transform transition-all"
              style={{
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
              }}
            >
              <div className="text-center">
                {/* Icono con efecto */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#378BA4] to-[#036280] flex items-center justify-center shadow-2xl">
                    <CheckCircle className="text-white w-12 h-12" strokeWidth={3} />
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-4 text-[#012E4A]">
                  ¡Mensaje enviado exitosamente!
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Hemos recibido tu mensaje. Nuestro equipo te responderá a la brevedad posible.
                </p>
                <button
                  onClick={resetForm}
                  className="group relative w-full py-4 bg-gradient-to-r from-[#036280] to-[#378BA4] rounded-2xl font-bold text-white transition-all transform hover:scale-105 overflow-hidden shadow-xl"
                >
                  <span className="relative z-10">Aceptar</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

export default ContactForm