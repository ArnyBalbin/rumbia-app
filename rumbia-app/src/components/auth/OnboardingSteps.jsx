import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Button from '../common/Button'
import { CAREERS, SCHEDULES, INTERESTS } from '../../utils/constants'
import { CheckCircle, Circle } from 'lucide-react'

const OnboardingSteps = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    careers: [],
    schedules: [],
    interests: []
  })

  const toggleSelection = (category, item) => {
    setSelections(prev => {
      const current = prev[category]
      const isSelected = current.includes(item)
      
      return {
        ...prev,
        [category]: isSelected
          ? current.filter(i => i !== item)
          : [...current, item]
      }
    })
  }

  const isSelected = (category, item) => {
    return selections[category].includes(item)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    updateUser({
      ...selections,
      onboardingCompleted: true
    })
    navigate('/home')
  }

  const canProceed = () => {
    if (step === 1) return selections.interests.length > 0
    if (step === 2) return selections.careers.length > 0
    if (step === 3) return selections.schedules.length > 0
    return false
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="card">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted">Paso {step} de 3</span>
            <span className="text-sm font-medium text-accent">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-cream rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-secondary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Intereses */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">
                ¿Qué te interesa?
              </h2>
              <p className="text-muted">
                Selecciona los temas que más te interesan (puedes elegir varios)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleSelection('interests', interest)}
                  className={`p-4 border-2 rounded-custom text-left transition-all ${
                    isSelected('interests', interest)
                      ? 'border-accent bg-accent bg-opacity-10'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-textDark">{interest}</span>
                    {isSelected('interests', interest) ? (
                      <CheckCircle className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-gray-300" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Carreras */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">
                Áreas de estudio
              </h2>
              <p className="text-muted">
                ¿Qué carreras te gustaría explorar?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREERS.map((career) => (
                <button
                  key={career}
                  onClick={() => toggleSelection('careers', career)}
                  className={`p-4 border-2 rounded-custom text-left transition-all ${
                    isSelected('careers', career)
                      ? 'border-accent bg-accent bg-opacity-10'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-textDark">{career}</span>
                    {isSelected('careers', career) ? (
                      <CheckCircle className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-gray-300" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Horarios */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">
                Horarios preferidos
              </h2>
              <p className="text-muted">
                ¿Cuándo te gustaría tener tus sesiones?
              </p>
            </div>

            <div className="space-y-4">
              {SCHEDULES.map((schedule) => (
                <button
                  key={schedule}
                  onClick={() => toggleSelection('schedules', schedule)}
                  className={`w-full p-4 border-2 rounded-custom text-left transition-all ${
                    isSelected('schedules', schedule)
                      ? 'border-accent bg-accent bg-opacity-10'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-textDark">{schedule}</span>
                    {isSelected('schedules', schedule) ? (
                      <CheckCircle className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-gray-300" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Anterior
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === 3 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingSteps