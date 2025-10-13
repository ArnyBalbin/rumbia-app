import { MessageCircle, BookOpen, Clock, ArrowRight } from 'lucide-react'

const Benefits = () => {
  const benefits = [
    {
      icon: MessageCircle,
      title: 'Conversaciones reales',
      description: 'Habla con quien ya está en la carrera que te interesa.',
      color: 'from-[#012E4A] to-[#036280]',
      highlight: 'Conecta directamente'
    },
    {
      icon: BookOpen,
      title: 'Recursos prácticos',
      description: 'Guías, rutas y comparativas para decidir mejor.',
      color: 'from-[#036280] to-[#378BA4]',
      highlight: 'Todo en un lugar'
    },
    {
      icon: Clock,
      title: 'Reserva en minutos',
      description: 'Agenda en línea y recordatorios automáticos.',
      color: 'from-[#378BA4] to-[#036280]',
      highlight: 'Rápido y fácil'
    }
  ]

  return (
    <section id="beneficios" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#378BA4] rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#012E4A] rounded-full opacity-5 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#012E4A] mb-4">
            ¿Por qué usar Rumbía?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Herramientas diseñadas para que tomes la mejor decisión sobre tu futuro académico
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            
            return (
              <article 
                key={idx} 
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with gradient background and highlight badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    
                    {/* Highlight badge centrado verticalmente */}
                    <span className="px-3 py-1 bg-[#378BA4] bg-opacity-10 text-[#012E4A] rounded-full text-xxs font-semibold">
                      {benefit.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#012E4A] mb-3 group-hover:text-[#036280] transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-[#378BA4] font-semibold text-sm opacity-50 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="mr-2">Conocer más</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#378BA4] to-transparent opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300"></div>
              </article>
            )
          })}
        </div>

        {/* Stats or additional info */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-[#012E4A] mb-1">+500</div>
            <div className="text-sm text-gray-600">Estudiantes asesorados</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-[#036280] mb-1">4.8/5</div>
            <div className="text-sm text-gray-600">Calificación promedio</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-[#378BA4] mb-1">100%</div>
            <div className="text-sm text-gray-600">Satisfacción garantizada</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits