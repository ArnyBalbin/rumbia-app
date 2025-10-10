const Benefits = () => {
  const benefits = [
    {
      icon: '💬',
      title: 'Conversaciones reales',
      description: 'Habla con quien ya está en la carrera que te interesa.'
    },
    {
      icon: '📚',
      title: 'Recursos prácticos',
      description: 'Guías, rutas y comparativas para decidir mejor.'
    },
    {
      icon: '⏱️',
      title: 'Reserva en minutos',
      description: 'Agenda en línea y recordatorios automáticos.'
    }
  ]

  return (
    <section id="beneficios" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-12 text-center">
        ¿Por qué usar Rumbía?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, idx) => (
          <article key={idx} className="card text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
            <p className="text-muted">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Benefits