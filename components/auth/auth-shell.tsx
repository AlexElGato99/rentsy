import { CheckCircle2 } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  dict,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
  dict: Dictionary
}) {
  const auth = dict.auth
  return (
    <div className="flex flex-1 items-center bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-stretch">
        <div className="relative hidden flex-col justify-between gap-8 overflow-hidden rounded-3xl border-2 border-foreground bg-primary p-10 shadow-brutal lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #111111 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          <span className="relative flex items-center gap-2 text-xl font-extrabold">
            <span className="flex size-9 items-center justify-center rounded-xl border-2 border-foreground bg-background shadow-brutal-sm">
              R
            </span>
            {dict.common.siteName}
          </span>

          <div className="relative rounded-2xl border-2 border-foreground bg-background p-6 shadow-brutal">
            <p className="text-2xl leading-snug font-extrabold text-balance">
              {auth.testimonial}
            </p>
            <p className="mt-4 text-sm font-bold text-muted-foreground">
              {auth.testimonialAuthor}
            </p>
          </div>

          <ul className="relative space-y-3">
            {auth.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm font-bold text-primary-foreground"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background">
                  <CheckCircle2 className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>

          <div className="flex w-full flex-1 flex-col rounded-3xl border-2 border-foreground bg-card p-6 shadow-brutal sm:p-8">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1 mb-7 font-medium text-muted-foreground">
              {subtitle}
            </p>
            {children}
            <p className="mt-auto pt-6 text-center text-sm font-medium text-muted-foreground">
              {footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
