import { createContext, useContext, useState, useEffect } from "react";
import { ENDPOINTS } from "../config/api";

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
      const storedUser = localStorage.getItem("currentUser");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setIsAuthenticated(true);

      if (parsedUser.user_code) {
        await verifySessionWithBackend(parsedUser.user_code);
      }
    } catch (error) {
      console.error("Error restaurando sesión:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const verifySessionWithBackend = async (userCode) => {
    try {
      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          logout();
        }
      } else {
        const userData = await response.json();
        setUser((prev) => ({ ...prev, ...userData }));
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Error al iniciar sesión"
        );
      }
      try {
        const userInfoResponse = await fetch(
          ENDPOINTS.GET_USER_INFO(data.user_code),
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (userInfoResponse.ok) {
          const fullUserData = await userInfoResponse.json();

          let profilePic = null;
          if (fullUserData.mentor && fullUserData.mentor.profile_img) {
            profilePic = fullUserData.mentor.profile_img;
          }

          const userData = {
            user_code: data.user_code,
            email: fullUserData.email || data.email || email,
            first_name: fullUserData.first_name || "",
            last_name: fullUserData.last_name || "",
            name: `${fullUserData.first_name || ""} ${
              fullUserData.last_name || ""
            }`.trim(),
            tipo: data.tipo,
            profile_picture: profilePic,
            mentor: fullUserData.mentor,
            learner: fullUserData.learner,
          };

          localStorage.setItem("currentUser", JSON.stringify(userData));

          setUser(userData);
          setIsAuthenticated(true);
          return { success: true, data: userData };
        }
      } catch (err) {
        console.error("Error obteniendo info completa:", err);
      }

      const basicUser = { ...data, email };
      localStorage.setItem("currentUser", JSON.stringify(basicUser));
      setUser(basicUser);
      setIsAuthenticated(true);
      return { success: true, data: basicUser };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Error en el registro");
      }

      return {
        success: true,
        user_code: data.user_code,
        email: formData.email,
        password: formData.password,
        data: data,
      };
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(ENDPOINTS.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const updateLearnerProfile = async (profileData) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró el user_code");

      const response = await fetch(ENDPOINTS.POST_LEARNER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_code: user.user_code, ...profileData }),
      });

      if (!response.ok) throw new Error("Error al actualizar perfil");
      const updatedData = await response.json();
      const newUserState = {
        ...user,
        learner: { ...user.learner, ...updatedData },
      };
      setUser(newUserState);
      localStorage.setItem("currentUser", JSON.stringify(newUserState));

      return { success: true, data: updatedData };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const convertLearnerToMentor = async (mentorData) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró el user_code");

      const response = await fetch(ENDPOINTS.LEARNER_TO_MENTOR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_code: user.user_code, ...mentorData }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al convertir");

      const updatedUser = { ...user, tipo: "mentor" };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const updateMentorProfile = async (profileData) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró el user_code");

      const response = await fetch(ENDPOINTS.POST_MENTOR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_code: user.user_code, ...profileData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar");
      }
      const updatedData = await response.json();

      setUser((prev) => ({
        ...prev,
        mentor: { ...prev.mentor, ...updatedData },
      }));

      return { success: true, data: updatedData };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const createSession = async (sessionData) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró el user_code");

      const response = await fetch(ENDPOINTS.CREATE_SESSION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_code: user.user_code, ...sessionData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear sesión");
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const updateSession = async (sessionUuid, updateData) => {
    try {
      const response = await fetch(ENDPOINTS.UPDATE_SESSION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          uuid: sessionUuid,
          ...updateData,
        }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Error al actualizar sesión");

      return { success: true, data };
    } catch (error) {
      console.error("Error updating session:", error);
      return { success: false, error: error.message };
    }
  };

  const getSessions = async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.session_status)
        params.append("session_status", filters.session_status);
      if (filters.career_id) params.append("career_id", filters.career_id);
      if (filters.category_id)
        params.append("category_id", filters.category_id);
      if (filters.start_date) params.append("start_date", filters.start_date);
      if (filters.end_date) params.append("end_date", filters.end_date);

      const url = `${ENDPOINTS.GET_SESSIONS}${
        params.toString() ? "?" + params.toString() : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al obtener sesiones");
      const data = await response.json();
      return {
        success: true,
        data: data.results || data,
        count: data.count,
        filters: data.filters_applied,
      };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const getCareers = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_CAREERS, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al obtener carreras");
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_CATEGORIES, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al obtener categorías");
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const uploadMentorImage = async (imageFile) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró user_code");
      if (!imageFile) throw new Error("No hay imagen");

      const formData = new FormData();
      formData.append("user_code", user.user_code);
      formData.append("profile_img", imageFile);

      const response = await fetch(ENDPOINTS.POST_MENTOR_IMAGE, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al subir imagen");
      }

      const data = await response.json();
      const updatedUser = {
        ...user,
        mentor: { ...user.mentor, profile_img: data.path },
      };
      setUser(updatedUser);
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const getSessionInfo = async (sessionCode) => {
    try {
      const response = await fetch(ENDPOINTS.GET_SESSION_INFO(sessionCode), {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al obtener info sesión");
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const inscribeLearner = async (sessionCode) => {
    try {
      if (!user?.user_code) throw new Error("No se encontró user_code");

      const response = await fetch(ENDPOINTS.INSCRIBE_LEARNER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user_code: user.user_code,
          uuid: sessionCode,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al inscribirse");
      return { success: true, data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
    updateLearnerProfile,
    checkAuth,
    convertLearnerToMentor,
    updateMentorProfile,
    createSession,
    getSessions,
    getCareers,
    getCategories,
    updateSession,
    uploadMentorImage,
    getSessionInfo,
    inscribeLearner,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export default AuthContext;
