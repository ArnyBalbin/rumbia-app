import { Calendar, Clock, MapPin, Check, ArrowRight } from 'lucide-react'

const BookingCard = ({ price, scheduleDate, duration, platform, onEnroll, enrolling }) => {
  const dateObj = new Date(scheduleDate)
  // Calculamos hora fin
  const endDateObj = new Date(dateObj.getTime() + (duration || 60) * 60000)

  return (
    <div className="sticky top-24 z-20">
      <div className="bg-[#0b3b55] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header: Precio */}
        <div className="p-6 border-b border-white/10 bg-black/10">
          <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">
            Valor de la sesión
          </p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">
              {parseFloat(price) === 0 ? 'Gratis' : `S/${parseFloat(price).toFixed(2)}`}
            </span>
            {parseFloat(price) > 0 && (
              <span className="text-white/40 text-sm line-through mb-1.5">
                 S/{(parseFloat(price) * 1.3).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Body: Detalles */}
        <div className="p-6 space-y-6">
          
          {/* Lista de Info */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <Calendar className="w-5 h-5 text-[#378BA4]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {dateObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-white/50 text-xs mt-0.5">Fecha programada</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-[#378BA4]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {dateObj.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })} - {endDateObj.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-white/50 text-xs mt-0.5">{duration} minutos de duración</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#378BA4]" />
              </div>
              <div>
                <p className="text-white font-medium capitalize">
                  {platform}
                </p>
                <p className="text-white/50 text-xs mt-0.5">Acceso remoto</p>
              </div>
            </div>
          </div>

          {/* Botón de Acción */}
          <button 
            onClick={onEnroll}
            disabled={enrolling}
            className="w-full group relative flex items-center justify-center gap-2 py-4 bg-[#378BA4] hover:bg-[#2c7a93] text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-[#378BA4]/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {enrolling ? (
              <span>Procesando...</span>
            ) : (
              <>
                Reservar Cupo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Footer pequeño */}
          <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] uppercase tracking-wide font-medium">
            <Check className="w-3 h-3" />
            <span>Garantía de Satisfacción</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookingCard