import "server-only"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

import type { Database } from "@/types/supabase"

/**
 * Service-role client. Bypasses Row Level Security entirely.
 * Never import this outside server-only code (e.g. the auth.users
 * bootstrap trigger's admin API calls). Never expose to the client.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
