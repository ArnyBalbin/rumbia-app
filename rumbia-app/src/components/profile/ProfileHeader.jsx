import { useState } from 'react'
import { Camera, Mail, Calendar, User } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const ProfileHeader = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || '')

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateUser({ profilePic: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveUsername = () => {
    if (username.trim()) {
      updateUser({ username: username.trim() })
      setIsEditing(false)
    }
  }

  const calculateAge = (birthdate) => {
    const birth = new Date(birthdate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              user?.username?.charAt(0).toUpperCase()
            )}
          </div>
          <label className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="text-white" size={32} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSaveUsername}
                className="px-4 py-1 bg-accent text-white rounded-lg hover:bg-secondary transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setUsername(user?.username || '')
                  setIsEditing(false)
                }}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl font-bold text-primary">{user?.username}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-muted hover:text-accent transition-colors"
              >
                <User size={18} />
              </button>
            </div>
          )}

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-muted justify-center md:justify-start">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
            {user?.birthdate && (
              <div className="flex items-center gap-2 text-muted justify-center md:justify-start">
                <Calendar size={18} />
                <span>{calculateAge(user.birthdate)} años</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              user?.role === 'mentor' 
                ? 'bg-accent bg-opacity-20 text-accent'
                : 'bg-primary bg-opacity-20 text-primary'
            }`}>
              {user?.role === 'mentor' ? '👨‍🏫 Mentor' : '🎓 Estudiante'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader