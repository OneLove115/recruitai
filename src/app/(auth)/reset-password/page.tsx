'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setExpired(false)
    })
  }, [supabase.auth])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      if (error.message.includes('expired')) setExpired(true)
      else setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  if (expired) {
    return (
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8 text-center">
        <p className="text-slate-900 font-semibold mb-2">This link has expired</p>
        <p className="text-sm text-slate-500 mb-6">Reset links expire after 1 hour.</p>
        <Link href="/forgot-password" className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">Request a new one →</Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-2">Set new password</h1>
      <p className="text-sm text-slate-500 mb-8">Choose a strong password for your account.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">New password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Min. 8 characters" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
          <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Repeat password" />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors">
          {loading ? 'Saving…' : 'Set new password'}
        </button>
      </form>
    </div>
  )
}
