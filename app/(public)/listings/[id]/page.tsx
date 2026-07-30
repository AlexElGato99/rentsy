import { notFound } from "next/navigation"
import { Bath, Bed, DoorOpen, Mail, MapPin, Phone } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { listingImageUrl } from "@/lib/listings/image-url"
import { formatPrice } from "@/lib/utils/format"
import { Badge } from "@/components/ui/badge"

function whatsappHref(value: string) {
  const digits = value.replace(/[^0-9]/g, "")
  return `https://wa.me/${digits}`
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single()

  if (!listing) notFound()

  const { data: images } = await supabase
    .from("listing_images")
    .select("id, storage_path")
    .eq("listing_id", id)
    .order("position", { ascending: true })

  const gallery = images ?? []

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      {listing.status !== "published" && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-foreground bg-secondary p-4 font-bold">
          This listing is {listing.status} &mdash; only you and admins can see
          it.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="overflow-hidden rounded-2xl border-2 border-foreground bg-muted sm:col-span-3">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listingImageUrl(gallery[0].storage_path)}
              alt={listing.title}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center font-bold text-muted-foreground sm:aspect-[16/9]">
              No photos yet
            </div>
          )}
        </div>
        <div className="hidden grid-rows-3 gap-3 sm:grid">
          {gallery.slice(1, 4).map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border-2 border-foreground bg-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listingImageUrl(image.storage_path)}
                alt=""
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-2 border-foreground bg-accent font-bold text-accent-foreground">
              {listing.property_type}
            </Badge>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            {listing.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 font-medium text-muted-foreground">
            <MapPin className="size-4" />
            {[listing.neighborhood, listing.city].filter(Boolean).join(", ")}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {listing.bedrooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <Bed className="size-4" /> {listing.bedrooms} bed
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <Bath className="size-4" /> {listing.bathrooms} bath
              </span>
            )}
            {listing.rooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <DoorOpen className="size-4" /> {listing.rooms} rooms
              </span>
            )}
          </div>

          {listing.description && (
            <div className="mt-8">
              <h2 className="text-lg font-extrabold">About this place</h2>
              <p className="mt-2 leading-relaxed whitespace-pre-line text-muted-foreground">
                {listing.description}
              </p>
            </div>
          )}

          {listing.address && (
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              Address: {listing.address}
            </p>
          )}
        </div>

        <div className="h-fit rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal">
          <p className="text-2xl font-extrabold">
            {formatPrice(listing.price)}
            <span className="text-sm font-medium text-muted-foreground">
              /mo
            </span>
          </p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Contact the owner directly to arrange a viewing.
          </p>

          <div className="mt-5 space-y-2">
            {listing.contact_phone && (
              <a
                href={`tel:${listing.contact_phone}`}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-primary px-4 py-2.5 font-bold text-primary-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <Phone className="size-4" /> Call {listing.contact_phone}
              </a>
            )}
            {listing.contact_whatsapp && (
              <a
                href={whatsappHref(listing.contact_whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-background px-4 py-2.5 font-bold shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                WhatsApp
              </a>
            )}
            {listing.contact_email && (
              <a
                href={`mailto:${listing.contact_email}`}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-background px-4 py-2.5 font-bold shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <Mail className="size-4" /> Email
              </a>
            )}
            {!listing.contact_phone &&
              !listing.contact_whatsapp &&
              !listing.contact_email && (
                <p className="text-sm text-muted-foreground">
                  No contact info was provided for this listing.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
