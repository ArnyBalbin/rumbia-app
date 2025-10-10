import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { Menu, X, User, LogOut } from 'lucide-react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2">
            <span className="text-3xl">🎓</span>
            <span className="text-2xl font-bold text-primary">RUMBIA</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="text-muted hover:text-primary transition-colors">
                  Inicio
                </Link>
                <Link to="/discover" className="text-muted hover:text-primary transition-colors">
                  Descubrir
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-textDark">{user?.username}</span>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-custom shadow-custom py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-cream transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={18} />
                        <span>Mi perfil</span>
                      </Link>
                      <hr className="my-2 border-cream" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-cream transition-colors w-full text-left text-red-600"
                      >
                        <LogOut size={18} />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a href="#contacto" className="text-muted hover:text-primary transition-colors">
                  Contacto
                </a>
                <a href="#beneficios" className="text-muted hover:text-primary transition-colors">
                  Beneficios
                </a>
                <a href="#valor" className="text-muted hover:text-primary transition-colors">
                  Mapa de valor
                </a>
                <a href="#comunidad" className="text-muted hover:text-primary transition-colors">
                  Comunidad
                </a>
                <Link to="/login">
                  <button className="btn-primary">Inicia Sesión</button>
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/home" 
                  className="text-muted hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/discover" 
                  className="text-muted hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Descubrir
                </Link>
                <Link 
                  to="/profile" 
                  className="text-muted hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 hover:text-red-700 transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                  Contacto
                </a>
                <a href="#beneficios" onClick={() => setMobileMenuOpen(false)}>
                  Beneficios
                </a>
                <a href="#valor" onClick={() => setMobileMenuOpen(false)}>
                  Mapa de valor
                </a>
                <a href="#comunidad" onClick={() => setMobileMenuOpen(false)}>
                  Comunidad
                </a>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-primary w-full">Inicia Sesión</button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header