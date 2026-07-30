"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/auth/dal"
import { profileSchema, type ProfileInput } from "@/lib/validators/profile.schema"

export async function updateProfile(input: ProfileInput) {
  const profile = await getCurrentProfile()
  if (!profile) {
    return { error: "Not authenticated." }
  }

  const validated = profileSchema.safeParse(input)
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? "Invalid input." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: validated.data.fullName,
      phone: validated.data.phone ?? null,
      whatsapp: validated.data.whatsapp ?? null,
    })
    .eq("id", profile.id)

  if (error) {
    return { error: "Could not update your profile." }
  }

  revalidatePath("/account")
  revalidatePath("/seller/dashboard")
  return { success: true }
}
