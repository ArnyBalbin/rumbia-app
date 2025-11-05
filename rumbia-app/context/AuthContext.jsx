import { createContext, useContext, useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('currentUser');

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Opcional: Verificar token con el backend
        await verifyToken(token);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token) => {
    try {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode) return;

      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Error al iniciar sesión');
      }

      // Guardar tokens
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Guardar datos del usuario con user_code
      const userData = {
        user_code: data.user_code, // Campo principal
        email: data.email || email,
        first_name: data.first_name,
        last_name: data.last_name,
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        tipo: data.tipo
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, data: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Error en el registro');
      }

      // Solo registrar sin hacer login automático - el usuario lo hará después del modal
      // Guardamos el email/password temporalmente para el login automático después
      return { 
        success: true, 
        email: formData.email, 
        password: formData.password,
        data: data 
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    }
  };

  const loginAfterRegister = async (email, password) => {
    return await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      
      if (!refresh) {
        throw new Error('No refresh token');
      }

      const response = await fetch(ENDPOINTS.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      localStorage.setItem('accessToken', data.access);
      return data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const updateUserProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userCode = userData?.user_code;

      if (!userCode || !token) {
        throw new Error('No autorizado');
      }

      const response = await fetch(ENDPOINTS.UPDATE_USER_PROFILE(userCode), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar perfil');
      }

      const updatedData = await response.json();
      
      // Actualizar el usuario en el contexto
      const newUserData = { ...userData, ...profileData };
      updateUser(newUserData);

      return { success: true, data: updatedData };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    loginAfterRegister,
    logout,
    refreshToken,
    updateUser,
    updateUserProfile,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;