# RecruitAI — Homepage & Onboarding Design Spec

**Date:** 2026-03-17
**Scope:** Homepage redesign + Auth pages + 3-step onboarding wizard
**Status:** Approved by user

---

## 1. Design System

### Colors
| Role | Hex | Tailwind |
|------|-----|----------|
| Hero gradient start | `#0f0c29` | custom |
| Hero gradient mid | `#302b63` | custom |
| Hero gradient end | `#24243e` | custom |
| Brand primary | `#4f46e5` | `indigo-600` |
| Brand dark | `#3730a3` | `indigo-800` |
| Accent | `#7c3aed` | `violet-700` |
| CTA button | `#f59e0b` | `amber-500` |
| CTA hover | `#d97706` | `amber-600` |
| Page background | `#f8fafc` | `slate-50` |
| Card surface | `#ffffff` | `white` |
| Text primary | `#0f172a` | `slate-900` |
| Text muted | `#64748b` | `slate-500` |
| Border | `#e2e8f0` | `slate-200` |
| Footer/dark bg | `#020617` | `slate-950` |

### Typography
- **Headings:** Manrope (700, 800) — replace current Geist Sans
- **Body:** Inter (400, 500, 600)
- **Google Fonts:** `Manrope:wght@400;600;700;800` + `Inter:wght@400;500;600`
- Add to `layout.tsx` via `next/font/google`

