import { useState } from 'react'

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

const ChevronSVG = ({ size = 20, isOpen }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5"
    style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
      transition: 'transform 0.3s ease'
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const FilterPanel = ({ filters, setFilters, isOpen, setIsOpen, careers = [], categories = [] }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    careers: true,
    price: true,
    schedule: true
  })

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

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
      categories: [],
      priceRange: [],
      schedule: []
    })
  }

  const hasActiveFilters = 
    filters.careers.length > 0 || 
    filters.categories.length > 0 ||
    filters.priceRange.length > 0 || 
    filters.schedule.length > 0

  const activeFiltersCount = 
    filters.careers.length + 
    filters.categories.length + 
    filters.priceRange.length + 
    filters.schedule.length

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full px-6 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-2xl flex items-center justify-center gap-3 mb-6 hover:shadow-2xl hover:shadow-[#378BA4]/60 transition-all duration-300 hover:scale-105"
      >
        <FilterSVG size={22} />
        <span className="text-lg">Filtros {hasActiveFilters && `(${activeFiltersCount})`}</span>
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/30">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <FilterSVG size={24} />
            Filtros
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#378BA4] hover:text-white flex items-center gap-2 transition-colors font-bold px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <CloseSVG size={16} />
              Limpiar
            </button>
          )}
        </div>

        {/* Categorías */}
        {categories.length > 0 && (
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-white font-bold mb-3 hover:text-[#378BA4] transition-colors py-2"
            >
              <span className="text-lg">Categorías</span>
              <ChevronSVG size={22} isOpen={expandedSections.categories} />
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-300"
              style={{ 
                maxHeight: expandedSections.categories ? `${Math.min(categories.length * 40, 240)}px` : '0px'
              }}
            >
              <div className="space-y-2.5 overflow-hidden hover:overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '240px' }}>
                {categories.map(category => (
                  <label key={category.id_category} className="flex items-center gap-3 cursor-pointer group py-1.5 hover:bg-white/5 rounded-lg px-2 transition-colors">
                    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.id_category)}
                        onChange={() => toggleFilter('categories', category.id_category)}
                        className="appearance-none w-5 h-5 rounded-md border-2 border-white/50 bg-white/5 checked:bg-gradient-to-br checked:from-[#378BA4] checked:to-[#036280] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#378BA4]/60 transition-all cursor-pointer group-hover:border-[#378BA4]"
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.categories.includes(category.id_category) ? 'block' : 'none' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                      {category.category_name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Carreras */}
        {careers.length > 0 && (
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleSection('careers')}
              className="w-full flex items-center justify-between text-white font-bold mb-3 hover:text-[#378BA4] transition-colors py-2"
            >
              <span className="text-lg">Carreras</span>
              <ChevronSVG size={22} isOpen={expandedSections.careers} />
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-300"
              style={{ 
                maxHeight: expandedSections.careers ? `${Math.min(careers.length * 40, 240)}px` : '0px'
              }}
            >
              <div className="space-y-2.5 overflow-hidden hover:overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '240px' }}>
                {careers.map(career => (
                  <label key={career.id_career} className="flex items-center gap-3 cursor-pointer group py-1.5 hover:bg-white/5 rounded-lg px-2 transition-colors">
                    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={filters.careers.includes(career.id_career)}
                        onChange={() => toggleFilter('careers', career.id_career)}
                        className="appearance-none w-5 h-5 rounded-md border-2 border-white/50 bg-white/5 checked:bg-gradient-to-br checked:from-[#378BA4] checked:to-[#036280] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#378BA4]/60 transition-all cursor-pointer group-hover:border-[#378BA4]"
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.careers.includes(career.id_career) ? 'block' : 'none' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                      {career.name_career}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Precio */}
        <div className="border-b border-white/20 pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-white font-bold mb-3 hover:text-[#378BA4] transition-colors py-2"
          >
            <span className="text-lg">Precio</span>
            <ChevronSVG size={22} isOpen={expandedSections.price} />
          </button>
          
          <div 
            className="overflow-hidden transition-all duration-300"
            style={{ 
              maxHeight: expandedSections.price ? '200px' : '0px'
            }}
          >
            <div className="space-y-2.5">
              {priceRanges.map(range => (
                <label key={range.value} className="flex items-center gap-3 cursor-pointer group py-1.5 hover:bg-white/5 rounded-lg px-2 transition-colors">
                  <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.priceRange.includes(range.value)}
                      onChange={() => toggleFilter('priceRange', range.value)}
                      className="appearance-none w-5 h-5 rounded-md border-2 border-white/50 bg-white/5 checked:bg-gradient-to-br checked:from-[#378BA4] checked:to-[#036280] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#378BA4]/60 transition-all cursor-pointer group-hover:border-[#378BA4]"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.priceRange.includes(range.value) ? 'block' : 'none' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Horario */}
        <div className="pb-2">
          <button
            onClick={() => toggleSection('schedule')}
            className="w-full flex items-center justify-between text-white font-bold mb-3 hover:text-[#378BA4] transition-colors py-2"
          >
            <span className="text-lg">Horario</span>
            <ChevronSVG size={22} isOpen={expandedSections.schedule} />
          </button>
          
          <div 
            className="overflow-hidden transition-all duration-300"
            style={{ 
              maxHeight: expandedSections.schedule ? '200px' : '0px'
            }}
          >
            <div className="space-y-2.5">
              {schedules.map(schedule => (
                <label key={schedule.value} className="flex items-center gap-3 cursor-pointer group py-1.5 hover:bg-white/5 rounded-lg px-2 transition-colors">
                  <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.schedule.includes(schedule.value)}
                      onChange={() => toggleFilter('schedule', schedule.value)}
                      className="appearance-none w-5 h-5 rounded-md border-2 border-white/50 bg-white/5 checked:bg-gradient-to-br checked:from-[#378BA4] checked:to-[#036280] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#378BA4]/60 transition-all cursor-pointer group-hover:border-[#378BA4]"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ display: filters.schedule.includes(schedule.value) ? 'block' : 'none' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{schedule.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Scrollbar oculto por defecto, visible solo en hover */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 10px;
          transition: background 0.3s;
        }
        
        .custom-scrollbar:hover {
          scrollbar-color: rgba(55, 139, 164, 0.6) transparent;
        }
        
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(55, 139, 164, 0.6) 0%, rgba(3, 98, 128, 0.6) 100%);
        }
        
        .custom-scrollbar:hover::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(55, 139, 164, 0.9) 0%, rgba(3, 98, 128, 0.9) 100%);
        }
      `}</style>
    </>
  )
}

export default FilterPanel