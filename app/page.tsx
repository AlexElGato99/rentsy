import Link from "next/link"
import { MessageCircle, ShieldCheck, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/listings/search-bar"

const FEATURES = [
  {
    icon: Wallet,
    title: "No platform fees",
    description:
      "List for free and contact owners directly. Rentsy never takes a cut of your rent.",
  },
  {
    icon: MessageCircle,
    title: "Message owners directly",
    description:
      "Ask questions and arrange viewings right from the listing, no phone tag required.",
  },
  {
    icon: ShieldCheck,
    title: "Real listings, real owners",
    description:
      "Every account is verified through sign-up, and reviews keep everyone honest.",
  },
]

const STEPS = [
  {
    step: "1",
    title: "Search your area",
    description: "Filter by city, neighborhood, price, and number of rooms.",
  },
  {
    step: "2",
    title: "Message the owner",
    description: "Ask questions or request a viewing straight from the listing.",
  },
  {
    step: "3",
    title: "Move in",
    description: "Agree on the details together and arrange your rental directly.",
  },
]

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b-2 border-foreground bg-accent/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
            Free for owners &middot; No hidden fees
          </span>
          <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Find your next place to rent
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-muted-foreground text-balance">
            Apartments, houses, and rooms listed directly by owners. Browse,
            message, and arrange your rental &mdash; no middleman.
          </p>

          <div className="mt-10 w-full">
            <SearchBar />
          </div>

          <div className="mt-6">
            <Link href="/signup">
              <Button variant="outline" size="sm">
                Own a property? List it for free &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="text-sm font-medium text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-foreground bg-secondary/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div
                key={step}
                className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full border-2 border-foreground bg-accent text-lg font-extrabold shadow-brutal-sm">
                  {step}
                </span>
                <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center rounded-3xl border-2 border-foreground bg-primary px-6 py-14 text-center shadow-brutal">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground">
            Have a property to rent out?
          </h2>
          <p className="mx-auto mt-2 max-w-md font-medium text-primary-foreground/80">
            Create a free seller account and publish your listing in minutes.
          </p>
          <div className="mt-6">
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="bg-background"
              >
                List your property
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
