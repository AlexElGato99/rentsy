import Link from "next/link"
import { Mail, MessageCircleQuestion, Send } from "lucide-react"

import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const SUPPORT_EMAIL = "support@rentsy.com"

export default async function ContactPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.contact

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
        <Send className="size-4" />
        {t.badge}
      </span>
      <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {t.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-muted-foreground text-balance">
        {t.subtitle}
      </p>

      <div className="mx-auto mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
        <Link
          href={`mailto:${SUPPORT_EMAIL}`}
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
            <Mail className="size-5" />
          </span>
          <p className="font-extrabold">{t.emailTitle}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {t.emailDescription}
          </p>
          <p className="font-bold text-primary underline-offset-4 group-hover:underline">
            {SUPPORT_EMAIL}
          </p>
        </Link>

        <Link
          href="/faq"
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-accent text-accent-foreground">
            <MessageCircleQuestion className="size-5" />
          </span>
          <p className="font-extrabold">{t.faqTitle}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {t.faqDescription}
          </p>
          <p className="font-bold text-primary underline-offset-4 group-hover:underline">
            {t.faqCta}
          </p>
        </Link>
      </div>
    </div>
  )
}
