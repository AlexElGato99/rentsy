import { MessageCircle, ShieldCheck, Wallet } from "lucide-react"

const VALUES = [
  {
    icon: Wallet,
    title: "Free, always",
    description:
      "Listing a property on Rentsy costs nothing, and we never take a cut of your rent.",
  },
  {
    icon: MessageCircle,
    title: "Direct connections",
    description:
      "Renters and owners talk to each other directly — no call centers, no middlemen.",
  },
  {
    icon: ShieldCheck,
    title: "Built on trust",
    description:
      "Every account is verified at sign-up, and reviews keep the community honest.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        About Rentsy
      </h1>
      <p className="mt-4 max-w-2xl text-lg font-medium text-muted-foreground">
        Rentsy is a marketplace for renting apartments, houses, and rooms
        &mdash; listed directly by the people who own them. We built it
        because finding (or renting out) a place shouldn&apos;t mean paying
        fees to a middleman.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm"
          >
            <span className="flex size-12 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Our story</h2>
        <p className="leading-relaxed font-medium text-muted-foreground">
          Rentsy started from a simple frustration: renting a home online
          usually means handing your search over to a platform that charges
          fees on both sides and buries listings behind paywalls and
          subscriptions. We thought owners and renters deserved a simpler,
          more direct way to find each other.
        </p>
        <p className="leading-relaxed font-medium text-muted-foreground">
          Today, Rentsy lets any property owner create a free account and
          publish a listing in minutes, and lets renters browse, filter, and
          reach out to owners directly &mdash; by phone, WhatsApp, or email.
          No commissions, no hidden fees, no waiting on a callback.
        </p>
      </div>
    </div>
  )
}
