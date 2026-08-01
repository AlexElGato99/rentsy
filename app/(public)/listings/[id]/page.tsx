import { notFound } from "next/navigation"
import { Bath, Bed, Check, DoorOpen, Mail, MapPin, Phone } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { listingImageUrl } from "@/lib/listings/image-url"
import { formatPrice } from "@/lib/utils/format"
import type { Amenity } from "@/lib/listings/amenities"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Badge } from "@/components/ui/badge"
import { CoverImage } from "@/components/listings/cover-image"

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
  const [supabase, locale] = await Promise.all([createClient(), getLocale()])
  const dict = getDictionary(locale)
  const t = dict.listings.detail

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
  const propertyTypeLabel =
    dict.listings.propertyTypes[
      listing.property_type as keyof typeof dict.listings.propertyTypes
    ] ?? listing.property_type

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      {listing.status !== "published" && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-foreground bg-secondary p-4 font-bold">
          {t.statusNotice} {listing.status} {t.statusNoticeSuffix}
        </div>
      )}

      <div className="grid gap-3 sm:aspect-[16/7] sm:grid-cols-4">
        <div className="relative aspect-[4/3] min-h-0 overflow-hidden rounded-2xl border-2 border-foreground bg-muted sm:aspect-auto sm:col-span-3">
          {gallery[0] ? (
            <CoverImage
              src={listingImageUrl(gallery[0].storage_path)}
              alt={listing.title}
              className="size-full"
            />
          ) : (
            <div className="flex size-full items-center justify-center font-bold text-muted-foreground">
              {t.noPhotos}
            </div>
          )}
        </div>
        <div className="hidden min-h-0 grid-rows-3 gap-3 overflow-hidden sm:grid">
          {gallery.slice(1, 4).map((image) => (
            <div
              key={image.id}
              className="min-h-0 overflow-hidden rounded-2xl border-2 border-foreground bg-muted"
            >
              <CoverImage
                src={listingImageUrl(image.storage_path)}
                alt=""
                className="size-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-2 border-foreground bg-accent font-bold text-accent-foreground">
              {propertyTypeLabel}
            </Badge>
            <Badge className="border-2 border-foreground bg-background font-bold text-foreground">
              {listing.listing_type === "sale" ? t.forSale : t.forRent}
            </Badge>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            {listing.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 font-medium text-muted-foreground">
            <MapPin className="size-4" />
            {[listing.neighborhood, listing.city, listing.country]
              .filter(Boolean)
              .join(", ")}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {listing.bedrooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <Bed className="size-4" /> {listing.bedrooms} {t.bed}
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <Bath className="size-4" /> {listing.bathrooms} {t.bath}
              </span>
            )}
            {listing.rooms != null && (
              <span className="flex items-center gap-2 rounded-xl border-2 border-foreground px-3 py-2 font-bold">
                <DoorOpen className="size-4" /> {listing.rooms} {t.rooms}
              </span>
            )}
          </div>

          {listing.description && (
            <div className="mt-8">
              <h2 className="text-lg font-extrabold">{t.about}</h2>
              <p className="mt-2 leading-relaxed whitespace-pre-line text-muted-foreground">
                {listing.description}
              </p>
            </div>
          )}

          {listing.amenities && listing.amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-extrabold">{t.amenities}</h2>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {listing.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    {dict.amenities[amenity as Amenity] ?? amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {listing.address && (
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {t.address}: {listing.address}
            </p>
          )}
        </div>

        <div className="h-fit rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal">
          <p className="text-2xl font-extrabold">
            {formatPrice(listing.price, listing.currency)}
            {listing.listing_type === "rent" && (
              <span className="text-sm font-medium text-muted-foreground">
                {dict.listings.card.perMonth}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {t.contactTitle}
          </p>

          <div className="mt-5 space-y-2">
            {listing.contact_phone && (
              <a
                href={`tel:${listing.contact_phone}`}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-primary px-4 py-2.5 font-bold text-primary-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <Phone className="size-4" /> {t.call} {listing.contact_phone}
              </a>
            )}
            {listing.contact_whatsapp && (
              <a
                href={whatsappHref(listing.contact_whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-background px-4 py-2.5 font-bold shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                {t.whatsapp}
              </a>
            )}
            {listing.contact_email && (
              <a
                href={`mailto:${listing.contact_email}`}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-background px-4 py-2.5 font-bold shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                <Mail className="size-4" /> {t.email}
              </a>
            )}
            {!listing.contact_phone &&
              !listing.contact_whatsapp &&
              !listing.contact_email && (
                <p className="text-sm text-muted-foreground">{t.noContact}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
