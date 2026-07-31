import { NextResponse } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/server"

const VALID_TYPES: EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/confirmed"

  if (tokenHash && type && VALID_TYPES.includes(type as EmailOtpType)) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    })

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error("[auth/confirm] verifyOtp failed:", error.code, error.message)
  } else {
    console.error("[auth/confirm] missing/invalid params:", {
      hasTokenHash: Boolean(tokenHash),
      type,
    })
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
