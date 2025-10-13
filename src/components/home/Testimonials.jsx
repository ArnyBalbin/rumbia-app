import { Quote, Star, Users, MessageSquare } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      quote: 'Gracias a la sesión entendí la diferencia entre Ing. de Sistemas e Ing. de Software. Ahora sé qué cursos me esperan y qué me gusta más.',
      name: 'Joselyn',
      age: '17',
      info: 'Secundaria · Trujillo',
      initial: 'J',
      color: 'from-[#378BA4] to-[#036280]',
      rating: 5
    },
    {
      quote: 'Me contaron la realidad de Medicina y opciones de becas. Fue directo y sin humo.',
      name: 'Matías',
      age: '19',
      info: 'Preuniversitario · Lima',
      initial: 'M',
      color: 'from-[#012E4A] to-[#378BA4]',
      rating: 5
    }
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Estudiantes conectados' },
    { icon: MessageSquare, value: '1,200+', label: 'Conversaciones realizadas' },
    { icon: Star, value: '4.9/5', label: 'Calificación promedio' }
  ]

  return (
    <section id="comunidad" className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#378BA4] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#012E4A] rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#012E4A] mb-4">
            Comunidad Rumbía
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre cómo otros estudiantes encontraron su camino con nuestra ayuda
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, idx) => (
            <article 
              key={idx} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Quote icon background */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-24 h-24 text-[#012E4A]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#378BA4] text-[#378BA4]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative">
                  <span className="text-[#378BA4] text-4xl font-serif absolute -left-2 -top-2">"</span>
                  <span className="relative z-10">{testimonial.quote}</span>
                  <span className="text-[#378BA4] text-4xl font-serif">"</span>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  {/* Avatar with gradient */}
                  <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0 ring-4 ring-white group-hover:scale-110 transition-transform`}>
                    {testimonial.initial}
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Name and info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-[#012E4A] text-lg">{testimonial.name}</strong>
                      <span className="px-2 py-0.5 bg-[#378BA4] bg-opacity-10 text-[#012E4A] rounded-full text-xs font-semibold">
                        {testimonial.age} años
                      </span>
                    </div>
                    <small className="text-gray-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#378BA4]"></span>
                      {testimonial.info}
                    </small>
                  </div>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none`}></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials