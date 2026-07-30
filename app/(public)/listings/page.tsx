import { SearchX } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/listings/listing-card"
import { PROPERTY_TYPES } from "@/lib/validators/listing.schema"

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; type?: string }>
}) {
  const { city, type } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("listings")
    .select(
      "id, title, price, city, neighborhood, bedrooms, bathrooms, status, listing_images(storage_path, position)"
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Browse listings
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {listings?.length ?? 0} place{listings?.length === 1 ? "" : "s"}{" "}
        available{city ? ` in "${city}"` : ""}.
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
                city={listing.city}
                neighborhood={listing.neighborhood}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                coverImagePath={cover?.storage_path}
              />
            )
          })}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-foreground py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl border-2 border-foreground bg-accent shadow-brutal-sm">
            <SearchX className="size-6" />
          </span>
          <p className="text-lg font-extrabold">No listings found</p>
          <p className="max-w-sm text-sm font-medium text-muted-foreground">
            Try a different city, or check back later as more sellers publish
            properties.
          </p>
        </div>
      )}
    </div>
  )
}
