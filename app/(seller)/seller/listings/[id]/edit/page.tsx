import Link from "next/link"
import { notFound } from "next/navigation"

import { getCurrentProfile } from "@/lib/auth/dal"
import { createClient } from "@/lib/supabase/server"
import { ListingForm } from "@/components/listings/listing-form"
import { ImageUploader } from "@/components/listings/image-uploader"
import { ListingRowActions } from "@/components/listings/listing-row-actions"
import type { ListingInput } from "@/lib/validators/listing.schema"

export default async function EditListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string }>
}) {
  const { id } = await params
  const { created } = await searchParams
  const profile = await getCurrentProfile()
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single()

  if (!listing) notFound()
  if (listing.owner_id !== profile?.id && profile?.role !== "admin") notFound()

  const { data: images } = await supabase
    .from("listing_images")
    .select("id, storage_path")
    .eq("listing_id", id)
    .order("position", { ascending: true })

  const isNew = created === "1"

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      {isNew && (
        <div className="mb-6 rounded-2xl border-2 border-foreground bg-accent p-4 font-bold shadow-brutal-sm">
          Your listing draft is ready &mdash; add photos and details below,
          then hit Publish when you&apos;re happy with it.
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isNew ? "Set up your listing" : "Edit listing"}
          </h1>
          <p className="mt-2 font-medium text-muted-foreground">
            <Link
              href={`/listings/${id}`}
              className="underline underline-offset-4"
            >
              View public listing &rarr;
            </Link>
          </p>
        </div>
        <ListingRowActions listingId={id} status={listing.status} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">Photos</h2>
        <ImageUploader listingId={id} images={images ?? []} />
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-lg font-extrabold">Details</h2>
        <ListingForm
          listingId={id}
          defaultValues={{
            title: listing.title === "Untitled listing" ? "" : listing.title,
            description: listing.description ?? undefined,
            propertyType: listing.property_type,
            price: listing.price || 0,
            bedrooms: listing.bedrooms ?? undefined,
            bathrooms: listing.bathrooms ?? undefined,
            rooms: listing.rooms ?? undefined,
            amenities: listing.amenities as ListingInput["amenities"],
            city: listing.city,
            neighborhood: listing.neighborhood ?? undefined,
            address: listing.address ?? undefined,
            contactPhone: listing.contact_phone ?? undefined,
            contactWhatsapp: listing.contact_whatsapp ?? undefined,
            contactEmail: listing.contact_email ?? undefined,
          }}
        />
      </div>
    </div>
  )
}
