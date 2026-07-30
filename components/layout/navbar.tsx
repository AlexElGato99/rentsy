import Link from "next/link"

import { getCurrentProfile } from "@/lib/auth/dal"
import { logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"

export async function Navbar() {
  const profile = await getCurrentProfile()

  const dashboardHref =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "seller"
        ? "/seller/dashboard"
        : "/account"

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/listings"
            className="rounded-xl px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            Browse rentals
          </Link>

          {profile ? (
            <>
              <Link href={dashboardHref}>
                <Button variant="ghost" size="sm">
                  {profile.full_name ?? "My account"}
                </Button>
              </Link>
              <form action={logout}>
                <Button type="submit" variant="outline" size="sm">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
