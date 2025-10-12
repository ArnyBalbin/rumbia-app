import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle } from 'lucide-react'
import Button from '../common/Button'
import { useAuth } from '../../../context/AuthContext'

const ScheduleForm = ({ sessionId, sessionPrice, isFirstTime }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: '',
    notes: '',
    paymentProof: null,
    transactionId: ''
  })
  const [preview, setPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          paymentProof: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Guardar inscripción
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]')
    const newRegistration = {
      id: Date.now().toString(),
      userId: user?.id,
      sessionId,
      ...formData,
      status: isFirstTime ? 'confirmed' : 'pending',
      registeredAt: new Date().toISOString()
    }
    registrations.push(newRegistration)
    localStorage.setItem('registrations', JSON.stringify(registrations))

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">
          {isFirstTime ? '¡Inscripción confirmada!' : '¡Solicitud enviada!'}
        </h3>
        <p className="text-muted mb-6">
          {isFirstTime 
            ? 'Tu primera sesión es gratuita. Te enviaremos el enlace de la reunión por correo.'
            : 'Verificaremos tu pago y te confirmaremos la inscripción pronto.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/home')}>
            Volver al inicio
          </Button>
          <Button variant="ghost" onClick={() => navigate('/discover')}>
            Ver más sesiones
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info personal */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textDark mb-2">
          Teléfono / WhatsApp
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+51 999 999 999"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textDark mb-2">
          Notas o preguntas para el mentor (opcional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="¿Tienes alguna pregunta específica o algo que quieras que el mentor sepa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Sección de pago */}
      {!isFirstTime && sessionPrice > 0 && (
        <div className="border-t border-cream pt-6">
          <h3 className="text-xl font-bold text-primary mb-4">
            Información de pago
          </h3>

          <div className="bg-cream p-6 rounded-custom mb-6">
            <h4 className="font-semibold text-textDark mb-3">Datos para transferencia:</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Banco:</strong> BCP</p>
              <p><strong>Cuenta corriente:</strong> 191-2345678-0-90</p>
              <p><strong>CCI:</strong> 002-191-002345678090-12</p>
              <p><strong>Titular:</strong> RUMBIA EDUCACIÓN SAC</p>
              <p className="text-accent font-semibold mt-3">
                Monto a pagar: S/ {sessionPrice}.00
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-textDark mb-2">
              ID de transacción u operación
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              placeholder="Ej: 123456789"
              required={!isFirstTime}
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Captura de pago *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-custom p-8 text-center hover:border-accent transition-colors">
              {preview ? (
                <div className="space-y-4">
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                    <Upload size={20} />
                    Cambiar captura
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-muted mb-4" />
                  <p className="text-muted mb-2">
                    Sube la captura de tu pago
                  </p>
                  <p className="text-sm text-muted">
                    Formatos: JPG, PNG (max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    required={!isFirstTime}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      )}

      {isFirstTime && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-custom">
          <p className="text-green-800 font-medium">
            🎉 ¡Tu primera sesión es totalmente gratuita! No necesitas realizar ningún pago.
          </p>
        </div>
      )}

      <Button type="submit" className="w-full">
        {isFirstTime ? 'Confirmar inscripción' : 'Enviar solicitud'}
      </Button>

      <p className="text-xs text-muted text-center">
        Al inscribirte, aceptas nuestros términos y condiciones de servicio.
      </p>
    </form>
  )
}

export default ScheduleForm