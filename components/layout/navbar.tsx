import Link from "next/link"

import { getCurrentProfile } from "@/lib/auth/dal"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { ProfileMenu } from "@/components/layout/profile-menu"
import { MobileNav } from "@/components/layout/mobile-nav"

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

        <nav className="hidden items-center gap-2 sm:flex sm:gap-3">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.home}
          </Link>
          <Link
            href="/listings"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.browse}
          </Link>
          <Link
            href="/about"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.about}
          </Link>
          <Link
            href="/faq"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.faq}
          </Link>
          <Link
            href="/contact"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            {dict.common.nav.contact}
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

        <MobileNav
          profile={
            profile ? { full_name: profile.full_name, role: profile.role } : null
          }
          nav={dict.common.nav}
          profileMenu={dict.profileMenu}
          locale={locale}
        />
      </div>
    </header>
  )
}
