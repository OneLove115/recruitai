const STEPS = [
  {
    n: '01',
    title: 'Post a job',
    body: "Write your requirements and set hidden scoring criteria. Candidates never see these — so they can't game the system.",
  },
  {
    n: '02',
    title: 'AI scores applicants',
    body: 'Every CV is ranked the moment it arrives. Your top 10 candidates are surfaced instantly.',
  },
  {
    n: '03',
    title: 'Hire with confidence',
    body: 'Move candidates through your pipeline, schedule interviews, and make the offer — all in one place.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
            From job post to hire in 3 steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-indigo-500/30" />
          {STEPS.map((step) => (
            <div key={step.n} className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-indigo-400">{step.n}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
