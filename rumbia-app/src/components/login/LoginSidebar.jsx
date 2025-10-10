import Brand from '../common/Brand';
import LoginForm from './LoginForm';

const LoginSidebar = ({ onLogin }) => {
  return (
    <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-8 lg:p-12 relative">
      <Brand />
      <div className="w-full max-w-md">
        <LoginForm onSubmit={onLogin} />
      </div>
    </div>
  );
};

export default LoginSidebar;