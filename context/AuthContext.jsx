import { createContext, useContext, useState, useEffect } from 'react'
import { ENDPOINTS } from '../config/api.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay usuario guardado al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // 🔹 Login con API
  const login = async (credentials) => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // para manejar cookies
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Error en login')
      }

      setUser(data)
      localStorage.setItem('currentUser', JSON.stringify(data))
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // 🔹 Register con API
  const register = async (userData) => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Error en registro')
      }

      // Guardar el usuario en contexto
      setUser(data)
      localStorage.setItem('currentUser', JSON.stringify(data))
      return data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
