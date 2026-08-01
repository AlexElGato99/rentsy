import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils/format"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { ListingRowActions } from "@/components/listings/listing-row-actions"
import { Badge } from "@/components/ui/badge"

export default async function AdminListingsPage() {
  const [supabase, locale] = await Promise.all([createClient(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.dashboard.admin

  const { data: listings } = await supabase
    .from("listings")
    .select(
      "id, title, city, neighborhood, price, currency, listing_type, status, owner:profiles(full_name)"
    )
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {t.allListingsTitle}
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {listings?.length ?? 0} {t.allListingsSubtitle}
      </p>

      <div className="mt-8 space-y-4">
        {(listings ?? []).map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col gap-4 rounded-2xl border-2 border-foreground bg-card p-5 shadow-brutal-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-extrabold">{listing.title}</p>
                <Badge className="shrink-0 border-2 border-foreground bg-background font-bold text-foreground">
                  {listing.status}
                </Badge>
              </div>
              <p className="truncate text-sm font-medium text-muted-foreground">
                {[listing.neighborhood, listing.city].filter(Boolean).join(", ")}
                {" · "}
                {formatPrice(listing.price, listing.currency)}
                {listing.listing_type === "rent" ? dict.listings.card.perMonth : ""}
                {" · "}
                {t.owner}: {listing.owner?.full_name ?? "—"}
              </p>
            </div>
            <ListingRowActions
              listingId={listing.id}
              status={listing.status}
              dict={dict.dashboard.rowActions}
              actionsDict={dict.common.actions}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
