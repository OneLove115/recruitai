'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap } from 'lucide-react'

const CANDIDATES = [
  { initials: 'SC', name: 'Sarah Chen', sub: 'Ex-Google · 8yr', score: 97, color: 'bg-violet-100 text-violet-700' },
  { initials: 'MR', name: 'Marcus Reid', sub: 'Ex-Meta · 6yr', score: 91, color: 'bg-blue-100 text-blue-700' },
  { initials: 'PS', name: 'Priya Sharma', sub: 'Ex-Stripe · 5yr', score: 88, color: 'bg-pink-100 text-pink-700' },
  { initials: 'JL', name: 'James Liu', sub: 'Ex-Airbnb · 4yr', score: 83, color: 'bg-amber-100 text-amber-700' },
  { initials: 'AM', name: 'Ana Martinez', sub: 'Ex-Shopify · 3yr', score: 76, color: 'bg-teal-100 text-teal-700' },
]

export default function AIScoringDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">AI Scoring</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-4">
            Watch AI rank 127 CVs in 4 seconds
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Hidden criteria means candidates can&apos;t reverse-engineer your scoring. Fair, consistent, defensible.
          </p>
        </div>

        <div ref={ref} className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Senior Frontend Engineer</p>
              <p className="text-xs text-slate-500">127 applicants · AI scored</p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {CANDIDATES.map((c, i) => (
              <div
                key={c.initials}
                className={`flex items-center gap-4 p-4 rounded-xl bg-slate-50 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.sub}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: visible ? `${c.score}%` : '0%',
                        transitionDelay: `${i * 120 + 200}ms`,
                      }}
                    />
                  </div>
                  <span className="text-lg font-bold text-slate-900 w-8 text-right">{c.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
