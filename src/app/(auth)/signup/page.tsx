'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', company: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const passwordStrength = (p: string) => {
    if (p.length === 0) return 0
    if (p.length < 6) return 1
    if (p.length < 10 || !/[0-9]/.test(p)) return 2
    return 3
  }
  const strength = passwordStrength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong']
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500']

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.fullName, company_name: form.company },
          emailRedirectTo: undefined,
        },
      })
      if (error) throw error
      sessionStorage.setItem('recruitai_verify_email', form.email)
      router.push('/verify-email')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
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

      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-1">Create your account</h1>
      <p className="text-sm text-slate-500 mb-8">Start your 14-day free trial. No credit card required.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input
            type="text" required autoComplete="name"
            value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Work email</label>
          <input
            type="email" required autoComplete="email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="jane@agency.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Min. 8 characters"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3].map((n) => (
                  <div key={n} className={`h-1 flex-1 rounded-full transition-colors ${strength >= n ? strengthColor[strength] : 'bg-slate-200'}`} />
                ))}
              </div>
              <span className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {strengthLabel[strength]}
              </span>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Company name</label>
          <input
            type="text" required
            value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Acme Recruitment"
          />
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-xs text-slate-400 text-center mt-4">
        By signing up you agree to our{' '}
        <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and{' '}
        <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
      </p>
      <p className="text-sm text-center text-slate-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign in →</Link>
      </p>
    </div>
  )
}
