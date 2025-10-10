const LoginForm = ({ onSubmit }) => {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-3xl font-normal text-gray-800 mb-8">Iniciar Sesión</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700 mb-2 font-normal">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo"
            className="px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-700 mb-2 font-normal">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            className="px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          className="bg-[#036280] w-full py-3 text-white rounded-md text-base font-medium hover:bg-primary transition-colors duration-200"
        >
          Iniciar Sesión
        </button>

        <div className="text-center">
          <a href="/register" className="text-sm text-blue-600 font-medium hover:underline">
            ¡Regístrate aquí!
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;