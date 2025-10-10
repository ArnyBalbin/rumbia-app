import { useNavigate } from 'react-router-dom';

const Brand = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div 
      onClick={handleClick}
      className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <span className="text-3xl">🎓</span>
      <span className="text-2xl font-bold text-gray-800">RUMBIA</span>
    </div>
  );
};

export default Brand;