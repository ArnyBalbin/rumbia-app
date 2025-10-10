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

  const getBadgeColor = (type) => {
    switch (type) {
      case 'essential':
        return 'bg-primary text-white'
      case 'important':
        return 'bg-accent text-white'
      case 'nice':
        return 'bg-light text-primary'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <section id="valor" className="bg-cream py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-12 text-center">
          Mapa de valor
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-bold text-secondary mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-3">
                    <span className={`${getBadgeColor(item.type)} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap h-fit`}>
                      {item.badge}
                    </span>
                    <span className="text-muted text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueMap