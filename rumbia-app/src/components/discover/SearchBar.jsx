// SVG Icon
const SearchSVG = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/70"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchBar = ({ value, onChange, placeholder = "Buscar por carrera, mentor o tema..." }) => {
  return (
    <div className="relative w-full">
      {/* Ícono de búsqueda */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchSVG size={22} />
      </div>

      {/* Input - CLASES DE ESTILO CON FONDO SÓLIDO */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 
          bg-[#012E4A] /* CAMBIO CLAVE: Fondo sólido oscuro */
          border border-white/20 rounded-xl 
          text-white placeholder-white/70 focus:outline-none 
          focus:ring-4 focus:ring-[#378BA4]/60 focus:border-[#378BA4] 
          shadow-lg transition-all duration-300 
          hover:border-[#378BA4]/60 hover:shadow-2xl hover:shadow-[#036280]/30" 
      />
    </div>
  );
};

export default SearchBar;