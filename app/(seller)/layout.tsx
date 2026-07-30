import { redirect } from "next/navigation"

import { getCurrentProfile } from "@/lib/auth/dal"

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect("/login")
  }

  if (profile.role !== "seller" && profile.role !== "admin") {
    redirect("/")
  }

  return <>{children}</>
}
