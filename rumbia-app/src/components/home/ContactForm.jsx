import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    const phoneRegex = /^[+]?[\d\s()-]{9,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simular envío de formulario
    setTimeout(() => {
      setShowModal(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setShowModal(false);
  };

  return (
    <>
      <section id="contacto" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#012E4A' }}>
              Contáctanos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o necesitas más información? Estamos aquí para ayudarte. 
              Envíanos un mensaje y te responderemos a la brevedad.
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre completo */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2" style={{ color: '#012E4A' }}>
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    Nombre completo *
                  </div>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez García"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.fullName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    ⚠️ {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email y Teléfono */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#012E4A' }}>
                    <div className="flex items-center gap-2">
                      <Mail size={18} />
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#012E4A' }}>
                    <div className="flex items-center gap-2">
                      <Phone size={18} />
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      ⚠️ {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#012E4A' }}>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} />
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    ⚠️ {errors.message}
                  </p>
                )}
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: isSubmitting ? '#378BA4' : '#012E4A',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-pulse">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                   style={{ backgroundColor: '#378BA4' }}>
                <CheckCircle className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#012E4A' }}>
                ¡Mensaje enviado exitosamente!
              </h3>
              <p className="text-gray-600 mb-8">
                Hemos recibido tu mensaje. Nuestro equipo te responderá a la brevedad posible.
              </p>
              <button
                onClick={resetForm}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#012E4A' }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;