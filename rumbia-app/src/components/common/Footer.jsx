import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <small className="text-cream">
            © {currentYear} RUMBIA · Educación que acompaña decisiones.
          </small>
          <nav className="flex gap-6">
            <Link to="/terms" className="text-cream hover:text-white transition-colors">
              Términos
            </Link>
            <Link to="/privacy" className="text-cream hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link to="/contact" className="text-cream hover:text-white transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer