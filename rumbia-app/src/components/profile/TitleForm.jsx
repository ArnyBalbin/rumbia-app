import { useState } from 'react'
import { Upload, CheckCircle } from 'lucide-react'
import Button from '../common/Button'
import { useAuth } from '../../../context/AuthContext'

const TitleForm = () => {
  const { user, updateUser } = useAuth()
  const [formData, setFormData] = useState({
    degree: user?.degree || '',
    graduationYear: user?.graduationYear || '',
    titleDoc: null
  })
  const [preview, setPreview] = useState(user?.titleDoc || null)
  const [submitted, setSubmitted] = useState(user?.titleVerified || false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          titleDoc: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({
      degree: formData.degree,
      graduationYear: formData.graduationYear,
      titleDoc: formData.titleDoc,
      titleVerified: false,
      titleSubmittedAt: new Date().toISOString()
    })
    setSubmitted(true)
    alert('Título enviado para verificación. Te notificaremos pronto.')
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Verificar título profesional</h3>
        {user?.titleVerified && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">Verificado</span>
          </div>
        )}
      </div>

      <p className="text-muted mb-6">
        Si ya te graduaste, puedes verificar tu título profesional para obtener mayor credibilidad como mentor.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grado */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Grado obtenido
            </label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Selecciona...</option>
              <option value="bachelor">Bachiller</option>
              <option value="licensed">Licenciado/a</option>
              <option value="master">Maestría</option>
              <option value="doctorate">Doctorado</option>
            </select>
          </div>

          {/* Año de graduación */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Año de graduación
            </label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="2023"
              min="1990"
              max={new Date().getFullYear()}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Upload título */}
        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Diploma o constancia de grado
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-custom p-8 text-center hover:border-accent transition-colors">
            {preview ? (
              <div className="space-y-4">
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                  <Upload size={20} />
                  Cambiar archivo
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload size={48} className="mx-auto text-muted mb-4" />
                <p className="text-muted mb-2">
                  Sube tu diploma o constancia
                </p>
                <p className="text-sm text-muted">
                  Formatos: JPG, PNG, PDF (max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={user?.titleVerified}>
          {user?.titleVerified ? 'Título verificado' : 'Enviar título'}
        </Button>
      </form>
    </div>
  )
}

export default TitleForm