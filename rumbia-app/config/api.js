export const API_BASE_URL = 'https://api-rumbia.onrender.com/api';

export const ENDPOINTS = {
  // Autenticación
  REGISTER: `${API_BASE_URL}/register/`,                // POST → registrar nuevo usuario
  LOGIN: `${API_BASE_URL}/login/`,                      // POST → iniciar sesión
  REFRESH: `${API_BASE_URL}/refresh/`,                  // POST → refrescar token JWT

  // Usuarios
  GET_USER_INFO: (pk) => `${API_BASE_URL}/get-user-info/${pk}/`,  // GET → obtener datos del usuario por ID
  LEARNER_TO_MENTOR: `${API_BASE_URL}/learner-to-mentor/`,         // POST → promover learner a mentor
  
  // Información de perfiles
  POST_LEARNER: `${API_BASE_URL}/post-learner/`,       // POST → registrar o actualizar info de learner
  POST_MENTOR: `${API_BASE_URL}/post-mentor/`,         // POST → registrar o actualizar info de mentor

  // Sesiones
  CREATE_SESSION: `${API_BASE_URL}/create-session/`,   // POST → crear nueva sesión
  GET_SESSIONS: `${API_BASE_URL}/get-sessions/`,       // GET → listar sesiones activas con filtros dinámicos
};
