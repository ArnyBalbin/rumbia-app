import { Sparkles, Lock } from 'lucide-react';

const AuthCard = ({ title, subtitle, badge, children, mousePosition = { x: 0, y: 0 }, isVisible = true }) => {
  return (
    <div 
      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] animate-gradient-x"></div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#378BA4]" />
                <span className="text-sm font-bold text-white">{badge}</span>
              </div>
            )}

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {title}
              <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                {subtitle}
              </span>
            </h2>
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Conexión segura
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Datos protegidos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative orbs */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#378BA4] rounded-full blur-md opacity-60 animate-float"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#036280] rounded-full blur-md opacity-60 animate-float-reverse"></div>
    </div>
  );
};

export default AuthCard;