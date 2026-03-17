import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, CheckCircle2, Zap, Users } from 'lucide-react'

const MOCK_CANDIDATES = [
  { initials: 'SC', name: 'Sarah Chen', sub: 'Ex-Google · 8yr exp', score: 97, color: 'from-violet-500 to-indigo-600' },
  { initials: 'MR', name: 'Marcus Reid', sub: 'Ex-Meta · 6yr exp', score: 91, color: 'from-blue-500 to-indigo-600' },
  { initials: 'PS', name: 'Priya Sharma', sub: 'Ex-Stripe · 5yr exp', score: 88, color: 'from-pink-500 to-violet-600' },
  { initials: 'JL', name: 'James Liu', sub: 'Ex-Airbnb · 4yr exp', score: 83, color: 'from-amber-500 to-orange-600' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              </span>
              <span className="text-sm font-medium text-indigo-300">AI-Powered Recruitment · Now in v2.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold font-[family-name:var(--font-heading)] text-white leading-[1.08] tracking-tight mb-6">
              Stop drowning<br />in CVs.{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Let AI surface
              </span>{' '}
              your top candidates instantly
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              RecruitAI scores every applicant against your hidden criteria, ranks them by fit, and manages your entire pipeline — so you focus on people, not paperwork.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-base px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center gap-3 text-white/70 font-semibold text-base hover:text-white transition-colors">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-white/15 transition-colors">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </span>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['bg-indigo-400','bg-violet-400','bg-pink-400','bg-blue-400','bg-teal-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1e1b4b] flex items-center justify-center text-white text-xs font-bold`}>
                    {String.fromCharCode(65+i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50">
                <span className="text-white font-semibold">4.9/5</span> from 800+ recruiters
              </p>
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div className="relative">
            {/* Floating pills */}
            <div className="absolute -left-8 top-12 z-10 animate-float">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <p className="text-xs text-white/50">AI processed</p>
                  <p className="text-sm font-bold text-white">127 CVs in 4.2s</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-20 z-10 animate-float" style={{ animationDelay: '1.2s' }}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50">This week</p>
                  <p className="text-sm font-bold text-white">+24 hires</p>
                </div>
              </div>
            </div>

            {/* Browser frame */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              {/* Chrome bar */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-3 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  app.recruitai.io/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-slate-900 flex" style={{ minHeight: 320 }}>
                {/* Sidebar */}
                <aside className="w-14 bg-slate-950 flex flex-col items-center py-4 gap-4 border-r border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-indigo-500/20' : 'bg-slate-800'}`}>
                      <div className={`w-3.5 h-3.5 rounded-sm ${i === 0 ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                    </div>
                  ))}
                </aside>

                {/* Main content */}
                <div className="flex-1 p-5 overflow-hidden">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Active Jobs', value: '8', icon: Users, color: 'text-indigo-400' },
                      { label: 'Applicants', value: '342', icon: Users, color: 'text-violet-400' },
                      { label: 'Shortlisted', value: '24', icon: CheckCircle2, color: 'text-emerald-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <p className="text-lg font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Candidate list */}
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-semibold text-slate-300">Top Candidates — Senior Frontend Eng.</p>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>
                    <div className="space-y-2">
                      {MOCK_CANDIDATES.map((c) => (
                        <div key={c.initials} className="flex items-center gap-3 bg-slate-900/60 rounded-lg px-3 py-2">
                          <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {c.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{c.sub}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-bold text-indigo-400">{c.score}</span>
                            <div className="w-14 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                style={{ width: `${c.score}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { value: '10x', label: 'Faster hiring' },
            { value: '94%', label: 'Match accuracy' },
            { value: '2,400+', label: 'Recruiters' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
