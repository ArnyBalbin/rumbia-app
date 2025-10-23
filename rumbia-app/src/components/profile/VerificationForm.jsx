import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../common/Button'
import { useAuth } from '../../../context/AuthContext'

const VerificationForm = () => {
  const { user, updateUser } = useAuth()
  const [formData, setFormData] = useState({
    university: user?.university || '',
    career: user?.career || '',
    semester: user?.semester || '',
    studentId: user?.studentId || '',
    idDocument: null
  })
  const [preview, setPreview] = useState(user?.verificationDoc || null)
  const [status, setStatus] = useState(user?.verificationStatus || 'pending') // pending, verified, rejected

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
          idDocument: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({
      university: formData.university,
      career: formData.career,
      semester: formData.semester,
      studentId: formData.studentId,
      verificationDoc: formData.idDocument,
      verificationStatus: 'pending',
      verificationSubmittedAt: new Date().toISOString()
    })
    setStatus('pending')
    alert('Solicitud de verificación enviada. Te notificaremos cuando sea revisada.')
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Verificar estudios</h3>
        {status === 'verified' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">Verificado</span>
          </div>
        )}
        {status === 'pending' && (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle size={20} />
            <span className="font-medium">Pendiente</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Universidad */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Universidad
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="Ej: Universidad Nacional Mayor de San Marcos"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Carrera */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Carrera
            </label>
            <input
              type="text"
              name="career"
              value={formData.career}
              onChange={handleChange}
              placeholder="Ej: Ingeniería de Sistemas"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Semestre */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Semestre actual
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Selecciona...</option>
              {[1,2,3,4,5,6,7,8,9,10].map(sem => (
                <option key={sem} value={sem}>{sem}° Semestre</option>
              ))}
            </select>
          </div>

          {/* ID Estudiante */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Código de estudiante
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Ej: 20211234"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-custom focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Upload documento */}
        <div>
          <label className="block text-sm font-medium text-textDark mb-2">
            Constancia de estudios o carnet universitario
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
                  Arrastra tu archivo aquí o haz clic para seleccionar
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

        <Button type="submit" className="w-full" disabled={status === 'verified'}>
          {status === 'verified' ? 'Ya estás verificado' : 'Enviar verificación'}
        </Button>
      </form>
    </div>
  )
}

export default VerificationForm