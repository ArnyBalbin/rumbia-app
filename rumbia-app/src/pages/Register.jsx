import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [canShowForm, setCanShowForm] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, []) 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden custom-scrollbar">
      {/* Orbes de fondo (mismo estilo que Login) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        ></div>
      </div>

      {/* Header con glassmorphism */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>

      {/* Main con el formulario */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-12">
        {canShowForm && <RegisterForm />}
      </main>

      {/* Footer con glassmorphism */}
      <div className="relative z-20">
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <Footer />
        </div>
      </div>

      {/* Animación de los orbes + CSS para ocultar scrollbar */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        /* Ocultar scrollbar en toda la página */
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE y Edge */
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari y Opera */
        }

        /* También ocultar scrollbar del body */
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Register