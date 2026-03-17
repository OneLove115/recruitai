'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setSent(true)
    setLoading(false)
    setCooldown(60)
    const t = setInterval(() => setCooldown((c) => { if (c <= 1) { clearInterval(t); return 0 } return c - 1 }), 1000)
  }

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8">
      {!sent ? (
        <>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-2">Reset your password</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your email and we&apos;ll send you a reset link.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="jane@agency.com" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors">
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-2">Check your inbox</h1>
          <p className="text-sm text-slate-500 mb-6">We sent a reset link to <strong className="text-slate-700">{email}</strong>.</p>
          <button onClick={handleSubmit} disabled={cooldown > 0}
            className="text-sm text-indigo-600 disabled:text-slate-400 disabled:cursor-not-allowed font-medium">
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend link'}
          </button>
        </div>
      )}
      <p className="text-sm text-center text-slate-500 mt-6">
        <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">← Back to sign in</Link>
      </p>
    </div>
  )
}
