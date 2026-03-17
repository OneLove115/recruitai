# RecruitAI Homepage & Onboarding Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage (dark premium), build auth pages, OTP email verification, and 3-step onboarding wizard.

**Architecture:** Existing marketing components move to `src/components/home/` and are restyled. Auth pages share a new `(auth)/layout.tsx`. Onboarding is a client-side wizard with `localStorage` state, flushed to Supabase on completion.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Supabase (@supabase/ssr), framer-motion, canvas-confetti, vitest + @testing-library/react

**Spec:** `docs/superpowers/specs/2026-03-17-recruitai-homepage-onboarding-design.md`

---

## Chunk 1: Foundation

### Task 1: Install test dependencies

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] Install vitest and testing-library

```bash
cd /c/Users/xxx/.openclaw/workspace/recruitai
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom canvas-confetti
npm install -D @types/canvas-confetti
```

- [ ] Create `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] Create `src/test/setup.ts`

```ts
import '@testing-library/jest-dom'
```

- [ ] Add test script to `package.json` scripts section

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] Run `npm run test:run` — expect 0 tests, 0 failures

- [ ] Commit

```bash
git add vitest.config.ts src/test/setup.ts package.json package-lock.json
git commit -m "chore: add vitest + testing-library test setup"
```

---

### Task 2: Design tokens + fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] Add design tokens to `globals.css` — insert after `@import "tailwindcss"`:

```css
@theme {
  --color-brand: #4f46e5;
  --color-brand-dark: #3730a3;
  --color-accent: #7c3aed;
  --color-cta: #f59e0b;
  --color-cta-hover: #d97706;
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

- [ ] Update `:root` block in `globals.css`:

```css
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}
```

- [ ] Update `body` rule in `globals.css`:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), system-ui, sans-serif;
}
```

- [ ] Update `src/app/layout.tsx` — replace Geist imports with Manrope + Inter:

```tsx
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata = {
  title: 'RecruitAI — AI-Powered Recruitment Platform',
  description: 'Stop drowning in CVs. Let AI surface your top candidates instantly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "chore: add design tokens and Manrope+Inter fonts"
```

---

### Task 3: Restructure components into home/

**Files:**
- Move: all `src/components/*.tsx` → `src/components/home/`
- Modify: `src/app/page.tsx`

- [ ] Move existing components with git mv

```bash
cd /c/Users/xxx/.openclaw/workspace/recruitai
mkdir -p src/components/home
git mv src/components/Navbar.tsx src/components/home/Navbar.tsx
git mv src/components/Hero.tsx src/components/home/Hero.tsx
git mv src/components/TrustedBy.tsx src/components/home/TrustedBy.tsx
git mv src/components/Features.tsx src/components/home/Features.tsx
git mv src/components/HowItWorks.tsx src/components/home/HowItWorks.tsx
git mv src/components/Testimonials.tsx src/components/home/Testimonials.tsx
git mv src/components/Pricing.tsx src/components/home/Pricing.tsx
git mv src/components/FAQ.tsx src/components/home/FAQ.tsx
git mv src/components/CTA.tsx src/components/home/FinalCTA.tsx
git mv src/components/Footer.tsx src/components/home/Footer.tsx
```

- [ ] Update `src/app/page.tsx` imports:

```tsx
import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import TrustedBy from "@/components/home/TrustedBy"
import Features from "@/components/home/Features"
import HowItWorks from "@/components/home/HowItWorks"
import Testimonials from "@/components/home/Testimonials"
import Pricing from "@/components/home/Pricing"
import FAQ from "@/components/home/FAQ"
import FinalCTA from "@/components/home/FinalCTA"
import Footer from "@/components/home/Footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
```

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add -A
git commit -m "refactor: move marketing components to src/components/home/"
```

---

## Chunk 2: Navbar + Hero

### Task 4: Scroll-aware Navbar

**Files:**
- Modify: `src/components/home/Navbar.tsx`
- Create: `src/components/home/__tests__/Navbar.test.tsx`

- [ ] Write failing test

```tsx
// src/components/home/__tests__/Navbar.test.tsx
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText(/RecruitAI/i)).toBeInTheDocument()
  })

  it('renders Start Free Trial CTA', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /start free trial/i })).toBeInTheDocument()
  })
})
```

- [ ] Run test: `npm run test:run -- Navbar` — expect FAIL (old component)

- [ ] Replace `src/components/home/Navbar.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'For Candidates', href: '/jobs' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/5 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className={`text-lg font-bold font-[family-name:var(--font-heading)] transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            Recruit<span className="text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/80 text-sm font-medium" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/signup" className="text-sm font-semibold bg-amber-500 text-slate-900 px-4 py-2 rounded-lg text-center">
            Start Free Trial
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] Run test: `npm run test:run -- Navbar` — expect PASS

- [ ] Commit

```bash
git add src/components/home/Navbar.tsx src/components/home/__tests__/Navbar.test.tsx
git commit -m "feat: scroll-aware dark-to-light Navbar"
```

---

### Task 5: Hero — dark premium rewrite

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] Replace `src/components/home/Hero.tsx` entirely:

```tsx
import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, CheckCircle2, Zap, Users } from 'lucide-react'

const MOCK_CANDIDATES = [
  { initials: 'SC', name: 'Sarah Chen', sub: 'Ex-Google · 8yr exp', score: 97, color: 'from-violet-500 to-indigo-600' },
  { initials: 'MR', name: 'Marcus Reid', sub: 'Ex-Meta · 6yr exp', score: 91, color: 'from-blue-500 to-indigo-600' },
  { initials: 'PS', name: 'Priya Sharma', sub: 'Ex-Stripe · 5yr exp', score: 88, color: 'from-pink-500 to-violet-600' },
  { initials: 'JL', name: 'James Liu', sub: 'Ex-Airbnb · 4yr exp', score: 83, color: 'from-amber-500 to-orange-600' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              </span>
              <span className="text-sm font-medium text-indigo-300">AI-Powered Recruitment · Now in v2.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold font-[family-name:var(--font-heading)] text-white leading-[1.08] tracking-tight mb-6">
              Stop drowning<br />in CVs.{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Let AI surface
              </span>{' '}
              your top candidates instantly
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              RecruitAI scores every applicant against your hidden criteria, ranks them by fit, and manages your entire pipeline — so you focus on people, not paperwork.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-base px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center gap-3 text-white/70 font-semibold text-base hover:text-white transition-colors">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-white/15 transition-colors">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </span>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['bg-indigo-400','bg-violet-400','bg-pink-400','bg-blue-400','bg-teal-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1e1b4b] flex items-center justify-center text-white text-xs font-bold`}>
                    {String.fromCharCode(65+i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50">
                <span className="text-white font-semibold">4.9/5</span> from 800+ recruiters
              </p>
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div className="relative">
            {/* Floating pills */}
            <div className="absolute -left-8 top-12 z-10 animate-float">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <p className="text-xs text-white/50">AI processed</p>
                  <p className="text-sm font-bold text-white">127 CVs in 4.2s</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-20 z-10 animate-float" style={{ animationDelay: '1.2s' }}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50">This week</p>
                  <p className="text-sm font-bold text-white">+24 hires</p>
                </div>
              </div>
            </div>

            {/* Browser frame */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              {/* Chrome bar */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-3 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  app.recruitai.io/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-slate-900 flex" style={{ minHeight: 320 }}>
                {/* Sidebar */}
                <aside className="w-14 bg-slate-950 flex flex-col items-center py-4 gap-4 border-r border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-indigo-500/20' : 'bg-slate-800'}`}>
                      <div className={`w-3.5 h-3.5 rounded-sm ${i === 0 ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                    </div>
                  ))}
                </aside>

                {/* Main content */}
                <div className="flex-1 p-5 overflow-hidden">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Active Jobs', value: '8', icon: Users, color: 'text-indigo-400' },
                      { label: 'Applicants', value: '342', icon: Users, color: 'text-violet-400' },
                      { label: 'Shortlisted', value: '24', icon: CheckCircle2, color: 'text-emerald-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <p className="text-lg font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Candidate list */}
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-semibold text-slate-300">Top Candidates — Senior Frontend Eng.</p>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>
                    <div className="space-y-2">
                      {MOCK_CANDIDATES.map((c) => (
                        <div key={c.initials} className="flex items-center gap-3 bg-slate-900/60 rounded-lg px-3 py-2">
                          <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {c.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{c.sub}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-bold text-indigo-400">{c.score}</span>
                            <div className="w-14 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                style={{ width: `${c.score}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { value: '10x', label: 'Faster hiring' },
            { value: '94%', label: 'Match accuracy' },
            { value: '2,400+', label: 'Recruiters' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Run `npm run dev` and verify hero renders with dark gradient, dashboard preview, floating pills

- [ ] Commit

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: dark premium hero with dashboard preview"
```

---

## Chunk 3: Homepage Sections (TrustedBy → HowItWorks)

### Task 6: TrustedBy

**Files:**
- Modify: `src/components/home/TrustedBy.tsx`

- [ ] Replace with restyled version:

```tsx
const LOGOS = ['TechCorp', 'StaffPro', 'HireBase', 'RecruitX', 'TalentFlow', 'PeopleAI']

export default function TrustedBy() {
  return (
    <section className="bg-white py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by recruitment agencies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="h-8 px-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm font-semibold tracking-wide"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit: `git add src/components/home/TrustedBy.tsx && git commit -m "feat: restyle TrustedBy with placeholder logo bars"`

---

### Task 7: ProblemAgitation (new)

**Files:**
- Create: `src/components/home/ProblemAgitation.tsx`
- Modify: `src/app/page.tsx`

- [ ] Create `src/components/home/ProblemAgitation.tsx`:

```tsx
import { Inbox, Search, Clock } from 'lucide-react'

const PROBLEMS = [
  {
    icon: Inbox,
    color: 'text-red-500',
    bg: 'bg-red-50',
    title: "You're buried in CVs",
    body: 'Recruiters spend 23 hours/week manually screening. Most great candidates never get read.',
  },
  {
    icon: Search,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'You miss hidden gems',
    body: 'Your screening criteria overlooks non-obvious fits. The best candidate on paper isn\'t always the best hire.',
  },
  {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: 'Slow hiring costs you',
    body: 'Top candidates accept offers in 10 days. Manual pipelines take 3× longer.',
  },
]

export default function ProblemAgitation() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">
            Hiring is broken. Here&apos;s why.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {PROBLEMS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed">{p.body}</p>
              </div>
            )
          })}
        </div>
        <p className="text-center text-lg font-semibold text-indigo-600">
          RecruitAI solves all three. ↓
        </p>
      </div>
    </section>
  )
}
```

- [ ] Add ProblemAgitation to `src/app/page.tsx` between TrustedBy and Features:

```tsx
import ProblemAgitation from "@/components/home/ProblemAgitation"
// Add <ProblemAgitation /> between <TrustedBy /> and <Features />
```

- [ ] Commit: `git add src/components/home/ProblemAgitation.tsx src/app/page.tsx && git commit -m "feat: add ProblemAgitation section"`

---

### Task 8: Features restyle

**Files:**
- Modify: `src/components/home/Features.tsx`

- [ ] Replace with dark-card grid:

```tsx
import { Brain, EyeOff, LayoutKanban, CalendarCheck, Smartphone, Users } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'AI CV Scoring', body: 'Ranks every applicant in seconds against your criteria. No bias, no fatigue.' },
  { icon: EyeOff, title: 'Hidden Criteria', body: "Private scoring factors candidates can't see or game." },
  { icon: LayoutKanban, title: 'Pipeline Management', body: 'Drag candidates through stages with one click.' },
  { icon: CalendarCheck, title: 'Interview Scheduling', body: 'Calendly-style booking built right in. No back-and-forth.' },
  { icon: Smartphone, title: 'Candidate Portal', body: 'Mobile-friendly application tracker candidates actually love.' },
  { icon: Users, title: 'Team Collaboration', body: 'Notes, tags, and @mentions on every candidate profile.' },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-slate-900">
            Everything your agency needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="group bg-slate-50 hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-200 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit: `git add src/components/home/Features.tsx && git commit -m "feat: restyle Features grid"`

---

### Task 9: HowItWorks restyle

**Files:**
- Modify: `src/components/home/HowItWorks.tsx`

- [ ] Replace:

```tsx
const STEPS = [
  {
    n: '01',
    title: 'Post a job',
    body: 'Write your requirements and set hidden scoring criteria. Candidates never see these — so they can\'t game the system.',
  },
  {
    n: '02',
    title: 'AI scores applicants',
    body: 'Every CV is ranked the moment it arrives. Your top 10 candidates are surfaced instantly.',
  },
  {
    n: '03',
    title: 'Hire with confidence',
    body: 'Move candidates through your pipeline, schedule interviews, and make the offer — all in one place.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
            From job post to hire in 3 steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-indigo-500/30" />
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-indigo-400">{step.n}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit: `git add src/components/home/HowItWorks.tsx && git commit -m "feat: restyle HowItWorks dark section"`

---

## Chunk 4: Homepage Final Sections

### Task 10: AIScoringDemo (new)

**Files:**
- Create: `src/components/home/AIScoringDemo.tsx`
- Modify: `src/app/page.tsx`

- [ ] Create `src/components/home/AIScoringDemo.tsx`:

```tsx
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
```

- [ ] Add to `src/app/page.tsx` between HowItWorks and Testimonials

- [ ] Commit: `git add src/components/home/AIScoringDemo.tsx src/app/page.tsx && git commit -m "feat: add animated AIScoringDemo section"`

---

### Task 11: Pricing with annual toggle

**Files:**
- Modify: `src/components/home/Pricing.tsx`
- Create: `src/components/home/__tests__/Pricing.test.tsx`

- [ ] Write failing test:

```tsx
// src/components/home/__tests__/Pricing.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pricing from '../Pricing'

describe('Pricing', () => {
  it('shows monthly prices by default', () => {
    render(<Pricing />)
    expect(screen.getByText('€99')).toBeInTheDocument()
    expect(screen.getByText('€199.99')).toBeInTheDocument()
  })

  it('switches to annual prices when toggled', async () => {
    const user = userEvent.setup()
    render(<Pricing />)
    await user.click(screen.getByRole('button', { name: /annual/i }))
    expect(screen.getByText('€990')).toBeInTheDocument()
    expect(screen.getByText('€1,999')).toBeInTheDocument()
  })
})
```

- [ ] Run: `npm run test:run -- Pricing` — expect FAIL

- [ ] Replace `src/components/home/Pricing.tsx`:

```tsx
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
```

- [ ] Run: `npm run test:run -- Pricing` — expect PASS

- [ ] Commit: `git add src/components/home/Pricing.tsx src/components/home/__tests__/Pricing.test.tsx && git commit -m "feat: Pricing with monthly/annual toggle and exact prices"`

---

### Task 12: FAQ, FinalCTA, Footer + page.tsx wiring

**Files:**
- Modify: `src/components/home/FAQ.tsx`
- Modify: `src/components/home/FinalCTA.tsx`
- Modify: `src/components/home/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] Replace `src/components/home/FAQ.tsx`:

```tsx
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
```

- [ ] Replace `src/components/home/FinalCTA.tsx`:

```tsx
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
```

- [ ] Replace `src/components/home/Footer.tsx`:

```tsx
import Link from 'next/link'
import { Zap } from 'lucide-react'

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">
                Recruit<span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered recruitment for agencies that want to hire the best.
            </p>
          </div>
          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{group}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© 2026 RecruitAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] Update `src/app/page.tsx` to final section order:

```tsx
import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import TrustedBy from "@/components/home/TrustedBy"
import ProblemAgitation from "@/components/home/ProblemAgitation"
import Features from "@/components/home/Features"
import HowItWorks from "@/components/home/HowItWorks"
import AIScoringDemo from "@/components/home/AIScoringDemo"
import Testimonials from "@/components/home/Testimonials"
import Pricing from "@/components/home/Pricing"
import FAQ from "@/components/home/FAQ"
import FinalCTA from "@/components/home/FinalCTA"
import Footer from "@/components/home/Footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <ProblemAgitation />
      <Features />
      <HowItWorks />
      <AIScoringDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
```

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add src/components/home/FAQ.tsx src/components/home/FinalCTA.tsx src/components/home/Footer.tsx src/app/page.tsx
git commit -m "feat: FAQ accordion, FinalCTA dark banner, Footer — homepage complete"
```

---

## Chunk 5: Auth Pages

### Task 13: Auth layout

**Files:**
- Create: `src/app/(auth)/layout.tsx`

- [ ] Create `src/app/(auth)/layout.tsx`:

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      <a
        href="/"
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
      >
        ← Back to home
      </a>
      {children}
    </div>
  )
}
```

- [ ] Commit: `git add src/app/(auth)/layout.tsx && git commit -m "feat: shared dark gradient auth layout"`

---

### Task 14: Signup page

**Files:**
- Modify: `src/app/(auth)/signup/page.tsx`

- [ ] Replace with:

```tsx
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
          emailRedirectTo: undefined, // OTP flow — no redirect needed
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
```

- [ ] Commit: `git add src/app/(auth)/signup/page.tsx && git commit -m "feat: signup page with password strength indicator"`

---

### Task 15: OTP email verification

**Files:**
- Create: `src/app/(auth)/verify-email/page.tsx`
- Create: `src/components/OtpInput.tsx`
- Create: `src/components/__tests__/OtpInput.test.tsx`

- [ ] Write failing OTP input test:

```tsx
// src/components/__tests__/OtpInput.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OtpInput from '../OtpInput'

describe('OtpInput', () => {
  it('renders 6 input boxes', () => {
    render(<OtpInput value="" onChange={() => {}} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('calls onChange with concatenated value as digits are entered', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OtpInput value="" onChange={onChange} />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '1')
    expect(onChange).toHaveBeenCalledWith('1')
  })
})
```

- [ ] Run: `npm run test:run -- OtpInput` — expect FAIL

- [ ] Create `src/components/OtpInput.tsx`:

```tsx
'use client'

import { useRef, KeyboardEvent, ClipboardEvent } from 'react'

interface OtpInputProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export default function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '')

  function handleChange(i: number, char: string) {
    const d = char.replace(/\D/g, '').slice(0, 1)
    const next = [...digits]
    next[i] = d
    onChange(next.join(''))
    if (d && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted.padEnd(6, '').slice(0, 6))
    refs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
```

- [ ] Run: `npm run test:run -- OtpInput` — expect PASS

- [ ] Create `src/app/(auth)/verify-email/page.tsx`:

```tsx
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
```

- [ ] Commit

```bash
git add src/components/OtpInput.tsx src/components/__tests__/OtpInput.test.tsx src/app/(auth)/verify-email/page.tsx
git commit -m "feat: OTP email verification with 6-digit input and auto-submit"
```

---

### Task 16: Login + password recovery

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Create: `src/app/(auth)/forgot-password/page.tsx`
- Create: `src/app/(auth)/reset-password/page.tsx`

- [ ] Replace `src/app/(auth)/login/page.tsx`:

```tsx
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
```

- [ ] Create `src/app/(auth)/forgot-password/page.tsx`:

```tsx
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
```

- [ ] Create `src/app/(auth)/reset-password/page.tsx`:

```tsx
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
    // Supabase injects session from URL hash on load
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
```

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add src/app/(auth)/login/page.tsx src/app/(auth)/forgot-password/page.tsx src/app/(auth)/reset-password/page.tsx
git commit -m "feat: login, forgot-password, and reset-password auth pages"
```

---

## Chunk 6: Onboarding Wizard + DB Schema

### Task 17: Supabase migration

**Files:**
- Create: `supabase/migrations/20260317000001_profiles_jobs.sql`

- [ ] Create migration file:

```sql
-- supabase/migrations/20260317000001_profiles_jobs.sql

-- Verify tables don't exist before creating
-- profiles: one row per authenticated user (tenant)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text not null,
  industry text,
  team_size text check (team_size in ('solo', '2-5', '6-20', '20+')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- jobs: one row per job posting
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  location text,
  remote boolean default false,
  employment_type text check (employment_type in ('full-time', 'part-time', 'contract', 'internship')),
  description text,
  status text default 'active' check (status in ('active', 'paused', 'closed')),
  created_at timestamptz default now()
);

alter table jobs enable row level security;

create policy "Users can manage own jobs"
  on jobs for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
```

- [ ] Commit: `git add supabase/migrations/ && git commit -m "feat: add profiles and jobs tables migration"`

---

### Task 18: Team invite server action

**Files:**
- Create: `src/app/actions/invite.ts`

- [ ] Create `src/app/actions/invite.ts`:

```ts
'use server'

import { createClient } from '@supabase/supabase-js'

interface InvitePayload {
  email: string
  role: 'admin' | 'recruiter' | 'viewer'
}

export async function inviteTeamMember(payload: InvitePayload) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { error } = await supabase.auth.admin.inviteUserByEmail(payload.email, {
    data: { role: payload.role },
  })

  if (error) throw new Error(error.message)
  return { success: true }
}
```

- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local.example`

- [ ] Commit: `git add src/app/actions/invite.ts && git commit -m "feat: server action for team invites using service role key"`

---

### Task 19: Onboarding wizard

**Files:**
- Create: `src/app/onboarding/layout.tsx`
- Create: `src/app/onboarding/page.tsx`
- Create: `src/app/onboarding/__tests__/onboarding.test.tsx`

- [ ] Write failing test:

```tsx
// src/app/onboarding/__tests__/onboarding.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock next/navigation
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
// Mock supabase
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: 'u1', user_metadata: { full_name: 'Jane', company_name: 'Acme' } } } }) },
    from: () => ({ upsert: async () => ({ error: null }), insert: async () => ({ error: null }) }),
  }),
}))

import OnboardingPage from '../page'

describe('OnboardingPage', () => {
  it('starts on step 1', () => {
    render(<OnboardingPage />)
    expect(screen.getByText(/Set up your agency/i)).toBeInTheDocument()
  })

  it('advances to step 2 on Continue', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)
    await user.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/Post your first job/i)).toBeInTheDocument()
  })

  it('can skip step 2 and reach step 3', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('button', { name: /skip for now/i }))
    expect(screen.getByText(/Invite your team/i)).toBeInTheDocument()
  })
})
```

- [ ] Run: `npm run test:run -- onboarding` — expect FAIL

- [ ] Create `src/app/onboarding/layout.tsx`:

```tsx
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>
}
```

- [ ] Create `src/app/onboarding/page.tsx`:

```tsx
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
      // Pre-fill company from signup metadata
      const company = data?.user?.user_metadata?.company_name
      if (company) setState((s) => ({ ...s })) // company stored in profiles via finish
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
      <aside className="hidden lg:flex w-72 flex-col bg-slate-900 px-8 py-10">
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
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                    <input type="text" value={state.jobLocation} onChange={(e) => setState({ ...state, jobLocation: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Amsterdam" />
                  </div>
                  <div className="pt-7 flex items-center gap-2">
                    <input type="checkbox" id="remote" checked={state.jobRemote} onChange={(e) => setState({ ...state, jobRemote: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
                    <label htmlFor="remote" className="text-sm text-slate-600">Remote</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Employment type</label>
                  <div className="flex flex-wrap gap-2">
                    {[['full-time','Full-time'],['part-time','Part-time'],['contract','Contract'],['internship','Internship']].map(([val, label]) => (
                      <button key={val} type="button" onClick={() => setState({ ...state, jobType: val })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${state.jobType === val ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Brief description</label>
                  <textarea value={state.jobDescription} onChange={(e) => setState({ ...state, jobDescription: e.target.value })}
                    rows={3} className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="What's this role about?" />
                </div>
                <button onClick={() => setStep(3)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Continue →
                </button>
                <button onClick={() => setStep(3)} type="button" className="w-full text-sm text-slate-400 hover:text-slate-600 py-1">
                  Skip for now
                </button>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                {state.inviteEmails.map((email, i) => (
                  <div key={i} className="flex gap-3">
                    <input type="email" value={email}
                      onChange={(e) => {
                        const emails = [...state.inviteEmails]; emails[i] = e.target.value
                        setState({ ...state, inviteEmails: emails })
                      }}
                      className="flex-1 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="colleague@agency.com" />
                    <select
                      value={state.inviteRoles[i]}
                      onChange={(e) => {
                        const roles = [...state.inviteRoles]; roles[i] = e.target.value
                        setState({ ...state, inviteRoles: roles })
                      }}
                      className="w-32 border border-slate-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                ))}
                <button
                  onClick={() => finish(false, false)}
                  disabled={saving}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-900 font-semibold py-3 rounded-xl transition-colors"
                >
                  {saving ? 'Finishing up…' : 'Finish setup →'}
                </button>
                <button onClick={() => finish(false, true)} type="button" disabled={saving} className="w-full text-sm text-slate-400 hover:text-slate-600 py-1">
                  Skip for now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] Run: `npm run test:run -- onboarding` — expect PASS

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add src/app/onboarding/layout.tsx src/app/onboarding/page.tsx src/app/onboarding/__tests__/onboarding.test.tsx
git commit -m "feat: 3-step onboarding wizard with DB writes and team invites"
```

---

### Task 20: Dashboard empty state

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] Add empty state when user has no jobs — replace the hardcoded jobs list section with a check. At the top of the component add a job count fetch:

```tsx
// After existing auth check, add:
const { data: jobs } = await supabase.from('jobs').select('id, title, status').eq('owner_id', user.id).limit(10)
const hasJobs = jobs && jobs.length > 0
```

- [ ] Replace the hardcoded "Active Job Listings" card content with:

```tsx
{hasJobs ? (
  /* existing hardcoded job rows — replace with jobs.map() in a later phase */
  <div className="space-y-3">
    {jobs!.map((job) => (
      <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
        <p className="text-sm font-semibold text-slate-900">{job.title}</p>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {job.status}
        </span>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
      <Briefcase className="w-7 h-7 text-indigo-500" />
    </div>
    <p className="text-sm font-semibold text-slate-900 mb-1">No jobs yet</p>
    <p className="text-sm text-slate-500 mb-5">Create your first job to start receiving candidates.</p>
    <Link href="/dashboard/jobs/new"
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors">
      <Plus className="w-4 h-4" /> Post your first job
    </Link>
  </div>
)}
```

- [ ] Run `npm run build` — expect clean build

- [ ] Commit

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: dashboard shows real jobs from DB with empty state prompt"
```

---

## Final Checklist

- [ ] `npm run test:run` — all tests pass
- [ ] `npm run build` — clean build, 0 TypeScript errors
- [ ] `npm run dev` — verify visually:
  - [ ] Homepage: dark hero, all 12 sections render, Pricing toggle works
  - [ ] `/signup` → OTP verify flow → `/onboarding` → `/dashboard`
  - [ ] `/login` → `/dashboard`
  - [ ] `/forgot-password` → confirmation card
- [ ] Push to GitHub

```bash
git push maisonmind master
```
