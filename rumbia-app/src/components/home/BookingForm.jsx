import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'
import Modal from '../common/Modal'
import { CAREERS } from '../../utils/constants'

const BookingForm = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    area: '',
    fecha: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setShowModal(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section id="booking-section" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Reserva tu sesión
              </h2>
              <p className="text-muted mb-8">
                Selecciona área de interés y un horario disponible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Área de interés
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona…</option>
                    {CAREERS.map((career) => (
                      <option key={career} value={career}>
                        {career}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Confirmar reserva
                </Button>
              </form>
            </div>

            {/* Calendar Visual */}
            <div className="hidden lg:block">
              <div className="w-full h-96 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-custom flex items-center justify-center">
                <span className="text-muted font-semibold text-lg">
                  Calendario de disponibilidad
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setFormData({ area: '', fecha: '', email: '' })
        }}
        title="¡Reserva recibida!"
      >
        <p className="text-muted mb-6">
          Te enviaremos un correo con la confirmación y el enlace de la videollamada.
        </p>
        <Button
          onClick={() => {
            setShowModal(false)
            setFormData({ area: '', fecha: '', email: '' })
          }}
          className="w-full"
        >
          Aceptar
        </Button>
      </Modal>
    </>
  )
}

export default BookingForm