import Link from "next/link"
import { ArrowRight, MessageCircle, ShieldCheck, Wallet } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/listings/search-bar"
import { ListingCard } from "@/components/listings/listing-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FEATURE_ICONS = [Wallet, MessageCircle, ShieldCheck]

export default async function Home() {
  const [supabase, locale] = await Promise.all([createClient(), getLocale()])
  const dict = getDictionary(locale)

  const { data: latestListings } = await supabase
    .from("listings")
    .select(
      "id, title, price, currency, listing_type, city, country, neighborhood, bedrooms, bathrooms, listing_images(storage_path, position)"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b-2 border-foreground bg-accent/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
            {dict.home.badge}
          </span>
          <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
            {dict.home.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-muted-foreground text-balance">
            {dict.home.subtitle}
          </p>

          <div className="mt-10 w-full">
            <SearchBar dict={dict.searchBar} />
          </div>

          <div className="mt-6">
            <Link href="/signup">
              <Button variant="outline" size="sm">
                {dict.home.listPropertyCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {latestListings && latestListings.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {dict.home.latest.title}
              </h2>
              <p className="mt-2 font-medium text-muted-foreground">
                {dict.home.latest.subtitle}
              </p>
            </div>
            <Link href="/listings" className="hidden sm:block">
              <Button variant="outline">
                {dict.common.actions.exploreMore}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {latestListings.map((listing) => {
              const cover = [...listing.listing_images].sort(
                (a, b) => a.position - b.position
              )[0]
              return (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  currency={listing.currency}
                  listingType={listing.listing_type}
                  city={listing.city}
                  country={listing.country}
                  neighborhood={listing.neighborhood}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  coverImagePath={cover?.storage_path}
                  dict={dict.listings.card}
                />
              )
            })}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/listings">
              <Button variant="outline">
                {dict.common.actions.exploreMore}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {dict.home.features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index]
            return (
              <div
                key={feature.title}
                className="flex flex-col items-start gap-3 rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-extrabold">{feature.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-y-2 border-foreground bg-secondary/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {dict.home.steps.title}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {dict.home.steps.items.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full border-2 border-foreground bg-accent text-lg font-extrabold shadow-brutal-sm">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {dict.faq.title}
          </h2>
          <p className="mt-2 font-medium text-muted-foreground">
            {dict.faq.subtitle}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border-2 border-foreground bg-card p-6 text-start shadow-brutal-sm sm:p-8">
          <Accordion type="single" collapsible>
            {dict.faq.items.slice(0, 5).map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-extrabold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed font-medium text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/faq">
            <Button variant="outline">
              {dict.faq.viewAll}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center rounded-3xl border-2 border-foreground bg-primary px-6 py-14 text-center shadow-brutal">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground">
            {dict.home.cta.title}
          </h2>
          <p className="mx-auto mt-2 max-w-md font-medium text-primary-foreground/80">
            {dict.home.cta.subtitle}
          </p>
          <div className="mt-6">
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="bg-background"
              >
                {dict.home.cta.button}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
