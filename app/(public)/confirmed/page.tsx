import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { getCurrentProfile } from "@/lib/auth/dal"
import { Button } from "@/components/ui/button"

export default async function ConfirmedPage() {
  const profile = await getCurrentProfile()

  const dashboardHref =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "seller"
        ? "/seller/listings/new"
        : "/listings"

  const dashboardLabel =
    profile?.role === "admin"
      ? "Go to admin dashboard"
      : profile?.role === "seller"
        ? "Add your listing"
        : "Start browsing"

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl border-2 border-foreground bg-primary text-primary-foreground shadow-brutal">
        <CheckCircle2 className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
        Email confirmed!
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {profile
          ? `Welcome to Rentsy, ${profile.full_name ?? "there"}. Your account is ready.`
          : "Your account is confirmed. Log in to continue."}
      </p>

      <div className="mt-8 w-full">
        <Link href={profile ? dashboardHref : "/login"} className="block">
          <Button size="lg" className="w-full">
            {profile ? dashboardLabel : "Log in"}
          </Button>
        </Link>
      </div>
    </div>
  )
}
