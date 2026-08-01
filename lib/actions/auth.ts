"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { AuthError } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/server"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
} from "@/lib/validators/auth.schema"

async function friendlyAuthError(error: AuthError): Promise<string> {
  const dict = getDictionary(await getLocale())
  const errors = dict.authErrors as Record<string, string>
  return (error.code && errors[error.code]) ?? error.message
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
  const dict = getDictionary(await getLocale())
  const validated = signupSchema.safeParse(input)
  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message ?? dict.authErrors.invalidInput,
    }
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
    return { error: await friendlyAuthError(error) }
  }

  if (!data.session) {
    return { message: dict.authErrors.signupSuccess }
  }

  redirect(role === "seller" ? "/seller/listings/new" : "/")
}

export async function login(input: LoginInput) {
  const dict = getDictionary(await getLocale())
  const validated = loginSchema.safeParse(input)
  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message ?? dict.authErrors.invalidInput,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(validated.data)

  if (error) {
    return {
      error:
        error.code === "invalid_credentials"
          ? dict.authErrors.invalid_credentials
          : await friendlyAuthError(error),
    }
  }

  redirect("/")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
