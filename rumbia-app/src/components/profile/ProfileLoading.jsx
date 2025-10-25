const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2136] to-[#0a1929] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#378BA4]/30 border-t-[#378BA4] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-semibold">Cargando perfil...</p>
      </div>
    </div>
  );
};

export default ProfileLoading;