const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] flex items-center justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card Skeleton */}
            <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl animate-pulse">
              <div className="w-full aspect-square rounded-xl bg-[#036280]/30 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-[#036280]/30 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-[#036280]/30 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-[#036280]/30 rounded w-2/3 mx-auto"></div>
              </div>
              <div className="mt-4 h-10 bg-[#036280]/30 rounded"></div>
            </div>

            {/* Info Card Skeleton */}
            <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 p-6 shadow-xl animate-pulse">
              <div className="h-4 bg-[#036280]/30 rounded w-1/2 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#036280]/30 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-[#036280]/30 rounded w-1/4"></div>
                      <div className="h-3 bg-[#036280]/30 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-9 space-y-6">
            {/* Tabs Skeleton */}
            <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-xl border border-[#378BA4]/30 shadow-xl overflow-hidden animate-pulse">
              <div className="flex gap-4 p-2 border-b border-[#378BA4]/20">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-[#036280]/30 rounded flex-1"></div>
                ))}
              </div>
              
              {/* Content Area Skeleton */}
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="h-6 bg-[#036280]/30 rounded w-1/4"></div>
                  <div className="h-4 bg-[#036280]/30 rounded w-full"></div>
                  <div className="h-4 bg-[#036280]/30 rounded w-3/4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-32 bg-[#036280]/30 rounded"></div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-[#036280]/30 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-full border border-[#378BA4]/30 px-6 py-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#378BA4] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-sm font-medium">Cargando perfil...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;