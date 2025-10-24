import { createContext, useContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../config/api.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Cargar usuario guardado al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    const storedToken = localStorage.getItem('accessToken')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setAccessToken(storedToken)
    }
    setLoading(false)
  }, [])

  // 🔹 Login
  const login = async (credentials) => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.detail || data.message || 'Error en login')

      // Guardar tokens y usuario
      setAccessToken(data.access)
      localStorage.setItem('accessToken', data.access)

      // Obtener info del usuario autenticado
      const userInfoRes = await fetch(ENDPOINTS.GET_USER_INFO(data.user_id), {
        headers: { Authorization: `Bearer ${data.access}` }
      })
      const userInfo = await userInfoRes.json()

      setUser(userInfo)
      localStorage.setItem('currentUser', JSON.stringify(userInfo))
      return userInfo
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // 🔹 Registro
  const register = async (userData) => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.detail || data.message || 'Error en registro')

      // Después de registrarse, puedes iniciar sesión automáticamente
      return await login({
        email: userData.email,
        password: userData.password
      })
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  // 🔹 Refrescar token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(ENDPOINTS.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') })
      })
      const data = await response.json()
      if (!response.ok) throw new Error('No se pudo refrescar el token')
      localStorage.setItem('accessToken', data.access)
      setAccessToken(data.access)
      return data.access
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
    }
  }

  // 🔹 Logout
  const logout = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const value = {
    user,
    login,
    register,
    logout,
    refreshAccessToken,
    isAuthenticated: !!user,
    accessToken,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
