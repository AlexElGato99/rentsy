import { SearchX } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/listings/listing-card"
import { PROPERTY_TYPES } from "@/lib/validators/listing.schema"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; type?: string }>
}) {
  const { city, type } = await searchParams
  const [supabase, locale] = await Promise.all([createClient(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.listings.browse

  let query = supabase
    .from("listings")
    .select(
      "id, title, price, currency, listing_type, city, country, neighborhood, bedrooms, bathrooms, status, listing_images(storage_path, position)"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (city) {
    query = query.or(`city.ilike.%${city}%,neighborhood.ilike.%${city}%`)
  }
  if (type && (PROPERTY_TYPES as readonly string[]).includes(type)) {
    query = query.eq(
      "property_type",
      type as (typeof PROPERTY_TYPES)[number]
    )
  }

  const { data: listings } = await query
  const count = listings?.length ?? 0

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">{t.title}</h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {count} {count === 1 ? t.place : t.places} {t.countSuffix}
        {city ? ` ${t.inCity(city)}` : ""}.
      </p>

      {listings && listings.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
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
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-foreground py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl border-2 border-foreground bg-accent shadow-brutal-sm">
            <SearchX className="size-6" />
          </span>
          <p className="text-lg font-extrabold">{t.emptyTitle}</p>
          <p className="max-w-sm text-sm font-medium text-muted-foreground">
            {t.emptyDescription}
          </p>
        </div>
      )}
    </div>
  )
}