### CSS Variables (add to `globals.css`)
```css
:root {
  --color-brand: #4f46e5;
  --color-brand-dark: #3730a3;
  --color-accent: #7c3aed;
  --color-cta: #f59e0b;
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Animations (already in globals.css — keep)
- `animate-float` — floating stat pills in hero
- `animate-gradient` — hero gradient shift
- `animate-pulse-glow` — CTA glow pulse

---

## 2. Homepage

### Section Order
1. Navbar
2. Hero
3. TrustedBy
4. ProblemAgitation *(new)*
5. Features
6. HowItWorks
7. AIScoringDemo *(new)*
8. Testimonials
9. Pricing
10. FinalCTA
11. Footer

### 2.1 Navbar
- Sticky, `backdrop-blur-md bg-white/5 border-b border-white/10` when over hero (dark)
- Transitions to `bg-white/90 border-slate-200` on scroll past hero
- Logo: gradient icon + "Recruit**AI**" (bold, AI in indigo)
- Links: Features · How It Works · Pricing · (For Candidates)
- CTA: amber "Start Free Trial" button

### 2.2 Hero
**Layout:** Full-width, `min-h-screen`, dark gradient background
**Background:** `background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`
Overlaid with subtle dot-grid pattern at `opacity-[0.06]`

**Left column (copy):**
- Eyebrow: pill badge — pulsing dot + "AI-Powered Recruitment · Now in v2.0"
- H1 (two lines):
  - Line 1: "Stop drowning in CVs."
  - Line 2: "Let AI surface your" + gradient text "top candidates" + " instantly"
- Subheadline: "RecruitAI scores every applicant against your hidden criteria, ranks them by fit, and manages your entire pipeline — so you focus on people, not paperwork."
- CTAs: amber "Start Free Trial →" (primary) + ghost "▶ Watch Demo" (secondary)
- Social proof: 5 avatar circles + "4.9/5 from 800+ recruiters"

**Right column (product preview):**
- Browser chrome frame (`bg-slate-800` header with traffic light dots + URL bar showing `app.recruitai.io/dashboard`)
- Inside: dark dashboard UI matching the actual dashboard design
  - Sidebar: `bg-slate-950` with nav items
  - Content: stat cards + recent jobs table
- Floating pills (animate-float):
  - Top-left: "127 CVs scored in 4.2s" with ⚡ icon
  - Bottom-right: "+24 hires this week" with 📈 icon
  - Top-right: "94% match accuracy" with ✓ icon

**Stats bar** (below hero grid, above fold break):
- 3 stats: "10x Faster hiring" · "94% Match accuracy" · "2,400+ Recruiters"

### 2.3 TrustedBy
- White background, `py-16`
- Heading: "Trusted by recruitment agencies worldwide"
- Logo strip: 6 placeholder company logos, grayscale with `hover:opacity-100` transition
- Auto-scrolling marquee on mobile

### 2.4 ProblemAgitation *(new section)*
- `bg-slate-50`, `py-24`
- Section label: "THE PROBLEM"
- Heading: "Hiring is broken. Here's why."
- 3 pain point cards (`bg-white` with red/orange accent icon):
  1. **"You're buried in CVs"** — Recruiters spend 23 hours/week manually screening. Most great candidates never get read.
  2. **"You miss hidden gems"** — Your screening criteria overlooks non-obvious fits. The best candidate on paper isn't always the best hire.
  3. **"Slow hiring costs you"** — Top candidates accept offers in 10 days. Manual pipelines take 3× longer.
- Transition line into Features: "RecruitAI solves all three."

### 2.5 Features
- `bg-white`, `py-24`
- Section label: "FEATURES"
- Heading: "Everything your agency needs"
- 6-card grid (3×2 on desktop, 2×3 on tablet, 1×6 on mobile):
  1. **AI CV Scoring** — Ranks every applicant in seconds against your criteria
  2. **Hidden Criteria** — Private scoring factors candidates can't game
  3. **Pipeline Management** — Drag candidates through stages with one click
  4. **Interview Scheduling** — Calendly-style booking built right in
  5. **Candidate Portal** — Mobile-friendly tracker candidates actually love
  6. **Team Collaboration** — Notes, tags, and @mentions on every profile
- Cards: `bg-slate-50 hover:bg-indigo-50 hover:-translate-y-1 transition-all` with indigo icon background

### 2.6 HowItWorks
- `bg-slate-900` dark section, `py-24`, white text
- Section label: "HOW IT WORKS"
- Heading: "From job post to hire in 3 steps"
- Numbered steps with connecting line:
  1. **Post a job** — Write your requirements and set hidden scoring criteria (candidates never see these)
  2. **AI scores applicants** — Every CV is ranked the moment it arrives. Top 10 surfaced instantly.
  3. **Hire with confidence** — Move candidates through your pipeline, schedule interviews, make the offer.

### 2.7 AIScoringDemo *(new section)*
- `bg-slate-50`, `py-24`
- Section label: "AI SCORING"
- Heading: "Watch AI rank 127 CVs in 4 seconds"
- Animated demo: staggered candidate cards appearing with scores, progress bars filling in
- Subtext: "Hidden criteria means candidates can't reverse-engineer your scoring. Fair, consistent, defensible."
- Implementation: CSS animation on scroll-enter, no external libraries needed

### 2.8 Testimonials
- `bg-white`, `py-24`
- 3 quote cards in a grid
- Each: star rating + quote + avatar + name + company + role
- Placeholder content until real quotes available

### 2.9 Pricing
- `bg-slate-50`, `py-24`
- Monthly/Annual toggle (annual = 20% off badge)
- 2 tiers:
  - **Starter** — €99/mo — 1 recruiter, 5 active jobs, AI scoring, basic pipeline
  - **Agency** — €199.99/mo — Unlimited recruiters, unlimited jobs, hidden criteria, advanced analytics, priority support
- Agency card: highlighted with indigo border + "Most Popular" badge
- Both: amber "Start Free Trial" CTA, "No credit card required" note

### 2.10 FinalCTA
- Dark gradient matching hero, `py-24`
- Heading: "Ready to hire smarter?"
- Subtext: "Join 2,400+ recruitment agencies already using RecruitAI"
- Single amber CTA button

### 2.11 Footer
- `bg-slate-950`, white/muted text
- 4-col grid: Logo+tagline · Product links · Company links · Legal links
- Bottom bar: copyright + social icons

---

## 3. Auth Pages

### Layout (all auth pages)
- Full-screen dark gradient background (matches hero: `#0f0c29` → `#302b63`)
- Centered card: `bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[420px]`
- Logo at top of card
- "Back to home" link top-left (outside card)

### 3.1 Signup (`/signup`)
**Fields:**
1. Full name
2. Work email
3. Password (with strength indicator)
4. Company name

**Below form:**
- "By signing up you agree to our Terms and Privacy Policy"
- "Already have an account? Sign in →"

**On submit:** Create Supabase user → redirect to `/verify-email`

### 3.2 Email Verification (`/verify-email`)
- Card with envelope icon
- Heading: "Check your inbox"
- Body: "We sent a verification link to **{email}**. Click it to activate your account."
- "Resend email" link (with 60s cooldown)
- "Wrong email? Go back" link
- On email link click: Supabase handles verification → redirect to `/onboarding`

