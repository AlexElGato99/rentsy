import { Heart } from "lucide-react"

import { getCurrentProfile } from "@/lib/auth/dal"
import { ProfileForm } from "@/components/account/profile-form"

export default async function AccountPage() {
  const profile = await getCurrentProfile()

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Welcome, {profile?.full_name ?? "there"}
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        Manage your profile, favorites, messages, and reviews.
      </p>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">Your profile</h2>
        <ProfileForm
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
        <p className="text-lg font-extrabold">Nothing here yet</p>
        <p className="max-w-sm text-sm font-medium text-muted-foreground">
          Favorites, messaging, and reviews are coming in later phases.
        </p>
      </div>
    </div>
  )
}
