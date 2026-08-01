import Link from "next/link"
import { Building2, ShieldCheck, UserCheck, Users } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LOCALE_DIR } from "@/lib/i18n/config"

export default async function AdminDashboardPage() {
  const [supabase, locale] = await Promise.all([createClient(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.dashboard.admin
  const arrow = LOCALE_DIR[locale] === "rtl" ? "←" : "→"

  const [
    { count: totalUsers },
    { count: totalSellers },
    { count: totalCustomers },
    { count: totalListings },
    { count: publishedListings },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "seller"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer"),
    supabase.from("listings").select("*", { count: "exact", head: true }),
    supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
  ])

  const stats = [
    { label: t.totalUsers, value: totalUsers ?? 0, icon: Users },
    { label: t.sellers, value: totalSellers ?? 0, icon: UserCheck },
    { label: t.customers, value: totalCustomers ?? 0, icon: ShieldCheck },
    { label: t.publishedListings, value: publishedListings ?? 0, icon: Building2 },
  ]

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">{t.title}</h1>
      <p className="mt-2 font-medium text-muted-foreground">{t.subtitle}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border-2 border-foreground bg-card p-5 shadow-brutal-sm"
          >
            <span className="flex size-10 items-center justify-center rounded-xl border-2 border-foreground bg-accent">
              <Icon className="size-4.5" />
            </span>
            <p className="mt-3 text-3xl font-extrabold">{value}</p>
            <p className="text-sm font-bold text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/users"
          className="flex items-center justify-between rounded-2xl border-2 border-foreground bg-primary p-6 font-extrabold text-primary-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          {t.manageUsers} {arrow}
        </Link>
        <Link
          href="/admin/listings"
          className="flex items-center justify-between rounded-2xl border-2 border-foreground bg-background p-6 font-extrabold shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          {t.moderateListings} ({totalListings ?? 0}) {arrow}
        </Link>
      </div>
    </div>
  )
}
