import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { ENDPOINTS } from '../../../config/api'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Importante para las cookies
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || data.message || 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.')
        return
      }

      // Backend devuelve cookies, no token en el body
      login({ email: formData.email })
      navigate('/home')
    } catch (err) {
      setError('Error al conectar con el servidor. Intenta nuevamente.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card shadow-none">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Bienvenido de vuelta</h2>
          <p className="text-muted">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-accent hover:text-secondary">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-accent hover:text-secondary font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm