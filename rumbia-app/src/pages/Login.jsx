import { useNavigate } from 'react-router-dom';
import LoginSidebar from '../components/login/LoginSidebar';
import LoginHero from '../components/login/LoginHero';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen">
      <LoginSidebar onLogin={handleLogin} />
      <LoginHero />
    </div>
  );
};

export default Login;