import Link from "next/link"

import { getCurrentProfile } from "@/lib/auth/dal"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { ProfileMenu } from "@/components/layout/profile-menu"

export async function Navbar() {
  const [profile, locale] = await Promise.all([
    getCurrentProfile(),
    getLocale(),
  ])
  const dict = getDictionary(locale)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/listings"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.browse}
          </Link>
          <Link
            href="/about"
            className="hidden rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted sm:inline-block"
          >
            {dict.common.nav.about}
          </Link>

          {profile ? (
            <ProfileMenu
              name={profile.full_name}
              role={profile.role}
              dict={dict.profileMenu}
              logOutLabel={dict.common.nav.logOut}
            />
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {dict.common.nav.logIn}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">{dict.common.nav.signUp}</Button>
              </Link>
            </>
          )}

          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  )
}
