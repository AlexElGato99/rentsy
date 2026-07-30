import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils/format"
import { ListingRowActions } from "@/components/listings/listing-row-actions"
import { Badge } from "@/components/ui/badge"

export default async function AdminListingsPage() {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, city, neighborhood, price, status, owner:profiles(full_name)")
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        All listings
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">
        {listings?.length ?? 0} listings across the platform.
      </p>

      <div className="mt-8 space-y-4">
        {(listings ?? []).map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col gap-4 rounded-2xl border-2 border-foreground bg-card p-5 shadow-brutal-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-extrabold">{listing.title}</p>
                <Badge className="border-2 border-foreground bg-background font-bold text-foreground">
                  {listing.status}
                </Badge>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {[listing.neighborhood, listing.city].filter(Boolean).join(", ")}
                {" · "}
                {formatPrice(listing.price)}/mo
                {" · "}
                Owner: {listing.owner?.full_name ?? "—"}
              </p>
            </div>
            <ListingRowActions listingId={listing.id} status={listing.status} />
          </div>
        ))}
      </div>
    </div>
  )
}
