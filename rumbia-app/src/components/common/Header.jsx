import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Compass,
  Sparkles,
  ChevronDown,
  Settings,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ENDPOINTS } from '../../../config/api';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch profile picture cuando el usuario esté autenticado
  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!isAuthenticated || !user?.user_code) return;

      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(ENDPOINTS.GET_USER_INFO(user.user_code), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setProfilePicture(userData.profile_picture);
        }
      } catch (error) {
        console.error('Error al obtener foto de perfil:', error);
      }
    };

    fetchProfilePicture();
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSectionNav = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Componente para el avatar del usuario
  const UserAvatar = ({ size = "default" }) => {
    const sizeClasses = {
      default: "w-9 h-9",
      large: "w-12 h-12"
    };

    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full blur-sm opacity-50"></div>
        <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-[#378BA4] to-[#036280] rounded-full flex items-center justify-center text-white font-bold shadow-lg overflow-hidden`}>
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={size === "large" ? "text-lg" : ""}>
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
          : "bg-white/5 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/discover" : "/"}
            className="flex items-center ml-0 lg:ml-8"
          >
            <img
              src="/assets/logorumbia.png"
              alt="Logo Rumbia"
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Nav Links */}
                {[
                  { label: "Inicio", icon: Home, href: "/" },
                  { label: "Descubrir", icon: Compass, href: "/discover" },
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
                    <UserAvatar />

                    <span className="font-semibold text-white text-sm max-w-[100px] truncate">
                      {user?.username}
                    </span>

                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      ></div>

                      <div className="absolute right-0 mt-3 w-56 z-50 animate-slideDown">
                        <div className="relative">
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
                                <span className="text-white font-semibold text-sm">
                                  Mi perfil
                                </span>
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
                                <span className="text-red-400 font-semibold text-sm">
                                  Cerrar sesión
                                </span>
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
                {[
                  { label: "Contacto", href: "#contacto" },
                  { label: "Beneficios", href: "#beneficios" },
                  { label: "Acerca de", href: "#lineadetiempo" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleSectionNav(e, item.href)}
                    className="group relative px-5 py-2.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    {item.label}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                ))}

                <Link to="/login">
                  <button className="group relative px-6 py-3 ml-2 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg shadow-[#378BA4]/30 hover:shadow-[#378BA4]/50 transition-all duration-300 transform hover:scale-105 overflow-hidden">
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
              <div className="absolute -inset-2 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-2xl blur-lg opacity-20"></div>

              <nav className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    {/* User info en mobile */}
                    <div className="px-4 py-3 mb-2 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/20">
                      <div className="flex items-center gap-3">
                        <UserAvatar size="large" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">
                            {user?.username}
                          </p>
                          <p className="text-white/60 text-xs">
                            {user?.email || 'usuario@rumbia.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {[
                      { label: "Inicio", icon: Home, href: "/" },
                      { label: "Descubrir", icon: Compass, href: "/discover" },
                      { label: "Mi perfil", icon: User, href: "/profile" },
                      { label: "Configuración", icon: Settings, href: "/settings" },
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

                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

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
                      { label: "Contacto", href: "#contacto" },
                      { label: "Beneficios", href: "#beneficios" },
                      { label: "Acerca de", href: "#lineadetiempo" },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          handleSectionNav(e, item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white font-semibold"
                      >
                        {item.label}
                      </a>
                    ))}

                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
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