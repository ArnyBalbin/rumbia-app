import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'
import { Eye, EyeOff, Mail, Lock, User, Calendar } from 'lucide-react'

const RegisterForm = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    role: 'student' // student o mentor
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    // Verificar edad (12-27 años)
    const birthDate = new Date(formData.birthdate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 12 || age > 27) {
      setError('Debes tener entre 12 y 27 años para registrarte')
      return
    }

    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Verificar si el email ya existe
    if (users.some(u => u.email === formData.email)) {
      setError('Este correo ya está registrado')
      return
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      birthdate: formData.birthdate,
      role: formData.role,
      createdAt: new Date().toISOString(),
      onboardingCompleted: false
    }

    // Guardar usuario
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Login automático
    login(newUser)
    
    // Redirigir a onboarding
    navigate('/onboarding')
  }

  return (
    <div className="w-full max-w-md">
      <div className="card">
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
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Nombre de usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="tunombre"
                required
                minLength={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Fecha de nacimiento
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <p className="text-xs text-muted mt-1">Debes tener entre 12 y 27 años</p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              ¿Cómo quieres usar Rumbía?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'student' })}
                className={`p-4 border-2 rounded-custom transition-all ${
                  formData.role === 'student'
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
                onClick={() => setFormData({ ...formData, role: 'mentor' })}
                className={`p-4 border-2 rounded-custom transition-all ${
                  formData.role === 'mentor'
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
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Crear cuenta
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