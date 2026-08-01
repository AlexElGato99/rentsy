import { Heart } from "lucide-react"

import { getCurrentProfile } from "@/lib/auth/dal"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { ProfileForm } from "@/components/account/profile-form"

export default async function AccountPage() {
  const [profile, locale] = await Promise.all([getCurrentProfile(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.dashboard.account

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {t.welcome} {profile?.full_name ?? t.fallbackName}
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">{t.subtitle}</p>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">{t.profileTitle}</h2>
        <ProfileForm
          dict={dict.profileForm}
          defaultValues={{
            fullName: profile?.full_name ?? "",
            phone: profile?.phone ?? undefined,
            whatsapp: profile?.whatsapp ?? undefined,
          }}
        />
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-foreground py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border-2 border-foreground bg-accent shadow-brutal-sm">
          <Heart className="size-6" />
        </span>
        <p className="text-lg font-extrabold">{t.emptyTitle}</p>
        <p className="max-w-sm text-sm font-medium text-muted-foreground">
          {t.emptyDescription}
        </p>
      </div>
    </div>
  )
}
