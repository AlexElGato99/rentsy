"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/auth/dal"
import type { RoleType } from "@/types/supabase"

export async function updateUserRole(userId: string, role: RoleType) {
  const profile = await getCurrentProfile()
  if (!profile || profile.role !== "admin") {
    return { error: "Only admins can change user roles." }
  }

  if (userId === profile.id) {
    return { error: "You can't change your own role." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .select("id")
    .single()

  if (error || !data) {
    return { error: "Could not update this user's role." }
  }

  revalidatePath("/admin/users")
  return {}
}
