import { Brain, EyeOff, Kanban, CalendarCheck, Smartphone, Users } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'AI CV Scoring', body: 'Ranks every applicant in seconds against your criteria. No bias, no fatigue.' },
  { icon: EyeOff, title: 'Hidden Criteria', body: "Private scoring factors candidates can't see or game." },
  { icon: Kanban, title: 'Pipeline Management', body: 'Drag candidates through stages with one click.' },
  { icon: CalendarCheck, title: 'Interview Scheduling', body: 'Calendly-style booking built right in. No back-and-forth.' },
  { icon: Smartphone, title: 'Candidate Portal', body: 'Mobile-friendly application tracker candidates actually love.' },
  { icon: Users, title: 'Team Collaboration', body: 'Notes, tags, and @mentions on every candidate profile.' },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">
            Everything your agency needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="group bg-slate-50 hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-200 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
