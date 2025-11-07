import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Discover from './pages/Discover';
import Schedule from './pages/Schedule'
import Session from './pages/Session'
import StepsForVocation from './pages/Steps-for-Vocation';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path='/Steps-for-Vocation' element={<StepsForVocation />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
