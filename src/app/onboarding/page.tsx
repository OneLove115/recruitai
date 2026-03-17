'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { inviteTeamMember } from '@/app/actions/invite'
import confetti from 'canvas-confetti'

const STORAGE_KEY = 'recruitai_onboarding'

type Step = 1 | 2 | 3 | 'done'

interface WizardState {
  industry: string
  teamSize: string
  jobTitle: string
  jobLocation: string
  jobRemote: boolean
  jobType: string
  jobDescription: string
  inviteEmails: string[]
  inviteRoles: string[]
}

const INITIAL: WizardState = {
  industry: '', teamSize: '',
  jobTitle: '', jobLocation: '', jobRemote: false, jobType: 'full-time', jobDescription: '',
  inviteEmails: ['', '', ''], inviteRoles: ['recruiter', 'recruiter', 'recruiter'],
}

const STEPS = ['Set up your agency', 'Post your first job', 'Invite your team']

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState<WizardState>(INITIAL)
  const [firstName, setFirstName] = useState('there')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setState(JSON.parse(saved)) } catch { /* ignore */ }
    }
    supabase.auth.getUser().then(({ data }) => {
      const name = data?.user?.user_metadata?.full_name?.split(' ')[0]
      if (name) setFirstName(name)
    })
  }, [supabase.auth])

  useEffect(() => {
    if (step !== 'done') localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, step])

  async function finish(skipJob: boolean, skipInvites: boolean) {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Upsert profile
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        company_name: user.user_metadata?.company_name ?? '',
        industry: state.industry || null,
        team_size: state.teamSize || null,
      })
      if (profileError) throw profileError

      // Create job if provided
      if (!skipJob && state.jobTitle) {
        const { error: jobError } = await supabase.from('jobs').insert({
          owner_id: user.id,
          title: state.jobTitle,
          location: state.jobLocation || null,
          remote: state.jobRemote,
          employment_type: state.jobType,
          description: state.jobDescription || null,
        })
        if (jobError) throw jobError
      }

      // Send invites
      if (!skipInvites) {
        const invites = state.inviteEmails
          .map((email, i) => ({ email: email.trim(), role: state.inviteRoles[i] as 'admin' | 'recruiter' | 'viewer' }))
          .filter((inv) => inv.email.includes('@'))
        await Promise.allSettled(invites.map((inv) => inviteTeamMember(inv)))
      }

      localStorage.removeItem(STORAGE_KEY)
      setStep('done')
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } })
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-500/20 border-2 border-indigo-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-4">
            You&apos;re all set, {firstName}!
          </h1>
          <p className="text-white/60 text-lg mb-10">Your workspace is ready. Let&apos;s go find some great candidates.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Go to dashboard →
          </button>
        </div>
      </div>
    )
  }

  const stepIndex = (step as number) - 1

  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <aside aria-hidden="true" className="hidden lg:flex w-72 flex-col bg-slate-900 px-8 py-10">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-white">
            Recruit<span className="text-indigo-400">AI</span>
          </span>
        </div>
        <p className="text-white/50 text-sm mb-10">You&apos;re almost ready to hire smarter</p>
        <ol className="space-y-4">
          {STEPS.map((label, i) => {
            const done = i < stepIndex
            const active = i === stepIndex
            return (
              <li key={label} className={`flex items-center gap-3 text-sm font-medium transition-colors ${active ? 'text-white' : done ? 'text-indigo-400' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${active ? 'bg-indigo-600 text-white' : done ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                  {done ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                {label}
              </li>
            )
          })}
        </ol>
      </aside>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="h-1 bg-slate-200">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${(stepIndex / 3) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Step {step} of 3</p>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-slate-900 mb-8">{STEPS[stepIndex]}</h2>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                  <select
                    value={state.industry}
                    onChange={(e) => setState({ ...state, industry: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select industry…</option>
                    {['Tech', 'Finance', 'Healthcare', 'Legal', 'Retail', 'Other'].map((o) => (
                      <option key={o} value={o.toLowerCase()}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Team size</label>
                  <div className="flex flex-wrap gap-2">
                    {[['solo', 'Just me'], ['2-5', '2–5'], ['6-20', '6–20'], ['20+', '20+']].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setState({ ...state, teamSize: val })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${state.teamSize === val ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Job title</label>
                  <input type="text" value={state.jobTitle} onChange={(e) => setState({ ...state, jobTitle: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                    <input type="text" value={state.jobLocation} onChange={(e) => setState({ ...state, jobLocation: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="London" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                    <select value={state.jobType} onChange={(e) => setState({ ...state, jobType: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remote" checked={state.jobRemote} onChange={(e) => setState({ ...state, jobRemote: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600" />
                  <label htmlFor="remote" className="text-sm text-slate-700">Remote OK</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea value={state.jobDescription} onChange={(e) => setState({ ...state, jobDescription: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows={3} placeholder="Briefly describe the role…" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => finish(false, true)} disabled={!state.jobTitle || saving}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
                    {saving ? 'Saving…' : 'Continue →'}
                  </button>
                  <button onClick={() => setStep(3)} type="button"
                    className="px-5 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl transition-colors">
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-500">Invite teammates to collaborate. They&apos;ll get an email to set their password.</p>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <input type="email" value={state.inviteEmails[i]}
                      onChange={(e) => {
                        const emails = [...state.inviteEmails]
                        emails[i] = e.target.value
                        setState({ ...state, inviteEmails: emails })
                      }}
                      className="flex-1 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`colleague${i + 1}@agency.com`} />
                    <select value={state.inviteRoles[i]}
                      onChange={(e) => {
                        const roles = [...state.inviteRoles]
                        roles[i] = e.target.value
                        setState({ ...state, inviteRoles: roles })
                      }}
                      className="w-32 border border-slate-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => finish(true, false)} disabled={saving}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
                    {saving ? 'Saving…' : 'Finish setup →'}
                  </button>
                  <button onClick={() => finish(true, true)} disabled={saving} type="button"
                    className="px-5 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl transition-colors">
                    Skip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
