import SessionCard from './SessionCard'

const SessionGrid = ({ sessions, loading, hasFilters, onClearFilters }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
        ))}
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center bg-[#023e61]/30 rounded-3xl border border-white/10 border-dashed backdrop-blur-sm">
        <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No encontramos sesiones</h3>
        <p className="text-white/60 max-w-md mb-8 text-base">
            Intenta ajustar tus filtros o buscar con otras palabras clave.
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="px-8 py-3 bg-[#378BA4] text-white hover:bg-[#2c6f82] font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#378BA4]/50"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  )
}

export default SessionGrid