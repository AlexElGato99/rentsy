"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Globe,
  LogOut,
  Menu,
  Plus,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"

import { logout } from "@/lib/actions/auth"
import { setLocale } from "@/lib/actions/locale"
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import type { RoleType } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"

const linkClassName =
  "flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-bold text-foreground hover:bg-muted"

export function MobileNav({
  profile,
  nav,
  profileMenu,
  locale,
}: {
  profile: { full_name: string | null; role: RoleType } | null
  nav: Dictionary["common"]["nav"]
  profileMenu: Dictionary["profileMenu"]
  locale: Locale
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  function close() {
    setOpen(false)
  }

  function handleLocale(next: Locale) {
    if (next === locale) return
    setLocale(next).then(() => {
      close()
      router.refresh()
    })
  }

  const navLinks = [
    { href: "/", label: nav.home },
    { href: "/listings", label: nav.browse },
    { href: "/about", label: nav.about },
    { href: "/faq", label: nav.faq },
    { href: "/contact", label: nav.contact },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="sm:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-background transition-transform duration-300 ease-out sm:hidden",
          open ? "translate-y-0" : "-translate-y-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b-2 border-foreground px-4">
          <Logo />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close menu"
            onClick={close}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={linkClassName}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-3 border-t-2 border-foreground/10" />

          {profile ? (
            <>
              {profile.full_name && (
                <p className="px-4 py-1 text-sm font-bold text-muted-foreground">
                  {profile.full_name}
                </p>
              )}
              {profile.role === "seller" && (
                <>
                  <Link
                    href="/seller/listings/new"
                    onClick={close}
                    className={linkClassName}
                  >
                    <Plus className="size-5" />
                    {profileMenu.addNewListing}
                  </Link>
                  <Link
                    href="/seller/dashboard"
                    onClick={close}
                    className={linkClassName}
                  >
                    <Settings className="size-5" />
                    {profileMenu.myListings}
                  </Link>
                  <Link
                    href="/seller/dashboard#account-settings"
                    onClick={close}
                    className={linkClassName}
                  >
                    <Settings className="size-5" />
                    {profileMenu.accountSettings}
                  </Link>
                </>
              )}
              {profile.role === "admin" && (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={close}
                    className={linkClassName}
                  >
                    <ShieldCheck className="size-5" />
                    {profileMenu.adminDashboard}
                  </Link>
                  <Link
                    href="/admin/listings"
                    onClick={close}
                    className={linkClassName}
                  >
                    <Settings className="size-5" />
                    {profileMenu.manageListings}
                  </Link>
                  <Link
                    href="/admin/users"
                    onClick={close}
                    className={linkClassName}
                  >
                    <Users className="size-5" />
                    {profileMenu.manageUsers}
                  </Link>
                </>
              )}
              {profile.role === "customer" && (
                <Link href="/account" onClick={close} className={linkClassName}>
                  <Settings className="size-5" />
                  {profileMenu.accountSettings}
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  close()
                  logout()
                }}
                className={cn(
                  linkClassName,
                  "w-full text-left text-destructive hover:bg-destructive/10"
                )}
              >
                <LogOut className="size-5" />
                {nav.logOut}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 px-1 pt-2">
              <Link href="/login" onClick={close}>
                <Button variant="outline" size="lg" className="w-full">
                  {nav.logIn}
                </Button>
              </Link>
              <Link href="/signup" onClick={close}>
                <Button size="lg" className="w-full">
                  {nav.signUp}
                </Button>
              </Link>
            </div>
          )}

          <div className="my-3 border-t-2 border-foreground/10" />

          <div className="flex items-center gap-2 px-4 py-2">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleLocale(code)}
                className={cn(
                  "rounded-lg border-2 border-foreground px-3 py-1.5 text-sm font-bold",
                  code === locale
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                )}
              >
                {LOCALE_LABELS[code]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
