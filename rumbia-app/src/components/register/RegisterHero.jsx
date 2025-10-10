const RegisterHero = () => {
  return (
    <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
      {/* Reemplaza con tu imagen */}
      <img 
        src="/images/university-hall.jpg" 
        alt="Estudiantes universitarios" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
      
    </div>
  );
};

export default RegisterHero;