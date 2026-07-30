import { z } from "zod"

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

export const listingSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(120),
  description: z.string().trim().max(2000).optional(),
  propertyType: z.enum(PROPERTY_TYPES),
  price: z.number().positive("Enter a valid monthly price."),
  bedrooms: z.number().int().min(0).max(50).optional(),
  bathrooms: z.number().int().min(0).max(50).optional(),
  rooms: z.number().int().min(0).max(50).optional(),
  city: z.string().trim().min(1, "City is required.").max(120),
  neighborhood: z.string().trim().max(120).optional(),
  address: z.string().trim().max(255).optional(),
  contactPhone: z.string().trim().max(40).optional(),
  contactWhatsapp: z.string().trim().max(40).optional(),
  contactEmail: z.union([z.literal(""), z.email("Enter a valid email.")]).optional(),
})

export type ListingInput = z.infer<typeof listingSchema>
