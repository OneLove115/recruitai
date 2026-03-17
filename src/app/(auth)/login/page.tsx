'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-slate-900">
          Recruit<span className="text-indigo-600">AI</span>
        </span>
      </div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-1">Welcome back</h1>
      <p className="text-sm text-slate-500 mb-8">Sign in to your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="jane@agency.com" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700">Forgot password?</Link>
          </div>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Your password" />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="text-sm text-center text-slate-500 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign up →</Link>
      </p>
    </div>
  )
}
