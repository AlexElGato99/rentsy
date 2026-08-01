import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export async function Footer() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  const columns = [
    {
      title: dict.footer.renters.title,
      links: [
        { label: dict.footer.renters.browse, href: "/listings" },
        { label: dict.footer.renters.createAccount, href: "/signup" },
      ],
    },
    {
      title: dict.footer.owners.title,
      links: [
        { label: dict.footer.owners.list, href: "/signup" },
        { label: dict.footer.owners.dashboard, href: "/seller/dashboard" },
      ],
    },
    {
      title: dict.footer.company.title,
      links: [
        { label: dict.footer.company.about, href: "/about" },
        { label: dict.footer.company.faq, href: "/faq" },
        { label: dict.footer.company.contact, href: "/contact" },
        { label: dict.footer.company.terms, href: "/terms" },
        { label: dict.footer.company.privacy, href: "/privacy" },
      ],
    },
  ]

  return (
    <footer className="border-t-2 border-foreground bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm font-medium text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          {columns.map((column) => (
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
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {dict.footer.builtFor}
          </p>
        </div>
      </div>
    </footer>
  )
}
