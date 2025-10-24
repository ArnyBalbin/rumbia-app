export const API_BASE_URL = 'https://api-rumbia.onrender.com/api'

export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/register/`,
  LOGIN: `${API_BASE_URL}/login/`,
  REFRESH: `${API_BASE_URL}/refresh/`,
  GET_USER_INFO: (pk) => `${API_BASE_URL}/get-user-info/${pk}/`,
  LEARNER_TO_MENTOR: `${API_BASE_URL}/learner-to-mentor/`,
  POST_LEARNER: `${API_BASE_URL}/post-learner/`,
  POST_MENTOR: `${API_BASE_URL}/post-mentor/`,
  CREATE_SESSION: `${API_BASE_URL}/create-session/`
}
