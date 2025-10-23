import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { ENDPOINTS } from '../../../config/api'

const RegisterForm = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipo: 'learner' // learner o mentor (como espera el backend)
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  if (formData.password !== formData.confirmPassword) {
    setError('Las contraseñas no coinciden')
    setLoading(false)
    return
  }

  if (formData.password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres')
    setLoading(false)
    return
  }

  try {
    await register({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      tipo: formData.tipo
    })
    navigate('/onboarding')
  } catch (err) {
    setError(err.message || 'Error al registrar. Intenta nuevamente.')
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="w-full max-w-md">
      <div className="card shadow-none">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Crea tu cuenta</h2>
          <p className="text-muted">Únete a la comunidad de Rumbía</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Nombre
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                minLength={2}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Apellido
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
                minLength={2}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tipo - Learner o Mentor */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              ¿Cómo quieres usar Rumbía?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'learner' })}
                disabled={loading}
                className={`p-4 border-2 rounded-custom transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.tipo === 'learner'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-gray-300 hover:border-accent'
                }`}
              >
                <div className="text-3xl mb-2">🎓</div>
                <div className="font-semibold text-textDark">Estudiante</div>
                <div className="text-xs text-muted">Busco orientación</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'mentor' })}
                disabled={loading}
                className={`p-4 border-2 rounded-custom transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.tipo === 'mentor'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-gray-300 hover:border-accent'
                }`}
              >
                <div className="text-3xl mb-2">👨‍🏫</div>
                <div className="font-semibold text-textDark">Mentor</div>
                <div className="text-xs text-muted">Quiero guiar</div>
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-accent hover:text-secondary font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm