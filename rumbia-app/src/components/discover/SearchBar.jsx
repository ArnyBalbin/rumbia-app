import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = "Buscar por carrera, mentor o tema..." }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
      />
    </div>
  )
}

export default SearchBar