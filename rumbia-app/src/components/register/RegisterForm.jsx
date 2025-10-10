import { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-normal text-gray-800 mb-2">Crear Cuenta</h2>
      <p className="text-sm text-gray-600 mb-8">Únete a RUMBIA y comienza tu experiencia</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-sm text-gray-700 mb-2 font-normal">
            Nombre completo
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            className="px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700 mb-2 font-normal">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            className={`px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            required
          />
          {errors.password && (
            <span className="text-xs text-red-500 mt-1">{errors.password}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm text-gray-700 mb-2 font-normal">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            className={`px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            required
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500 mt-1">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-700">
            Acepto los{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              términos y condiciones
            </a>{' '}
            y la{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              política de privacidad
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <span className="text-xs text-red-500">{errors.acceptTerms}</span>
        )}

        <button 
          type="submit" 
          className="bg-[#036280] w-full py-3 text-white rounded-md text-base font-medium hover:bg-primary transition-colors duration-200"
        >
          Crear cuenta
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">¿Ya tienes cuenta? </span>
          <a href="/login" className="text-sm text-blue-600 font-medium hover:underline">
            Inicia sesión
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;