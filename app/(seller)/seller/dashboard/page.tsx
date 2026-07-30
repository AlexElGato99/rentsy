import Link from "next/link"
import { Home, Plus } from "lucide-react"

import { getCurrentProfile } from "@/lib/auth/dal"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils/format"
import { Button } from "@/components/ui/button"
import { ListingRowActions } from "@/components/listings/listing-row-actions"
import { ProfileForm } from "@/components/account/profile-form"

export default async function SellerDashboardPage() {
  const profile = await getCurrentProfile()
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, city, neighborhood, price, status")
    .eq("owner_id", profile!.id)
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome, {profile?.full_name ?? "seller"}
          </h1>
          <p className="mt-2 font-medium text-muted-foreground">
            Manage the properties you list for rent.
          </p>
        </div>
        <Link href="/seller/listings/new">
          <Button size="lg">
            <Plus className="size-4.5" />
            New listing
          </Button>
        </Link>
      </div>

      {listings && listings.length > 0 ? (
        <div className="mt-10 space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col gap-4 rounded-2xl border-2 border-foreground bg-card p-5 shadow-brutal-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-extrabold">{listing.title}</p>
                <p className="text-sm font-medium text-muted-foreground">
                  {[listing.neighborhood, listing.city].filter(Boolean).join(", ")}
                  {" · "}
                  {formatPrice(listing.price)}/mo
                </p>
              </div>
              <ListingRowActions
                listingId={listing.id}
                status={listing.status}
                editHref={`/seller/listings/${listing.id}/edit`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-foreground py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl border-2 border-foreground bg-accent shadow-brutal-sm">
            <Home className="size-6" />
          </span>
          <p className="text-lg font-extrabold">No listings yet</p>
          <p className="max-w-sm text-sm font-medium text-muted-foreground">
            Create your first listing to start hearing from renters.
          </p>
          <Link href="/seller/listings/new" className="mt-2">
            <Button>
              <Plus className="size-4.5" />
              New listing
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-14">
        <h2 className="mb-3 text-lg font-extrabold">Account settings</h2>
        <ProfileForm
          defaultValues={{
            fullName: profile?.full_name ?? "",
            phone: profile?.phone ?? undefined,
            whatsapp: profile?.whatsapp ?? undefined,
          }}
        />
      </div>
    </div>
  )
}
