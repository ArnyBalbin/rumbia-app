import { CAREERS } from '../../utils/constants'

// SVG Icons
const FilterSVG = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const CloseSVG = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const FilterPanel = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const priceRanges = [
    { label: 'Gratis', value: 'free' },
    { label: 'Menos de S/20', value: '0-20' },
    { label: 'S/20 - S/50', value: '20-50' },
    { label: 'Más de S/50', value: '50+' }
  ]

  const schedules = [
    { label: 'Mañana', value: 'morning' },
    { label: 'Tarde', value: 'afternoon' },
    { label: 'Noche', value: 'evening' },
    { label: 'Fin de semana', value: 'weekend' }
  ]

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type]
      const isSelected = current.includes(value)
      
      return {
        ...prev,
        [type]: isSelected
          ? current.filter(item => item !== value)
          : [...current, value]
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      careers: [],
      priceRange: [],
      schedule: []
    })
  }

  const hasActiveFilters = 
    filters.careers.length > 0 || 
    filters.priceRange.length > 0 || 
    filters.schedule.length > 0

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-semibold rounded-lg flex items-center justify-center gap-2 mb-4 hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
      >
        <FilterSVG size={20} />
        Filtros {hasActiveFilters && `(${filters.careers.length + filters.priceRange.length + filters.schedule.length})`}
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FilterSVG size={20} />
            Filtros
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#378BA4] hover:text-white flex items-center gap-1 transition-colors font-medium"
            >
              <CloseSVG size={16} />
              Limpiar
            </button>
          )}
        </div>

        {/* Carreras */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-white mb-3">Carreras</h4>
          <div className="space-y-3">
            {CAREERS.map(career => (
              <label key={career} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input
                    type="checkbox"
                    checked={filters.careers.includes(career)}
                    onChange={() => toggleFilter('careers', career)}
                    className="appearance-none w-5 h-5 rounded border-2 border-white/40 bg-white/5 checked:bg-[#378BA4] checked:border-[#378BA4] focus:outline-none focus:ring-2 focus:ring-[#378BA4]/50 transition-all cursor-pointer group-hover:border-[#378BA4]/60"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.careers.includes(career) ? 'block' : 'none' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{career}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-white mb-3">Precio</h4>
          <div className="space-y-3">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(range.value)}
                    onChange={() => toggleFilter('priceRange', range.value)}
                    className="appearance-none w-5 h-5 rounded border-2 border-white/40 bg-white/5 checked:bg-[#378BA4] checked:border-[#378BA4] focus:outline-none focus:ring-2 focus:ring-[#378BA4]/50 transition-all cursor-pointer group-hover:border-[#378BA4]/60"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.priceRange.includes(range.value) ? 'block' : 'none' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Horario */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold text-white mb-3">Horario</h4>
          <div className="space-y-3">
            {schedules.map(schedule => (
              <label key={schedule.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.schedule.includes(schedule.value)}
                    onChange={() => toggleFilter('schedule', schedule.value)}
                    className="appearance-none w-5 h-5 rounded border-2 border-white/40 bg-white/5 checked:bg-[#378BA4] checked:border-[#378BA4] focus:outline-none focus:ring-2 focus:ring-[#378BA4]/50 transition-all cursor-pointer group-hover:border-[#378BA4]/60"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none hidden" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.schedule.includes(schedule.value) ? 'block' : 'none' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{schedule.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterPanel