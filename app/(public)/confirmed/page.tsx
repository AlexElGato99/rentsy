import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { getCurrentProfile } from "@/lib/auth/dal"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"

export default async function ConfirmedPage() {
  const [profile, locale] = await Promise.all([getCurrentProfile(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.confirmed

  const dashboardHref =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "seller"
        ? "/seller/listings/new"
        : "/listings"

  const dashboardLabel =
    profile?.role === "admin"
      ? t.goToAdminDashboard
      : profile?.role === "seller"
        ? t.addYourListing
        : t.startBrowsing

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl border-2 border-foreground bg-primary text-primary-foreground shadow-brutal">
        <CheckCircle2 className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
        {t.title}
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {profile
          ? t.welcomeBack(profile.full_name ?? t.fallbackName)
          : t.confirmedLoggedOut}
      </p>

      <div className="mt-8 w-full">
        <Link href={profile ? dashboardHref : "/login"} className="block">
          <Button size="lg" className="w-full">
            {profile ? dashboardLabel : t.logIn}
          </Button>
        </Link>
      </div>
    </div>
  )
}
