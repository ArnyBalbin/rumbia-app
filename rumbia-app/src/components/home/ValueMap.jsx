import { CheckCircle, Star, Sparkles } from 'lucide-react'

const ValueMap = () => {
  const features = [
    {
      title: 'Productos',
      items: [
        { badge: 'Esencial', text: 'Plataforma web con videollamadas en tiempo real.', type: 'essential' },
        { badge: 'Esencial', text: 'Acceso a universitarios que comparten su experiencia.', type: 'essential' },
        { badge: 'Importante', text: 'Agenda en línea para reservar sesiones.', type: 'important' },
        { badge: 'Importante', text: 'Biblioteca digital con recursos y guías.', type: 'important' },
        { badge: 'Agradable', text: 'Foro/comunidad para dudas rápidas.', type: 'nice' },
        { badge: 'Agradable', text: 'Noticias de becas, ferias y universidades.', type: 'nice' }
      ]
    },
    {
      title: 'Servicios',
      items: [
        { badge: 'Esencial', text: 'Videollamadas personalizadas que reducen la incertidumbre.', type: 'essential' },
        { badge: 'Esencial', text: 'Información verificada y confiable.', type: 'essential' },
        { badge: 'Importante', text: 'Asesoría cercana y motivacional.', type: 'important' },
        { badge: 'Importante', text: 'Precios accesibles / freemium.', type: 'important' },
        { badge: 'Agradable', text: 'Interfaz intuitiva y atractiva.', type: 'nice' }
      ]
    },
    {
      title: 'Beneficios',
      items: [
        { badge: 'Esencial', text: 'Orientación clara para decidir con seguridad.', type: 'essential' },
        { badge: 'Importante', text: 'Experiencias inspiradoras de universitarios.', type: 'important' },
        { badge: 'Importante', text: 'Ahorro de tiempo centralizando información.', type: 'important' },
        { badge: 'Agradable', text: 'Conexión con una comunidad afín.', type: 'nice' },
        { badge: 'Agradable', text: 'Gamificación: logros, insignias, retos.', type: 'nice' }
      ]
    }
  ]

  const getTypeConfig = (type) => {
    switch (type) {
      case 'essential':
        return {
          bgColor: 'bg-[#012E4A]',
          icon: CheckCircle,
          iconColor: 'text-[#012E4A]'
        }
      case 'important':
        return {
          bgColor: 'bg-[#036280]',
          icon: Star,
          iconColor: 'text-[#036280]'
        }
      case 'nice':
        return {
          bgColor: 'bg-[#378BA4]',
          icon: Sparkles,
          iconColor: 'text-[#378BA4]'
        }
      default:
        return {
          bgColor: 'bg-gray-500',
          icon: CheckCircle,
          iconColor: 'text-gray-500'
        }
    }
  }

  return (
    <section id="valor" className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#012E4A] mb-4">
            Mapa de Valor
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma te ayuda a tomar la mejor decisión para tu futuro
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#012E4A]" />
            <span className="text-sm font-medium text-gray-700">Esencial</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#036280]" />
            <span className="text-sm font-medium text-gray-700">Importante</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#378BA4]" />
            <span className="text-sm font-medium text-gray-700">Agradable</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
            >
              {/* Section Header */}
              <div className="mb-6 pb-4 border-b-2 border-[#378BA4]">
                <h3 className="text-2xl font-bold text-[#012E4A]">{section.title}</h3>
              </div>

              {/* Items List */}
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => {
                  const config = getTypeConfig(item.type)
                  const Icon = config.icon
                  
                  return (
                    <li 
                      key={itemIdx} 
                      className="group flex gap-3 items-start hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className={`mt-0.5 rounded-full p-1.5 ${config.bgColor} bg-opacity-10`}>
                        <Icon className={`w-4 h-4 ${config.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <span className={`inline-block ${config.bgColor} text-white px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5`}>
                          {item.badge}
                        </span>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            ¿Listo para comenzar tu camino hacia la universidad ideal?
          </p>
          <button className="bg-[#012E4A] hover:bg-[#036280] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
            Explorar Plataforma
          </button>
        </div>
      </div>
    </section>
  )
}

export default ValueMap