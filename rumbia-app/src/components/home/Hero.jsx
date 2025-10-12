import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleReserve = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };


  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-2 py-2 lg:py-19 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#378BA4]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#036280]/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 pt-5 ">
        {/* Copy - Diseño moderno y compacto */}
        <div className="space-y-8">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-sm rounded-full border border-[#378BA4]/30 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#378BA4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#378BA4]"></span>
            </span>
            <span className="text-sm font-semibold text-[#012E4A]">Sesiones disponibles ahora</span>
          </div>

          {/* Título con efecto 3D */}
          <div className="relative">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-[#012E4A]">
              Orientación vocacional por{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#036280] via-[#378BA4] to-[#036280] bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: "gradient 3s ease infinite" }}>
                  videollamada
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4 Q50 0, 100 4 T200 4" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#036280" />
                      <stop offset="100%" stopColor="#378BA4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
            Estudiantes de educación superior guían a adolescentes y jóvenes (15–27 años) de Perú e internacional. <span className="text-[#012E4A] font-semibold">Aclara tus dudas y elige con seguridad tu camino.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleReserve}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#036280] to-[#378BA4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#378BA4]/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reservar sesión
                <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() =>
                document
                  .querySelector("#contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group px-8 py-4 border-2 border-[#036280]/30 hover:border-[#378BA4] bg-white/80 hover:bg-[#378BA4]/10 backdrop-blur-sm text-[#012E4A] font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                Contáctanos
                <span className="group-hover:rotate-45 transition-transform">✉</span>
              </span>
            </button>
          </div>

          {/* Tags con efecto 3D */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Perú", icon: "🇵🇪", delay: 0 },
              { label: "Freemium", icon: "✨", delay: 100 },
              { label: "Síncrono", icon: "⚡", delay: 200 },
              { label: "Accesible", icon: "🌟", delay: 300 }
            ].map((tag) => (
              <div
                key={tag.label}
                className="group relative px-5 py-2.5 bg-white backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#378BA4]/10 hover:to-[#036280]/10 rounded-full text-sm font-semibold text-[#012E4A] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-default border border-[#378BA4]/20"
                style={{ animationDelay: `${tag.delay}ms` }}
              >
                <span className="flex items-center gap-2">
                  <span className="group-hover:scale-125 transition-transform">{tag.icon}</span>
                  {tag.label}
                </span>
              </div>
            ))}
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#378BA4]/10 to-transparent backdrop-blur-sm border border-[#378BA4]/20 hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl font-bold text-[#012E4A]">500+</div>
              <div className="text-xs text-gray-600 mt-1">Sesiones</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#036280]/10 to-transparent backdrop-blur-sm border border-[#036280]/20 hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl font-bold text-[#012E4A]">4.9★</div>
              <div className="text-xs text-gray-600 mt-1">Rating</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#378BA4]/10 to-transparent backdrop-blur-sm border border-[#378BA4]/20 hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl font-bold text-[#012E4A]">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Disponible</div>
            </div>
          </div>
        </div>

        {/* Visual - Mejorado con efectos 3D */}
        <div className="relative lg:ml-8">
          {/* Elemento decorativo detrás */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-15"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            {/* Video topbar */}
            <div className="bg-gradient-to-r from-[#012E4A] to-[#036280] p-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex-1 text-center text-white text-sm font-medium">
                Sesión de Orientación • En vivo
              </div>
            </div>

            {/* Video body */}
            <div className="p-6 space-y-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl relative group">

                {/* Imagen siempre visible */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&q=80')" }}
                ></div>

                {/* Overlay fijo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>


              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: "💡", text: "Consejos reales", color: "from-yellow-100 to-yellow-50", border: "border-yellow-200" },
                  { icon: "🎯", text: "Experiencia cercana", color: "from-[#378BA4]/20 to-[#378BA4]/10", border: "border-[#378BA4]/30" },
                  { icon: "✅", text: "Decide con seguridad", color: "from-green-100 to-green-50", border: "border-green-200" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-[#012E4A] font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-x-2 border ${item.border} flex items-center gap-3 cursor-default`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;