import { useNavigate } from 'react-router-dom';
import RegisterSidebar from '../components/register/RegisterSidebar';
import RegisterHero from '../components/register/RegisterHero';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de registro: API call
    console.log("Registro exitoso");
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen">
      <RegisterSidebar onRegister={handleRegister} />
      <RegisterHero />
    </div>
  );
};

export default Register;