### 3.3 Login (`/login`)
- Email + password fields
- "Forgot password?" link
- "Don't have an account? Sign up →"
- On submit: Supabase signInWithPassword → redirect to `/dashboard`

### 3.4 Password Recovery
**Step 1** — `/forgot-password`: Email input → submit → "Check your inbox" confirmation page
**Step 2** — `/reset-password`: New password + confirm (Supabase handles token via URL param)

---

## 4. Onboarding Wizard (`/onboarding`)

### Layout
- 2-column: dark left sidebar (brand + step progress) + white right panel (form)
- Left sidebar: logo, tagline "You're almost ready to hire smarter", vertical step list with current step highlighted
- Progress bar at top of right panel

### Steps

**Step 1 — Set up your agency**
- Company name (pre-filled from signup)
- Industry: dropdown (Tech, Finance, Healthcare, Legal, Retail, Other)
- Team size: radio pills (Just me, 2–5, 6–20, 20+)
- CTA: "Continue →"

**Step 2 — Post your first job**
- Job title (text input)
- Location (text input + "Remote" toggle)
- Employment type: radio pills (Full-time, Part-time, Contract, Internship)
- Brief description (textarea, 3 lines)
- "Skip for now" link below CTA
- CTA: "Continue →"

**Step 3 — Invite your team**
- Up to 3 email inputs (add more link)
- Role selector per invite: Admin / Recruiter / Viewer
- "Skip for now" link
- CTA: "Finish setup →"

### Completion Screen
- Full-screen animated confetti (lightweight CSS only)
- Heading: "You're all set, {firstName}!"
- Subtext: "Your workspace is ready. Let's go find some great candidates."
- CTA: "Go to dashboard →" → `/dashboard`

### Post-Onboarding Dashboard State
- **Completed step 2 (job created):** Dashboard shows the job card with 0 applicants + "Share job link" prompt
- **Skipped step 2:** Dashboard shows empty state with prominent "Post your first job" CTA card in center

---

## 5. Component Architecture

### New components to create
```
src/components/
  home/
    Navbar.tsx          # replace existing Navbar.tsx (scroll-aware)
    Hero.tsx            # full rewrite — dark premium
    TrustedBy.tsx       # keep, restyle
    ProblemAgitation.tsx  # new
    Features.tsx        # restyle existing
    HowItWorks.tsx      # restyle existing
    AIScoringDemo.tsx   # new
    Testimonials.tsx    # restyle existing
    Pricing.tsx         # restyle existing
    FinalCTA.tsx        # restyle existing CTA.tsx
    Footer.tsx          # restyle existing

src/app/
  (auth)/
    signup/page.tsx     # rewrite with new design
    login/page.tsx      # rewrite with new design
    verify-email/page.tsx  # new
    forgot-password/page.tsx  # new
    reset-password/page.tsx   # new
  onboarding/
    page.tsx            # new wizard (client component)
    layout.tsx          # minimal layout (no dashboard chrome)
```

### Move existing components
- Current `src/components/*.tsx` → `src/components/home/*.tsx`
- Update `src/app/page.tsx` imports accordingly

---

## 6. Implementation Notes

### Font setup (`layout.tsx`)
```tsx
import { Manrope, Inter } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', weight: ['400','600','700','800'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['400','500','600'] })
```

### Supabase auth flow
- Signup → `supabase.auth.signUp()` → email verification → `/onboarding`
- Login → `supabase.auth.signInWithPassword()` → `/dashboard`
- Password recovery → `supabase.auth.resetPasswordForEmail()` → `/reset-password`
- Email verification redirect: configure in Supabase dashboard → Site URL + redirect to `/onboarding`

### Onboarding data persistence
- Store wizard state in `localStorage` during wizard (no DB writes until finish)
- On "Finish setup": write company profile to `profiles` table, create first job if provided, send team invites
- Schema additions needed: `profiles` table (company_name, industry, team_size), `jobs` table

### Scroll animations
- Use `IntersectionObserver` with CSS classes (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`)
- No animation library — keep bundle size low

---

## 7. Out of Scope (next phases)
- Dashboard interior pages (jobs, candidates, pipeline, interviews, analytics)
- AI scoring engine
- Candidate portal
- Stripe billing updates
