export default function TrustedBy() {
  const agencies = [
    { name: "TalentBridge", tagline: "Global Staffing" },
    { name: "PeakRecruit", tagline: "Tech Specialists" },
    { name: "Nexus Talent", tagline: "Executive Search" },
    { name: "VantageHR", tagline: "Healthcare & Life Sciences" },
    { name: "Elevate Search", tagline: "Finance & Legal" },
    { name: "ClearPath Staffing", tagline: "Engineering" },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by 2,400+ recruitment professionals worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {agencies.map((agency) => (
            <div
              key={agency.name}
              className="flex flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity"
            >
              {/* Stylized logo placeholder */}
              <div className="w-full h-10 flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">
                      {agency.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
                    {agency.name}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center leading-tight">
                {agency.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
