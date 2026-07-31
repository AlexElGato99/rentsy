"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { AuthError } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/server"
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
} from "@/lib/validators/auth.schema"

const FRIENDLY_AUTH_ERRORS: Record<string, string> = {
  over_email_send_rate_limit:
    "We've sent too many emails in a short time. Please wait a few minutes and try again.",
  over_request_rate_limit:
    "Too many attempts. Please wait a moment and try again.",
  email_exists:
    "An account with this email already exists. Try logging in instead.",
  user_already_exists:
    "An account with this email already exists. Try logging in instead.",
  email_address_invalid: "Enter a valid email address.",
  weak_password: "Choose a stronger password.",
  email_not_confirmed:
    "Please confirm your email before logging in — check your inbox (and spam folder) for the confirmation link.",
}

function friendlyAuthError(error: AuthError): string {
  return (error.code && FRIENDLY_AUTH_ERRORS[error.code]) ?? error.message
}

async function getOrigin() {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https")
  return `${protocol}://${host}`
}

export async function signup(input: SignupInput) {
  const validated = signupSchema.safeParse(input)
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? "Invalid input." }
  }

  const { role, fullName, email, password } = validated.data
  const supabase = await createClient()
  const origin = await getOrigin()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: friendlyAuthError(error) }
  }

  if (!data.session) {
    return {
      message:
        "Account created. Check your email to confirm it before logging in.",
    }
  }

  redirect(role === "seller" ? "/seller/listings/new" : "/")
}

export async function login(input: LoginInput) {
  const validated = loginSchema.safeParse(input)
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? "Invalid input." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(validated.data)

  if (error) {
    return {
      error:
        error.code === "invalid_credentials"
          ? "Invalid email or password. If you just signed up, check your inbox to confirm your email first."
          : friendlyAuthError(error),
    }
  }

  redirect("/")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
