import { ArrowRight } from 'lucide-react';

const SubmitButton = ({ loading, onClick, children, loadingText = 'Cargando...' }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="group relative w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold text-lg rounded-xl shadow-2xl shadow-[#378BA4]/50 hover:shadow-[#378BA4]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {loading ? (
          <>
            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            {loadingText}
          </>
        ) : (
          <>
            {children}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#036280] to-[#378BA4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
    </button>
  );
};

export default SubmitButton;