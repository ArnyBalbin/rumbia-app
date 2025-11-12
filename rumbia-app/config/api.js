export const API_BASE_URL = 'https://api-rumbia.onrender.com/api';

export const ENDPOINTS = {
  // 🔐 Autenticación
  REGISTER: `${API_BASE_URL}/register/`,                 // POST → Registrar nuevo usuario
  LOGIN: `${API_BASE_URL}/login/`,                       // POST → Iniciar sesión y obtener tokens
  REFRESH: `${API_BASE_URL}/refresh/`,                   // POST → Refrescar token JWT

  // 👤 Usuario
  GET_USER_INFO: (pk) => `${API_BASE_URL}/get-user-info/${pk}/`,  // GET → Obtener datos del usuario por ID
  LEARNER_TO_MENTOR: `${API_BASE_URL}/learner-to-mentor/`,        // POST → Promover learner a mentor

  // 📘 Información de perfiles
  POST_LEARNER: `${API_BASE_URL}/post-learner/`,        // POST → Registrar o actualizar info de learner
  POST_MENTOR: `${API_BASE_URL}/post-mentor/`,          // POST → Registrar o actualizar info de mentor
  POST_MENTOR_IMAGE: `${API_BASE_URL}/post-mentor-image/`, // POST → Subir imagen de perfil del mentor

  // 🗓️ Sesiones
  CREATE_SESSION: `${API_BASE_URL}/create-session/`,    // POST → Crear una nueva sesión
  GET_SESSIONS: `${API_BASE_URL}/get-sessions/`,        // GET → Listar sesiones activas con filtros dinámicos

  // 🎓 Datos de referencia
  GET_CAREERS: `${API_BASE_URL}/get-careers/`,          // GET → Listar carreras disponibles
  GET_CATEGORIES: `${API_BASE_URL}/get-categories/`,    // GET → Listar categorías de carreras
};
