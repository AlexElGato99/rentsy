import Link from "next/link"
import { Bath, Bed, MapPin } from "lucide-react"

import type { ListingStatus } from "@/types/supabase"
import { listingImageUrl } from "@/lib/listings/image-url"
import { formatPrice } from "@/lib/utils/format"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import en from "@/lib/i18n/dictionaries/en"
import { Badge } from "@/components/ui/badge"
import { CoverImage } from "@/components/listings/cover-image"

export type ListingCardData = {
  id: string
  title: string
  price: number
  currency?: string
  listingType?: "rent" | "sale"
  city: string
  country?: string | null
  neighborhood?: string | null
  bedrooms?: number | null
  bathrooms?: number | null
  status?: ListingStatus
  coverImagePath?: string | null
  dict?: Dictionary["listings"]["card"]
}

export function ListingCard({
  id,
  title,
  price,
  currency = "USD",
  listingType = "rent",
  city,
  country,
  neighborhood,
  bedrooms,
  bathrooms,
  status,
  coverImagePath,
  dict = en.listings.card,
}: ListingCardData) {
  return (
    <Link
      href={`/listings/${id}`}
      className="group block overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
    >
      <div className="relative aspect-4/3 overflow-hidden border-b-2 border-foreground bg-muted">
        {coverImagePath ? (
          <CoverImage
            src={listingImageUrl(coverImagePath)}
            alt={title}
            className="size-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-bold text-muted-foreground">
            {dict.noPhoto}
          </div>
        )}
        {status && status !== "published" && (
          <Badge className="absolute top-2 start-2 border-2 border-foreground bg-background font-bold text-foreground">
            {status}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-extrabold">
          {formatPrice(price, currency)}
          {listingType === "rent" && (
            <span className="text-sm font-medium text-muted-foreground">
              {dict.perMonth}
            </span>
          )}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">
            {[neighborhood, city, country].filter(Boolean).join(", ")}
          </span>
        </p>
        <p className="mt-2 truncate font-bold">{title}</p>
        {(bedrooms != null || bathrooms != null) && (
          <div className="mt-2 flex gap-3 text-sm font-medium text-muted-foreground">
            {bedrooms != null && (
              <span className="flex items-center gap-1">
                <Bed className="size-3.5" />
                {bedrooms}
              </span>
            )}
            {bathrooms != null && (
              <span className="flex items-center gap-1">
                <Bath className="size-3.5" />
                {bathrooms}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
