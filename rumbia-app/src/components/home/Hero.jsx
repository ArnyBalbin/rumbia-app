import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const [isAuthenticated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleReserve = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen bg-[#012E4A] px-4 py-12 lg:py-20 overflow-hidden">
      {/* Fondo con malla 3D animada */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #036280 1px, transparent 1px),
            linear-gradient(to bottom, #036280 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>

      {/* Orbes flotantes 3D */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20" style={{
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#378BA4] rounded-full blur-2xl opacity-10" style={{
        animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}></div>

      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Columna izquierda - Contenido */}
        <div className="space-y-8">
          {/* Badge con efecto neón */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#036280]/30 to-[#378BA4]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg shadow-[#378BA4]/20 hover:shadow-[#378BA4]/40 transition-all duration-300 group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#378BA4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#378BA4] shadow-lg shadow-[#378BA4]/50"></span>
            </span>
            <span className="text-sm font-bold text-white tracking-wide">Conecta ahora • En vivo</span>
          </div>

          {/* Título con efecto holográfico */}
          <div className="relative">
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight">
              <span className="block text-white mb-2" style={{
                textShadow: '0 0 30px rgba(55, 139, 164, 0.5)'
              }}>
                Orientación
              </span>
              <span className="block text-white mb-2">
                vocacional por
              </span>
              <span className="relative inline-block group">
                <span className="relative z-10 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] bg-clip-text text-transparent animate-gradient-x font-black" style={{
                  backgroundSize: '200% auto',
                  filter: 'drop-shadow(0 0 20px rgba(55, 139, 164, 0.6))'
                }}>
                  videollamada
                </span>
                {/* Línea 3D debajo */}
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#378BA4] to-transparent rounded-full blur-sm"></div>
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#378BA4] to-transparent rounded-full"></div>
              </span>
            </h1>
          </div>

          {/* Descripción con glassmorphism */}
          <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
              Estudiantes universitarios <span className="text-[#378BA4] font-bold">en vivo</span> guían a jóvenes de 15–27 años.
              <span className="block mt-2 text-white font-semibold">
                🎯 Aclara dudas • Elige tu camino con seguridad
              </span>
            </p>
          </div>

          {/* CTAs con efecto 3D */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleReserve}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-2xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              style={{
                boxShadow: '0 20px 60px -15px rgba(55, 139, 164, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                Reservar sesión
                <span className="group-hover:translate-x-2 transition-transform text-2xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Brillo animado */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>
            
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-[#378BA4] text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl group-hover:rotate-12 transition-transform">💬</span>
                Contáctanos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Stats cards 3D */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: "500+", label: "Sesiones", icon: "📊", delay: 0 },
              { value: "4.9★", label: "Rating", icon: "⭐", delay: 100 },
              { value: "24/7", label: "Online", icon: "🌐", delay: 200 },
              { value: "🇵🇪", label: "Perú", icon: "🏆", delay: 300 }
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-[#378BA4]/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-default"
                style={{
                  animationDelay: `${stat.delay}ms`,
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
                }}
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-xs text-gray-300 font-medium">{stat.label}</div>
                </div>
                {/* Brillo hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#378BA4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Tags flotantes */}
          <div className="flex flex-wrap gap-3">
            {[
              { text: "Freemium", icon: "✨", color: "from-[#378BA4]/30 to-[#036280]/30" },
              { text: "Síncrono", icon: "⚡", color: "from-[#036280]/30 to-[#378BA4]/30" },
              { text: "Accesible", icon: "🌟", color: "from-[#378BA4]/30 to-[#036280]/30" }
            ].map((tag, i) => (
              <div
                key={i}
                className={`group px-6 py-3 bg-gradient-to-r ${tag.color} backdrop-blur-xl rounded-full border border-white/20 hover:border-[#378BA4] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-default shadow-lg`}
              >
                <span className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-transform">{tag.icon}</span>
                  {tag.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Card 3D flotante */}
        <div className="relative perspective-1000">
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
          
          <div 
            className="relative transform-gpu transition-transform duration-300 hover:scale-[1.02]"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
              style={{
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Topbar de video */}
              <div className="bg-gradient-to-r from-[#012E4A] via-[#036280] to-[#012E4A] p-4 flex items-center gap-3 border-b border-white/10">
                <div className="flex gap-2">
                  {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${color} hover:scale-125 transition-transform cursor-pointer shadow-lg`}></div>
                  ))}
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-2 text-white font-bold text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    EN VIVO • Sesión de Orientación
                  </div>
                </div>
              </div>

              {/* Video preview con overlay 3D */}
              <div className="p-6 space-y-4">
                <div className="aspect-video rounded-2xl overflow-hidden relative group shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                    alt="Sesión"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay con efecto holográfico */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012E4A]/90 via-[#036280]/50 to-transparent"></div>
                  
                  {/* Play button flotante */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#378BA4]/40 transition-all duration-300 shadow-2xl cursor-pointer">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#378BA4] to-[#036280] flex items-center justify-center text-white font-bold text-lg shadow-xl">
                          A
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">Ana - Ing. Industrial</div>
                          <div className="text-gray-300 text-xs">Universidad Nacional</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature cards 3D */}
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: "💡", text: "Consejos desde la experiencia real", gradient: "from-yellow-500/20 to-orange-500/20" },
                    { icon: "🎯", text: "Conecta con quien ya lo vivió", gradient: "from-[#378BA4]/20 to-[#036280]/20" },
                    { icon: "✅", text: "Decide tu futuro con confianza", gradient: "from-green-500/20 to-emerald-500/20" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`group relative p-4 rounded-xl bg-gradient-to-r ${item.gradient} backdrop-blur-xl border border-white/20 hover:border-[#378BA4] transition-all duration-300 transform hover:translate-x-2 hover:scale-105 cursor-default overflow-hidden`}
                    >
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform">{item.icon}</span>
                        <span className="text-white font-bold text-sm">{item.text}</span>
                      </div>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .border-l-12 {
          border-left-width: 12px;
        }
      `}</style>
    </section>
  );
};

export default Hero;