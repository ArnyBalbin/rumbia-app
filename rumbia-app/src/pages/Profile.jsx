import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProfileHeader from '../components/profile/ProfileHeader'
import VerificationForm from '../components/profile/VerificationForm'
import TitleForm from '../components/profile/TitleForm'

const Profile = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Mi Perfil</h1>
        
        <div className="space-y-8">
          <ProfileHeader />
          
          {user?.role === 'mentor' && (
            <>
              <VerificationForm />
              <TitleForm />
            </>
          )}

          {user?.role === 'student' && (
            <div className="card">
              <h3 className="text-2xl font-bold text-primary mb-4">Tus preferencias</h3>
              <div className="space-y-4">
                {user?.interests && (
                  <div>
                    <h4 className="font-semibold text-textDark mb-2">Intereses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, idx) => (
                        <span key={idx} className="px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {user?.careers && (
                  <div>
                    <h4 className="font-semibold text-textDark mb-2">Carreras de interés:</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.careers.map((career, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {user?.schedules && (
                  <div>
                    <h4 className="font-semibold text-textDark mb-2">Horarios preferidos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.schedules.map((schedule, idx) => (
                        <span key={idx} className="px-3 py-1 bg-secondary bg-opacity-20 text-secondary rounded-full text-sm">
                          {schedule}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile