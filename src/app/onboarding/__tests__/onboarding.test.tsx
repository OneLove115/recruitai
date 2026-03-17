import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Use vi.hoisted so the stable object is available inside vi.mock factory (which is hoisted above imports)
const mockSupabase = vi.hoisted(() => ({
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: 'u1', user_metadata: { full_name: 'Jane', company_name: 'Acme' } } },
    }),
  },
  from: vi.fn().mockReturnValue({
    upsert: vi.fn().mockResolvedValue({ error: null }),
    insert: vi.fn().mockResolvedValue({ error: null }),
  }),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
// Mock supabase — return the same stable object every call so useEffect [supabase.auth] dep doesn't change
vi.mock('@/lib/supabase/client', () => ({ createClient: () => mockSupabase }))
// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({ default: vi.fn() }))
// Mock server action
vi.mock('@/app/actions/invite', () => ({ inviteTeamMember: vi.fn().mockResolvedValue({ success: true }) }))

import OnboardingPage from '../page'

describe('OnboardingPage', () => {
  it('starts on step 1', async () => {
    await act(async () => { render(<OnboardingPage />) })
    // Query by heading role to avoid matching the sidebar <li> elements
    expect(screen.getByRole('heading', { name: /Set up your agency/i })).toBeInTheDocument()
  })

  it('advances to step 2 on Continue', async () => {
    const user = userEvent.setup()
    await act(async () => { render(<OnboardingPage />) })
    await user.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByRole('heading', { name: /Post your first job/i })).toBeInTheDocument()
  })

  it('can skip step 2 and reach step 3', async () => {
    const user = userEvent.setup()
    await act(async () => { render(<OnboardingPage />) })
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('button', { name: /skip for now/i }))
    expect(screen.getByRole('heading', { name: /Invite your team/i })).toBeInTheDocument()
  })
})
