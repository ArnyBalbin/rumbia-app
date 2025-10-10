import Brand from '../common/Brand';
import RegisterForm from './RegisterForm';

const RegisterSidebar = ({ onRegister }) => {
  return (
    <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-8 lg:p-12 relative overflow-y-auto">
      <Brand />
      <div className="w-full max-w-md">
        <RegisterForm onSubmit={onRegister} />
      </div>
    </div>
  );
};

export default RegisterSidebar;