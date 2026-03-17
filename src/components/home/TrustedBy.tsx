const LOGOS = ['TechCorp', 'StaffPro', 'HireBase', 'RecruitX', 'TalentFlow', 'PeopleAI']

export default function TrustedBy() {
  return (
    <section className="bg-white py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by recruitment agencies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="h-8 px-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm font-semibold tracking-wide"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
