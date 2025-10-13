import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/home/Hero'
import MentorCarousel from '../components/home/MentorCarousel'
import Benefits from '../components/home/Benefits'
import ContactForm from '../components/home/ContactForm'
import WhatsAppButton from '../components/common/WhatsAppButton'
import StepsTimeline from '../components/home/StepsTimeline'

const Home = () => {
  const handleCTA = () => {
    document.querySelector('#booking-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero /> 
        <MentorCarousel />
        <Benefits />
        <StepsTimeline />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+51986107594" />
    </div>
  )
}

export default Home