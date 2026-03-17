'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import OtpInput from '@/components/OtpInput'

const RESEND_COOLDOWN = 60

export default function VerifyEmailPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    const stored = sessionStorage.getItem('recruitai_verify_email')
    if (stored) setEmail(stored)
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) handleVerify(otp)
  }, [otp]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleVerify(code: string) {
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'signup' })
      if (error) throw error
      sessionStorage.removeItem('recruitai_verify_email')
      router.push('/onboarding')
    } catch {
      setError('Invalid code. Please try again.')
      setLoading(false)
    }
  }

  async function handleResend() {
    if (!email || cooldown > 0) return
    setError(null)
    await supabase.auth.resend({ type: 'signup', email })
    setCooldown(RESEND_COOLDOWN)
  }

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8 text-center">
      <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Mail className="w-8 h-8 text-indigo-600" />
      </div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-2">
        Enter your verification code
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        We sent a 6-digit code to <strong className="text-slate-700">{email || 'your email'}</strong>.
        It expires in 10 minutes.
      </p>

      <OtpInput value={otp} onChange={setOtp} disabled={loading} />

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <div className="mt-8 space-y-3">
        <button
          onClick={() => handleResend()}
          disabled={cooldown > 0}
          className="text-sm text-indigo-600 hover:text-indigo-700 disabled:text-slate-400 disabled:cursor-not-allowed font-medium"
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
        </button>
        <br />
        <a href="/signup" className="text-sm text-slate-400 hover:text-slate-600">
          Wrong email? Go back
        </a>
      </div>
    </div>
  )
}
