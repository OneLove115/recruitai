import { Inbox, Search, Clock } from 'lucide-react'

const PROBLEMS = [
  {
    icon: Inbox,
    color: 'text-red-500',
    bg: 'bg-red-50',
    title: "You're buried in CVs",
    body: 'Recruiters spend 23 hours/week manually screening. Most great candidates never get read.',
  },
  {
    icon: Search,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'You miss hidden gems',
    body: "Your screening criteria overlooks non-obvious fits. The best candidate on paper isn't always the best hire.",
  },
  {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: 'Slow hiring costs you',
    body: 'Top candidates accept offers in 10 days. Manual pipelines take 3× longer.',
  },
]

export default function ProblemAgitation() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">
            Hiring is broken. Here&apos;s why.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {PROBLEMS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed">{p.body}</p>
              </div>
            )
          })}
        </div>
        <p className="text-center text-lg font-semibold text-indigo-600">
          RecruitAI solves all three. ↓
        </p>
      </div>
    </section>
  )
}
