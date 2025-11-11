import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2Mentor from "./RegisterStep2Mentor";
import AlertMessage from "./AlertMessage";

const CongratulationsModal = ({
  onSkip,
  onKnowCareer,
  onDontKnowCareer,
  onSelectCareer,
  selectedCareer,
  careerOptions,
  userType,
}) => {
  const [showCareerSelector, setShowCareerSelector] = useState(false);

  const handleSelectCareer = (career) => {
    onSelectCareer(career);
    setShowCareerSelector(false);
  };

  if (userType === "mentor") {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-gradient-to-br from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-6 mt-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-r from-[#378BA4] to-[#036280] p-4 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="text-4xl font-black text-white">
              ¡Bienvenido Mentor!
            </h2>
            <p className="text-xl font-bold bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent">
              Tu cuenta ha sido creada
            </p>
            <p className="text-gray-300 mt-4">
              Estás listo para comenzar a guiar estudiantes
            </p>
          </div>

          <button
            onClick={onSkip}
            className="w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all transform hover:scale-105"
          >
            Ir a mi perfil
          </button>

          <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#378BA4] rounded-full blur-md opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-[#036280] rounded-full blur-md opacity-60"></div>
        </div>
      </div>
    );
  }

  if (showCareerSelector) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-gradient-to-br from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 max-w-md w-full shadow-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setShowCareerSelector(false)}
            className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            atrás
          </button>

          <div className="text-center mb-6 mt-6">
            <h3 className="text-2xl font-black text-white">
              ¿Qué carrera quieres estudiar?
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {careerOptions.map((career) => (
              <button
                key={career}
                onClick={() => handleSelectCareer(career)}
                className={`p-4 bg-white/10 backdrop-blur-xl rounded-lg transition-all text-left font-medium text-sm ${
                  selectedCareer === career
                    ? "border-2 border-white bg-[#378BA4]/20"
                    : "border-2 border-white/20 hover:border-white/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white">{career}</span>
                  {selectedCareer === career && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedCareer && (
            <button
              onClick={() => onKnowCareer(selectedCareer)}
              className="w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
            >
              Confirmar carrera
            </button>
          )}

          <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#378BA4] rounded-full blur-md opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-[#036280] rounded-full blur-md opacity-60"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-[#378BA4]/20 to-[#036280]/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 max-w-md w-full shadow-2xl">
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold group"
        >
          skip
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex justify-center mb-6 mt-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#378BA4] to-[#036280] rounded-full blur-2xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-[#378BA4] to-[#036280] p-4 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-4xl font-black text-white">¡Felicidades!</h2>
          <p className="text-xl font-bold bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent">
            Has creado tu cuenta
          </p>
          <p className="text-gray-300 mt-4">
            Cuéntanos más sobre ti para ayudarte mejor
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowCareerSelector(true)}
            className="w-full py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all transform hover:scale-105"
          >
            Ya sé que quiero estudiar
          </button>
          <button
            onClick={onDontKnowCareer}
            className="w-full py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-bold rounded-xl hover:border-white/50 transition-all transform hover:scale-105"
          >
            No sé que carrera estudiar
          </button>
        </div>

        <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#378BA4] rounded-full blur-md opacity-60"></div>
        <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-[#036280] rounded-full blur-md opacity-60"></div>
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [registeredUserCode, setRegisteredUserCode] = useState("");

  const navigate = useNavigate();
  const { register, login, updateLearnerProfile } = useAuth();

  const careerOptions = [
    "Ingeniería de Sistemas",
    "Medicina",
    "Derecho",
    "Administración",
    "Psicología",
    "Arquitectura",
    "Contabilidad",
    "Enfermería",
    "Marketing",
    "Diseño Gráfico",
    "Educación",
    "Gastronomía",
  ];

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    tipo: "learner",
  });

  const [mentorData, setMentorData] = useState({
    career: "",
    alt_career: "",
    description: "",
    language: "Español",
  });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setSuccessMessage("");
  };

  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (
      !formData.email ||
      !formData.password ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (formData.tipo === "learner") {
      handleSubmit();
    } else {
      setStep(2);
      setError("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const basePayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        tipo: formData.tipo,
      };

      if (formData.tipo === "mentor") {
        if (!mentorData.description) {
          setError("La descripción es obligatoria para mentores");
          setLoading(false);
          return;
        }

        basePayload.language = mentorData.language || "Español";
        basePayload.description = mentorData.description;

        if (mentorData.career === "999") {
          if (!mentorData.alt_career) {
            setError("Por favor especifica tu carrera");
            setLoading(false);
            return;
          }
          basePayload.alt_career = mentorData.alt_career;
        } else if (mentorData.career) {
          basePayload.career = parseInt(mentorData.career);
        } else {
          setError("Por favor selecciona tu carrera");
          setLoading(false);
          return;
        }
      }

      // 1. REGISTRAR usuario
      const result = await register(basePayload);

      if (!result.success) {
        throw new Error(result.error);
      }

      if (!result.user_code) {
        throw new Error("No se recibió user_code del servidor");
      }

      // 2. LOGIN AUTOMÁTICO con las credenciales
      console.log('🔐 Iniciando login automático...');
      const loginResult = await login(formData.email, formData.password);

      if (!loginResult.success) {
        console.error('❌ Error en login automático:', loginResult.error);
        throw new Error(`Error al iniciar sesión: ${loginResult.error}`);
      }

      console.log('✅ Login exitoso:', loginResult.data);
      setLoading(false);
      
      // 3. MOSTRAR MODAL según tipo de usuario
      setShowCongratulations(true);

    } catch (err) {
      console.error("❌ Error en handleSubmit:", err);
      const errorMessage = err.message || "Error desconocido al registrar usuario";
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleKnowCareer = async (career) => {
    try {
      setLoading(true);
      console.log('📚 Guardando career_interests:', career);

      // Actualizar el campo career_interests del modelo Learner
      const updateResult = await updateLearnerProfile({
        career_interests: career,
      });

      if (!updateResult.success) {
        console.error('❌ Error al actualizar career_interests:', updateResult.error);
        throw new Error(updateResult.error);
      }

      console.log('✅ Career interests actualizado correctamente');
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("❌ Error al actualizar career_interests:", err);
      setError("Error al guardar tu preferencia de carrera");
      setLoading(false);
      setShowCongratulations(false); // Cerrar el modal para mostrar el error
    }
  };

  const handleDontKnowCareer = async () => {
    try {
      setLoading(true);
      navigate("/Steps-for-Vocation", { replace: true });
    } catch (err) {
      console.error("Error:", err);
      setError("Error al continuar");
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setLoading(true);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("Error:", err);
      setError("Error al continuar");
      setLoading(false);
    }
  };

  const getCardProps = () => {
    if (step === 1) {
      return {
        title: "Crea tu cuenta",
        subtitle: "en Rumbía",
        badge: "Únete a la comunidad",
      };
    }

    return {
      title: "Completa tu perfil",
      subtitle: "de mentor",
      badge: "Perfil de Mentor",
    };
  };

  const cardProps = getCardProps();

  return (
    <div className="w-full max-w-4xl p-4">
      {showCongratulations && (
        <CongratulationsModal
          onSkip={handleSkip}
          onKnowCareer={handleKnowCareer}
          onDontKnowCareer={handleDontKnowCareer}
          onSelectCareer={setSelectedCareer}
          selectedCareer={selectedCareer}
          careerOptions={careerOptions}
          userType={formData.tipo}
        />
      )}

      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          transform: `perspective(1000px) rotateY(${
            mousePosition.x * 0.2
          }deg) rotateX(${-mousePosition.y * 0.2}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="h-1.5 bg-gradient-to-r from-[#378BA4] via-[#036280] to-[#378BA4] animate-gradient-x sticky top-0 z-10"></div>

          <div className="p-8 md:p-10">
            <div className="text-center mb-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#378BA4]/30 to-[#036280]/30 backdrop-blur-xl rounded-full border border-[#378BA4]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#378BA4]" />
                <span className="text-sm font-bold text-white">
                  {cardProps.badge}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {cardProps.title}
                <span className="block bg-gradient-to-r from-[#378BA4] via-white to-[#378BA4] bg-clip-text text-transparent animate-gradient-x">
                  {cardProps.subtitle}
                </span>
              </h2>
              <p className="text-gray-300 text-sm">
                {step === 1
                  ? "Comienza tu viaje de orientación vocacional"
                  : "Completa tu información"}
              </p>
            </div>

            <AlertMessage type="error" message={error} />
            <AlertMessage type="success" message={successMessage} />

            {step === 1 && (
              <RegisterStep1
                formData={formData}
                onChange={handleChange}
                onNext={handleNextStep}
                loading={loading}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            )}

            {step === 2 && formData.tipo === "mentor" && (
              <RegisterStep2Mentor
                mentorData={mentorData}
                onChange={handleMentorChange}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}

            {step === 1 && (
              <div className="mt-8 text-center">
                <p className="text-gray-300 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[#378BA4] hover:text-white font-bold inline-flex items-center gap-1 group transition-colors"
                  >
                    Inicia sesión
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Datos seguros
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Registro rápido
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#378BA4] rounded-full blur-md opacity-60 animate-float"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#036280] rounded-full blur-md opacity-60 animate-float-reverse"></div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% auto;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float 8s ease-in-out infinite reverse;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;