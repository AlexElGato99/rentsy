import Link from "next/link"

import { Logo } from "@/components/layout/logo"

const COLUMNS = [
  {
    title: "Renters",
    links: [
      { label: "Browse listings", href: "/listings" },
      { label: "Create an account", href: "/signup" },
    ],
  },
  {
    title: "Owners",
    links: [
      { label: "List your property", href: "/signup" },
      { label: "Seller dashboard", href: "/seller/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm font-medium text-muted-foreground">
              Apartments, houses, and rooms listed directly by owners &mdash;
              no middleman, no platform fees.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-extrabold">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-foreground pt-6 sm:flex-row">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} Rentsy. All rights reserved.
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            Built for renters and owners, everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
