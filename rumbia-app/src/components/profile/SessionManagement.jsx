import { useState, useEffect } from "react";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  TrendingUp,
  AlertCircle,
  BookOpen,
  DollarSign,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Video,
  Upload,
  Link as LinkIcon,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const SessionManagement = ({ userData }) => {
  const {
    createSession,
    updateSession,
    getSessions,
    getCareers,
    getCategories,
  } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const blockCreation = true;

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    session_notes: "",
    career_id: "",
    schedule_date: "",
    duration_minutes: 60,
    meeting_platform: "Zoom",
    meeting_url: "",
    price: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Recording upload state
  const [uploadingRecording, setUploadingRecording] = useState({});
  const [recordingUrls, setRecordingUrls] = useState({});
  const [recordingError, setRecordingError] = useState("");

  useEffect(() => {
    if (userData?.user_code) {
      loadInitialData();
    }
  }, [userData?.user_code]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [sessionsRes, careersRes, categoriesRes] = await Promise.all([
        getSessions(),
        getCareers(),
        getCategories(),
      ]);

      if (sessionsRes.success) {
        const responseData = sessionsRes.data;
        const allSessions = Array.isArray(responseData.results)
          ? responseData.results
          : Array.isArray(responseData)
          ? responseData
          : [];

        const userSessions = allSessions.filter(
          (session) =>
            session.mentor?.user?.user_code === userData.user_code ||
            session.mentor?.user_code === userData.user_code ||
            session.user_code === userData.user_code
        );

        setSessions(userSessions);
        console.log("Sesiones cargadas:", userSessions);
      } else {
        setSessions([]);
      }

      if (careersRes.success) {
        setCareers(careersRes.data);
      }
      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Error al cargar los datos");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const validateForm = () => {
    if (!formData.topic.trim()) {
      setFormError("El tema es obligatorio");
      return false;
    }
    if (!formData.career_id) {
      setFormError("Debes seleccionar una carrera");
      return false;
    }
    if (!formData.schedule_date) {
      setFormError("La fecha de la sesión es obligatoria");
      return false;
    }
    if (!formData.duration_minutes || formData.duration_minutes < 30) {
      setFormError("La duración debe ser mínimo 30 minutos");
      return false;
    }
    if (!formData.price) {
      setFormError("El precio es obligatorio");
      return false;
    }
    if (!formData.meeting_url.trim()) {
      setFormError("El enlace de la reunión es obligatorio");
      return false;
    }
    try {
      new URL(formData.meeting_url);
    } catch {
      setFormError("Por favor ingresa una URL válida para la reunión");
      return false;
    }
    return true;
  };

  const getFinishedSessionsWithoutRecording = () => {
    return sessions.filter(
      (s) => (s.session_status === "finished" || s.endedAt) && !s.recording_url
    );
  };

  const canCreateNewSession = () => {
    return getFinishedSessionsWithoutRecording().length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canCreateNewSession()) {
      setFormError(
        "Debes subir las grabaciones de sesiones finalizadas antes de crear una nueva"
      );
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const result = await createSession(formData);

      if (result.success) {
        const newSession = {
          ...result.data,
          user_code: userData.user_code,
        };
        setSessions((prev) => [newSession, ...prev]);
        setShowForm(false);
        resetForm();
        await loadInitialData();
      } else {
        setFormError(result.error || "Error al crear la sesión");
      }
    } catch (err) {
      setFormError("Error al crear la sesión");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadRecording = async (sessionCode) => {
    const url = recordingUrls[sessionCode];

    if (!url || !url.trim()) {
      setRecordingError("Por favor ingresa la URL de la grabación");
      return;
    }

    try {
      new URL(url);
    } catch {
      setRecordingError("Por favor ingresa una URL válida");
      return;
    }

    setUploadingRecording((prev) => ({ ...prev, [sessionCode]: true }));
    setRecordingError("");

    try {
      const result = await updateSession(sessionCode, { recording_url: url });

      if (result.success) {
        setSessions((prev) =>
          prev.map((s) =>
            s.session_code === sessionCode ? { ...s, recording_url: url } : s
          )
        );
        setRecordingUrls((prev) => {
          const newUrls = { ...prev };
          delete newUrls[sessionCode];
          return newUrls;
        });
      } else {
        setRecordingError(result.error || "Error al subir la grabación");
      }
    } catch (err) {
      setRecordingError("Error al subir la grabación");
      console.error(err);
    } finally {
      setUploadingRecording((prev) => ({ ...prev, [sessionCode]: false }));
    }
  };

  const resetForm = () => {
    setFormData({
      topic: "",
      session_notes: "",
      career_id: "",
      schedule_date: "",
      duration_minutes: 60,
      meeting_platform: "Zoom",
      meeting_url: "",
      price: "",
    });
    setFormError("");
  };

  const getCareerName = (careerId) => {
    const career = careers.find((c) => c.id_career === parseInt(careerId));
    return career ? career.name_career : "Sin carrera";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingRecordings = getFinishedSessionsWithoutRecording();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#378BA4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Gestión de Sesiones
          </h2>
          <p className="text-gray-400">
            Crea y administra tus sesiones de orientación
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadInitialData}
            disabled={loading}
            className="flex items-center gap-2 bg-[#036280]/50 hover:bg-[#036280] text-white px-4 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl border border-[#378BA4]/30"
            title="Recargar sesiones"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={blockCreation && !canCreateNewSession()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#378BA4] to-[#036280] hover:from-[#036280] hover:to-[#012E4A] text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            title={
              !canCreateNewSession() ? "Debes subir grabaciones pendientes" : ""
            }
          >
            {showForm ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Ocultar Formulario
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Nueva Sesión
              </>
            )}
          </button>
        </div>
      </div>

      {/* Banner de advertencia - Grabaciones pendientes */}
      {pendingRecordings.length > 0 && (
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Video className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-400 mb-2">
                Grabaciones pendientes
              </h3>
              <p className="text-amber-200 mb-3">
                Tienes {pendingRecordings.length} sesión(es) finalizada(s) sin
                grabación.
                {blockCreation &&
                  " No podrás crear nuevas sesiones hasta subirlas."}
              </p>
              <div className="flex flex-wrap gap-2">
                {pendingRecordings.map((s) => (
                  <span
                    key={s.session_code}
                    className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm border border-amber-500/30"
                  >
                    {s.topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error global */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Formulario expandible */}
      {showForm && (
        <div className="bg-[#036280]/30 backdrop-blur-sm rounded-xl border border-[#378BA4]/30 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {formError}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Tema de la sesión *
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Ej: Desarrollo Web con Django"
                className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Notas de la sesión
              </label>
              <textarea
                name="session_notes"
                value={formData.session_notes}
                onChange={handleInputChange}
                placeholder="Describe el contenido y objetivos de la sesión"
                rows="3"
                className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Carrera *
              </label>
              <select
                name="career_id"
                value={formData.career_id}
                onChange={handleInputChange}
                className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white focus:border-[#378BA4] focus:outline-none transition-all"
              >
                <option value="">Seleccionar carrera</option>
                {careers.map((career) => (
                  <option key={career.id_career} value={career.id_career}>
                    {career.name_career}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Fecha y hora *
                </label>
                <input
                  type="datetime-local"
                  name="schedule_date"
                  value={formData.schedule_date}
                  onChange={handleInputChange}
                  className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white focus:border-[#378BA4] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Duración (minutos) *
                </label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleInputChange}
                  min="30"
                  step="15"
                  className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white focus:border-[#378BA4] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Plataforma
                </label>
                <select
                  name="meeting_platform"
                  value={formData.meeting_platform}
                  onChange={handleInputChange}
                  className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white focus:border-[#378BA4] focus:outline-none transition-all"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Webex">Webex</option>
                  <option value="YouTube Live">YouTube Live</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Precio (S/.) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Enlace de la reunión *
                </div>
              </label>
              <input
                type="url"
                name="meeting_url"
                value={formData.meeting_url}
                onChange={handleInputChange}
                placeholder="https://zoom.us/j/123456789 o https://meet.google.com/xyz-abc-def"
                className="w-full bg-[#012E4A]/50 border border-[#378BA4]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#378BA4] focus:outline-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-2">
                Puedes usar Zoom, Google Meet, Teams, Webex, YouTube, Google
                Drive o cualquier plataforma
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="flex-1 px-6 py-3 border border-[#378BA4]/30 text-gray-300 rounded-lg hover:bg-[#036280]/30 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={
                  submitting || (blockCreation && !canCreateNewSession())
                }
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white rounded-lg hover:from-[#036280] hover:to-[#012E4A] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg font-semibold"
              >
                {submitting ? "Creando..." : "Crear Sesión"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions list */}
      {sessions.length === 0 && !showForm ? (
        <div className="relative py-16 px-8 rounded-xl border-2 border-dashed border-[#378BA4]/30 bg-[#036280]/10">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-br from-[#378BA4]/20 to-[#036280]/20 p-6 rounded-full">
                <TrendingUp className="w-12 h-12 text-[#378BA4]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Sin sesiones activas
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Crea tu primera sesión de orientación y comienza a ayudar a otros
              estudiantes
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#378BA4] hover:bg-[#036280] text-white px-6 py-3 rounded-lg transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Crear sesión
            </button>
          </div>
        </div>
      ) : sessions.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Sesiones creadas</h3>
          <div className="grid gap-4">
            {sessions.map((session) => {
              const isFinished =
                session.session_status === "finished" || session.endedAt;
              const needsRecording = isFinished && !session.recording_url;

              return (
                <div
                  key={session.session_code || session.id}
                  className={`bg-[#036280]/30 backdrop-blur-sm rounded-xl border ${
                    needsRecording
                      ? "border-amber-500/50"
                      : "border-[#378BA4]/20"
                  } p-6 hover:border-[#378BA4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#378BA4]/10`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {session.topic}
                      </h3>
                      {session.session_notes && (
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {session.session_notes}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 ${
                        isFinished
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-[#378BA4]/20 text-[#378BA4] border-[#378BA4]/30"
                      } rounded-full text-xs font-semibold border whitespace-nowrap ml-4`}
                    >
                      {isFinished
                        ? "Finalizada"
                        : session.session_status || "Programada"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#378BA4]/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#378BA4]/20 rounded-lg">
                        <BookOpen className="w-4 h-4 text-[#378BA4]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Carrera</p>
                        <p className="text-sm font-semibold text-white truncate">
                          {getCareerName(
                            session.career_id ||
                              session.mentor?.career?.id_career
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#378BA4]/20 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#378BA4]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Fecha</p>
                        <p className="text-sm font-semibold text-white">
                          {formatDate(session.schedule_date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#378BA4]/20 rounded-lg">
                        <Clock className="w-4 h-4 text-[#378BA4]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Duración</p>
                        <p className="text-sm font-semibold text-white">
                          {session.duration_minutes} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#378BA4]/20 rounded-lg">
                        <DollarSign className="w-4 h-4 text-[#378BA4]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Precio</p>
                        <p className="text-sm font-semibold text-white">
                          S/. {session.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meeting URL */}
                  {session.meeting_url && (
                    <div className="mt-4 pt-4 border-t border-[#378BA4]/20">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">
                            <span className="font-semibold text-white">
                              {session.meeting_platform}
                            </span>
                          </span>
                        </div>
                        <a
                          href={session.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#378BA4]/20 hover:bg-[#378BA4]/30 text-[#378BA4] rounded-lg transition-all text-sm font-semibold border border-[#378BA4]/30"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Abrir enlace
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Recording section */}
                  {isFinished && (
                    <div className="mt-4 pt-4 border-t border-[#378BA4]/20">
                      {session.recording_url ? (
                        <div className="flex items-center justify-between gap-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-green-400">
                                Grabación subida
                              </p>
                              <p className="text-xs text-gray-400">
                                La sesión tiene grabación disponible
                              </p>
                            </div>
                          </div>
                          <a
                            href={session.recording_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all text-sm font-semibold border border-green-500/30"
                          >
                            <Video className="w-4 h-4" />
                            Ver grabación
                          </a>
                        </div>
                      ) : (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-amber-500/20 rounded-lg">
                              <Upload className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-amber-400 mb-1">
                                Grabación pendiente
                              </p>
                              <p className="text-xs text-amber-200">
                                Por favor sube el enlace de la grabación de esta
                                sesión finalizada
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {recordingError &&
                              uploadingRecording === session.session_code && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                  {recordingError}
                                </div>
                              )}

                            <div className="flex gap-3">
                              <input
                                type="url"
                                placeholder="https://drive.google.com/... o https://youtube.com/..."
                                value={
                                  uploadingRecording === session.session_code
                                    ? recordingUrl
                                    : ""
                                }
                                onChange={(e) => {
                                  setRecordingUrl(e.target.value);
                                  setRecordingError("");
                                }}
                                onFocus={() =>
                                  setUploadingRecording(session.session_code)
                                }
                                className="flex-1 bg-[#012E4A]/50 border border-amber-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none text-sm transition-all"
                              />
                              <button
                                onClick={() =>
                                  handleUploadRecording(session.session_code)
                                }
                                disabled={
                                  uploadingRecording === session.session_code &&
                                  !recordingUrl.trim()
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                              >
                                <Upload className="w-4 h-4" />
                                Subir
                              </button>
                            </div>

                            <p className="text-xs text-gray-400">
                              Acepta enlaces de YouTube, Google Drive, Vimeo,
                              Loom, u otra plataforma de video
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SessionManagement;
