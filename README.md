# RecruitAI — AI-Powered Recruitment Platform

A premium recruitment SaaS platform that uses AI to streamline the hiring process for recruitment agencies.

## Features

- **AI CV Scoring** — Automatically rank candidates against job requirements
- **Hidden Criteria** — Private scoring factors candidates can't see
- **Pipeline Management** — Track candidates through every stage
- **Interview Scheduling** — Calendly-style booking for interviews
- **Candidate Portal** — Modern, mobile-friendly application tracker

## Tech Stack

- **Next.js 14+** — App Router, React 18
- **Tailwind CSS v4** — Modern styling with animations
- **Supabase** — Auth & database
- **Stripe** — Subscriptions & payments

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/recruitai.git
cd recruitai
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Configure your `.env.local`:
- Add your Supabase project URL and anon key
- Add your Stripe API keys

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Pricing

- **Monthly**: $79/month per recruiter
- **Yearly**: $758/year (20% discount, save $190)

## License

MIT