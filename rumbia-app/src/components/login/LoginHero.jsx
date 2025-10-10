const LoginHero = () => {
  return (
    <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
      {/* Reemplaza esta URL con tu imagen de universidad/aula */}
      <img 
        src="/images/university-hall.jpg" 
        alt="Universidad" 
        className="w-full h-full object-cover"
      />
      {/* Overlay sutil opcional */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
    </div>
  );
};

export default LoginHero;