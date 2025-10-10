import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/home/Hero'
import MentorCarousel from '../components/home/MentorCarousel'
import ValueMap from '../components/home/ValueMap'
import Benefits from '../components/home/Benefits'
import ContactForm from '../components/home/ContactForm'
import Testimonials from '../components/home/Testimonials'
import WhatsAppButton from '../components/common/WhatsAppButton'

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
        <ContactForm />
        <Testimonials />
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="+51986107594" />
    </div>
  )
}

export default Home