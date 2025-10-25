import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Home, Compass, Sparkles, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl' 
          : 'bg-white/5 backdrop-blur-xl border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo con efecto 3D mejorado */}
          <Link
            to={isAuthenticated ? '/home' : '/'}
            className="group flex items-center gap-3 relative"
          >
            {/* Glow effect suave */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
            
            <div className="relative flex items-center gap-3">
              {/* Logo icon flotante sin cuadrado */}
              <div className="relative transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                {/* Sombra/glow del emoji */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full blur-lg opacity-30 scale-150"></div>
                {/* Emoji flotante */}
                <span className="relative text-4xl drop-shadow-2xl filter brightness-110">🎓</span>
              </div>
              
              {/* Logo text con efecto brillante */}
              <div className="relative">
                <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-white via-[#378BA4] to-white bg-clip-text text-transparent drop-shadow-lg">
                  RUMBIA
                </span>
                {/* Línea decorativa debajo */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#378BA4] to-[#036280] group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Nav Links */}
                {[
                  { label: 'Inicio', icon: Home, href: '/' },
                  { label: 'Descubrir', icon: Compass, href: '/discover' }
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="group relative px-5 py-2.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {item.label}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                ))}
                
                {/* User Menu */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-[#378BA4]/50 transition-all duration-300"
                  >
                    {/* Avatar con gradiente */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full blur-sm opacity-50"></div>
                      <div className="relative w-9 h-9 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <span className="font-semibold text-white text-sm max-w-[100px] truncate">
                      {user?.username}
                    </span>
                    
                    <ChevronDown 
                      className={`w-4 h-4 text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      {/* Backdrop para cerrar */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      ></div>
                      
                      <div className="absolute right-0 mt-3 w-56 z-50 animate-slideDown">
                        <div className="relative">
                          {/* Glow effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-2xl blur-lg opacity-30"></div>
                          
                          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                            <div className="p-2">
                              <Link
                                to="/profile"
                                onClick={() => setUserMenuOpen(false)}
                                className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                              >
                                <div className="w-8 h-8 bg-gradient-to-br from-[#378BA4]/30 to-[#036280]/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white font-semibold text-sm">Mi perfil</span>
                              </Link>
                              
                              <div className="my-2 h-px bg-white/20"></div>
                              
                              <button
                                onClick={() => {
                                  handleLogout();
                                  setUserMenuOpen(false);
                                }}
                                className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-300"
                              >
                                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <LogOut className="w-4 h-4 text-red-400" />
                                </div>
                                <span className="text-red-400 font-semibold text-sm">Cerrar sesión</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Public Nav Links */}
                {[
                  { label: 'Contacto', href: '#contacto' },
                  { label: 'Beneficios', href: '#beneficios' },
                  { label: 'Mapa de valor', href: '#lineadetiempo' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative px-5 py-2.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    {item.label}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}
                
                {/* Login Button */}
                <Link to="/login">
                  <button
                    className="group relative px-6 py-3 ml-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg shadow-[#378BA4]/30 hover:shadow-[#378BA4]/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Inicia Sesión
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-11 h-11 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-4 animate-slideDown">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-2xl blur-lg opacity-20"></div>
              
              <nav className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    {[
                      { label: 'Inicio', icon: Home, href: '/' },
                      { label: 'Descubrir', icon: Compass, href: '/discover' },
                      { label: 'Mi perfil', icon: User, href: '/profile' }
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white font-semibold"
                      >
                        <div className="w-9 h-9 bg-gradient-to-br from-[#378BA4]/30 to-[#036280]/30 rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5" />
                        </div>
                        {item.label}
                      </Link>
                    ))}
                    
                    <div className="my-2 h-px bg-white/20"></div>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-300 text-red-400 font-semibold"
                    >
                      <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <LogOut className="w-5 h-5" />
                      </div>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    {[
                      { label: 'Contacto', href: '#contacto' },
                      { label: 'Beneficios', href: '#beneficios' },
                      { label: 'Mapa de valor', href: '#valor' },
                      { label: 'Comunidad', href: '#comunidad' }
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white font-semibold"
                      >
                        {item.label}
                      </a>
                    ))}
                    
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Inicia Sesión
                      </button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;