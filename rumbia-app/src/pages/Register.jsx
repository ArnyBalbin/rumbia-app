import { useNavigate } from 'react-router-dom';
import RegisterSidebar from '../components/register/RegisterSidebar';
import RegisterHero from '../components/register/RegisterHero';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    console.log("Registro exitoso:", formData);
    // Aquí iría tu lógica: API call, luego navigate("/home")
    // navigate("/home");
  };

  return (
    <div className="flex min-h-screen">
      <RegisterSidebar onRegister={handleRegister} />
      <RegisterHero />
    </div>
  );
};

export default Register;