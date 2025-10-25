import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Onboarding = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else if (user?.onboardingCompleted) {
      navigate('/home')
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <OnboardingSteps />
    </div>
  )
}

export default Onboarding