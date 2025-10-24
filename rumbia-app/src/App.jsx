import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Profile from './pages/Profile'
import HomeLogged from './pages/HomeLogged'
import Discover from './pages/Discover'
import Schedule from './pages/Schedule'
import Session from './pages/Session'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/HomeLogged" element={<HomeLogged />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomeLogged />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/session/:id" element={<Session />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
