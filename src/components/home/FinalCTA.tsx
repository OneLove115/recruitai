import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">
          Ready to hire smarter?
        </h2>
        <p className="text-white/60 text-lg mb-10">
          Join 2,400+ recruitment agencies already using RecruitAI
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95"
        >
          Start Free Trial
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-white/30 text-sm mt-4">No credit card required · 14-day free trial</p>
      </div>
    </section>
  )
}
