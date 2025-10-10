const Testimonials = () => {
  const testimonials = [
    {
      quote: 'Gracias a la sesión entendí la diferencia entre Ing. de Sistemas e Ing. de Software. Ahora sé qué cursos me esperan y qué me gusta más.',
      name: 'Joselyn (17)',
      info: 'Secundaria · Trujillo',
      initial: 'J',
      color: 'from-accent to-secondary'
    },
    {
      quote: 'Me contaron la realidad de Medicina y opciones de becas. Fue directo y sin humo.',
      name: 'Matías (19)',
      info: 'Preuniversitario · Lima',
      initial: 'M',
      color: 'from-primary to-accent'
    }
  ]

  return (
    <section id="comunidad" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-12 text-center">
        Comunidad
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, idx) => (
          <article key={idx} className="card">
            <blockquote className="text-muted italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                {testimonial.initial}
              </div>
              <div>
                <strong className="block text-textDark">{testimonial.name}</strong>
                <small className="text-muted">{testimonial.info}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials