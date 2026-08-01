import { z } from "zod"

import { AMENITIES } from "@/lib/listings/amenities"

export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "studio",
  "villa",
  "room",
  "office",
  "land",
  "other",
] as const

export const LISTING_TYPES = ["rent", "sale"] as const

export const BEDROOM_OPTIONS = [0, 1, 2, 3, 4, 5] as const
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5] as const
export const ROOM_OPTIONS = [1, 2, 3, 4, 5, 6] as const

const AMENITY_VALUES = AMENITIES.map((a) => a.value) as [string, ...string[]]

export const listingSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(120),
  description: z.string().trim().max(2000).optional(),
  propertyType: z.enum(PROPERTY_TYPES),
  listingType: z.enum(LISTING_TYPES),
  price: z.number().positive("Enter a valid price."),
  currency: z.string().trim().min(1, "Currency is required.").max(10),
  bedrooms: z.number().int().min(0).max(50).optional(),
  bathrooms: z.number().int().min(0).max(50).optional(),
  rooms: z.number().int().min(0).max(50).optional(),
  amenities: z.array(z.enum(AMENITY_VALUES)),
  country: z.string().trim().min(1, "Country is required.").max(120),
  city: z.string().trim().min(1, "City is required.").max(120),
  neighborhood: z.string().trim().max(120).optional(),
  address: z.string().trim().max(255).optional(),
  contactPhone: z.string().trim().max(40).optional(),
  contactWhatsapp: z.string().trim().max(40).optional(),
  contactEmail: z.union([z.literal(""), z.email("Enter a valid email.")]).optional(),
})

export type ListingInput = z.infer<typeof listingSchema>
