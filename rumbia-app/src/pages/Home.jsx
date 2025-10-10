import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/home/Hero'
import MentorCarousel from '../components/home/MentorCarousel'
import ValueMap from '../components/home/ValueMap'
import Benefits from '../components/home/Benefits'
import BookingForm from '../components/home/BookingForm'
import Testimonials from '../components/home/Testimonials'
import Button from '../components/common/Button'

const Home = () => {
  const handleCTA = () => {
    document.querySelector('#booking-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <MentorCarousel />
        <ValueMap />
        <Benefits />
        <BookingForm />
        <Testimonials />
        
        {/* CTA Final */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Listo para elegir con seguridad?
            </h2>
            <p className="text-cream text-lg mb-8 max-w-2xl mx-auto">
              Agenda una videollamada y resuelve tus dudas con alguien que ya vive esa carrera.
            </p>
            <Button variant="light" onClick={handleCTA}>
              Agendar ahora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home