import { Filter, X } from 'lucide-react'
import { CAREERS } from '../../utils/constants'

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
        className="lg:hidden w-full btn-primary flex items-center justify-center gap-2 mb-4"
      >
        <Filter size={20} />
        Filtros {hasActiveFilters && `(${filters.careers.length + filters.priceRange.length + filters.schedule.length})`}
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-accent hover:text-secondary flex items-center gap-1"
            >
              <X size={16} />
              Limpiar
            </button>
          )}
        </div>

        {/* Carreras */}
        <div>
          <h4 className="font-semibold text-textDark mb-3">Carreras</h4>
          <div className="space-y-2">
            {CAREERS.map(career => (
              <label key={career} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.careers.includes(career)}
                  onChange={() => toggleFilter('careers', career)}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-muted">{career}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <h4 className="font-semibold text-textDark mb-3">Precio</h4>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(range.value)}
                  onChange={() => toggleFilter('priceRange', range.value)}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-muted">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Horario */}
        <div>
          <h4 className="font-semibold text-textDark mb-3">Horario</h4>
          <div className="space-y-2">
            {schedules.map(schedule => (
              <label key={schedule.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.schedule.includes(schedule.value)}
                  onChange={() => toggleFilter('schedule', schedule.value)}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-muted">{schedule.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterPanel