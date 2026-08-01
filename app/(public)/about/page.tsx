import {
  Clock,
  GraduationCap,
  Handshake,
  Heart,
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react"

import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const MISSION_ICONS = [Search, Handshake, Wallet, ShieldCheck, Heart, GraduationCap]
const OFFER_ICONS = [Search, Home, MessageCircle, ImageIcon, Clock, LayoutDashboard]

export default async function AboutPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.about

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
          <Sparkles className="size-4" />
          {t.badge}
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-muted-foreground text-balance">
          {t.subtitle}
        </p>
      </div>

      <section className="mx-auto mt-14 max-w-3xl rounded-3xl border-2 border-foreground bg-card p-6 shadow-brutal sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.story.title}</h2>
        <div className="mx-auto mt-4 max-w-xl space-y-4">
          {t.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed font-medium text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <p className="font-extrabold">{t.story.punchline}</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.mission.title}</h2>
        <p className="mx-auto mt-2 max-w-md font-medium text-muted-foreground">
          {t.mission.subtitle}
        </p>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.mission.items.map((text, index) => {
            const Icon = MISSION_ICONS[index]
            return (
              <div
                key={text}
                className="flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <p className="font-bold">{text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.offer.title}</h2>
        <p className="mx-auto mt-2 max-w-md font-medium text-muted-foreground">
          {t.offer.subtitle}
        </p>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.offer.items.map((text, index) => {
            const Icon = OFFER_ICONS[index]
            return (
              <div
                key={text}
                className="flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <p className="font-bold">{text}</p>
              </div>
            )
          })}
        </div>
        <p className="mx-auto mt-6 max-w-md font-medium text-muted-foreground">
          {t.offer.footer}
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-3xl rounded-3xl border-2 border-foreground bg-secondary/60 p-6 shadow-brutal-sm sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight">{t.vision.title}</h2>
        {t.vision.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "mx-auto mt-4 max-w-xl leading-relaxed font-medium text-muted-foreground"
                : "mx-auto mt-3 max-w-xl leading-relaxed font-medium text-muted-foreground"
            }
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mx-auto mt-14 flex max-w-3xl flex-col items-center rounded-3xl border-2 border-foreground bg-primary px-6 py-14 shadow-brutal">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground">
          {t.thanks.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-medium text-primary-foreground/80">
          {t.thanks.subtitle}
        </p>
        <div className="mt-6 rounded-xl border-2 border-foreground bg-background px-5 py-3 shadow-brutal-sm">
          <p className="text-lg font-extrabold">{t.thanks.brand}</p>
          <p className="text-sm font-bold text-muted-foreground">{t.thanks.tagline}</p>
        </div>
      </section>
    </div>
  )
}
