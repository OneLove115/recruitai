'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'How does AI CV scoring work?', a: 'You define scoring criteria when creating a job (including hidden criteria candidates never see). RecruitAI analyzes each CV against those criteria and assigns a score from 0–100.' },
  { q: 'What are hidden scoring criteria?', a: 'Private factors only you can see — like "must have worked at a startup" or "minimum 5 years experience" — that influence the AI score without appearing on the public job listing.' },
  { q: 'Can candidates see their scores?', a: 'No. Candidates only see their application status (Applied, Under Review, Shortlisted, etc.), not their score or your criteria.' },
  { q: 'How does the free trial work?', a: 'You get full access to all Agency features for 14 days — no credit card required. At the end of your trial, choose a plan or your account moves to a read-only state.' },
  { q: 'Can I invite my team?', a: 'Yes. You can invite unlimited team members on the Agency plan with Admin, Recruiter, or Viewer roles.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">Common questions</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {open === i && (
                <p className="pb-5 text-slate-500 leading-relaxed text-sm">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
