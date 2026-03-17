'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    monthly: '€99',
    annual: '€990',
    monthlySub: '/month',
    annualSub: '/year',
    saving: 'Save €198/year',
    description: 'Perfect for solo recruiters getting started with AI screening.',
    features: ['1 recruiter seat', '5 active jobs', 'AI CV scoring', 'Basic pipeline management', 'Candidate portal', 'Email support'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Agency',
    monthly: '€199.99',
    annual: '€1,999',
    monthlySub: '/month',
    annualSub: '/year',
    saving: 'Save ~€401/year',
    description: 'For growing agencies that need full power and team collaboration.',
    features: ['Unlimited recruiter seats', 'Unlimited active jobs', 'AI CV scoring', 'Hidden scoring criteria', 'Full pipeline management', 'Interview scheduling', 'Advanced analytics', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: true,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-8">
            Simple, transparent pricing
          </h2>
          {/* Toggle */}
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${annual ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all ${
                plan.highlight ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-slate-200 shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
              <div className="mb-2">
                <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-slate-500 text-sm ml-1">{annual ? plan.annualSub : plan.monthlySub}</span>
              </div>
              {annual && <p className="text-emerald-600 text-sm font-semibold mb-6">{plan.saving}</p>}
              <Link
                href="/signup"
                className={`block text-center font-semibold py-3 rounded-xl mb-8 transition-colors ${
                  plan.highlight
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                {plan.cta}
              </Link>
              <p className="text-xs text-slate-400 text-center mb-6">No credit card required</p>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
