import { notFound, redirect } from "next/navigation"

import { getCurrentProfile } from "@/lib/auth/dal"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/login")
  }

  if (profile.role !== "admin") {
    notFound()
  }

  return <>{children}</>
}
