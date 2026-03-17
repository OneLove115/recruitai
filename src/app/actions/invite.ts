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
