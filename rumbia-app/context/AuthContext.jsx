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
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("currentUser");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);

        await verifyToken(token);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token) => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userCode = userData?.user_code;

      if (!userCode) return;

      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token inválido");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Error al iniciar sesión"
        );
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      try {
        const userInfoResponse = await fetch(
          ENDPOINTS.GET_USER_INFO(data.user_code),
          {
            headers: {
              Authorization: `Bearer ${data.access}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (userInfoResponse.ok) {
          const fullUserData = await userInfoResponse.json();

          const userData = {
            user_code: data.user_code,
            email: fullUserData.email || data.email || email,
            first_name: fullUserData.first_name || data.first_name || "",
            last_name: fullUserData.last_name || data.last_name || "",
            name: `${fullUserData.first_name || ""} ${
              fullUserData.last_name || ""
            }`.trim(),
            tipo: data.tipo,
            profile_picture: fullUserData.profile_picture || null,
          };

          localStorage.setItem("currentUser", JSON.stringify(userData));
          setUser(userData);
          setIsAuthenticated(true);

          return { success: true, data: userData };
        }
      } catch (err) {
        console.error("Error obteniendo info completa:", err);
      }

      const userData = {
        user_code: data.user_code,
        email: data.email || email,
        first_name: data.first_name,
        last_name: data.last_name,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        tipo: data.tipo,
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, data: userData };
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

  const loginAfterRegister = async (userCode) => {
    try {
      const response = await fetch(ENDPOINTS.GET_USER_INFO(userCode), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener información del usuario");
      }

      const userData = await response.json();

      const userInfo = {
        user_code: userCode,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
        tipo: userData.tipo,
      };

      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);

      return { success: true, data: userInfo };
    } catch (error) {
      console.error("Error en loginAfterRegister:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");

      if (!refresh) {
        throw new Error("No refresh token");
      }

      const response = await fetch(ENDPOINTS.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      localStorage.setItem("accessToken", data.access);
      return data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };

  const updateLearnerProfile = async (profileData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userCode = userData?.user_code;

      if (!userCode) {
        throw new Error("No se encontró el user_code");
      }

      const response = await fetch(ENDPOINTS.POST_LEARNER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...profileData,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar perfil de learner");
      }

      const updatedData = await response.json();
      return { success: true, data: updatedData };
    } catch (error) {
      console.error("Error updating learner profile:", error);
      return { success: false, error: error.message };
    }
  };

  const convertLearnerToMentor = async (mentorData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userCode = userData?.user_code;

      if (!userCode) {
        throw new Error("No se encontró el user_code");
      }

      const response = await fetch(ENDPOINTS.LEARNER_TO_MENTOR, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...mentorData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al convertir a mentor");
      }

      // Actualizar el tipo de usuario en localStorage
      const updatedUser = { ...userData, tipo: "mentor" };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, data };
    } catch (error) {
      console.error("Error converting to mentor:", error);
      return { success: false, error: error.message };
    }
  };

  const updateMentorProfile = async (profileData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userCode = userData?.user_code;

      if (!userCode) {
        throw new Error("No se encontró el user_code");
      }

      const response = await fetch(ENDPOINTS.POST_MENTOR, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...profileData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error al actualizar perfil de mentor"
        );
      }

      const updatedData = await response.json();
      return { success: true, data: updatedData };
    } catch (error) {
      console.error("Error updating mentor profile:", error);
      return { success: false, error: error.message };
    }
  };

  const createSession = async (sessionData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userCode = userData?.user_code;

      if (!userCode) {
        throw new Error("No se encontró el user_code");
      }

      const response = await fetch(ENDPOINTS.CREATE_SESSION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_code: userCode,
          ...sessionData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear sesión");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error creating session:", error);
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
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener sesiones");
    }

    const data = await response.json();
    
    // El API devuelve { count, filters_applied, results }
    // Devolvemos los results directamente
    return { 
      success: true, 
      data: data.results || data, // Si tiene results, lo usa, sino usa data directamente
      count: data.count,
      filters: data.filters_applied
    };
  } catch (error) {
    console.error("Error getting sessions:", error);
    return { success: false, error: error.message };
  }
};

  const getCareers = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_CAREERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener carreras");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error getting careers:", error);
      return { success: false, error: error.message };
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_CATEGORIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error getting categories:", error);
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
    updateLearnerProfile,
    checkAuth,
    convertLearnerToMentor,
    updateMentorProfile,
    createSession,
    getSessions,
    getCareers,
    getCategories,
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
