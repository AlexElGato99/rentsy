export const AMENITIES = [
  { value: "wifi", label: "WiFi" },
  { value: "parking", label: "Parking" },
  { value: "air_conditioning", label: "Air conditioning" },
  { value: "heating", label: "Heating" },
  { value: "washing_machine", label: "Washing machine" },
  { value: "kitchen", label: "Kitchen" },
  { value: "tv", label: "TV" },
  { value: "elevator", label: "Elevator" },
  { value: "balcony", label: "Balcony" },
  { value: "garden", label: "Garden" },
  { value: "pool", label: "Pool" },
  { value: "gym", label: "Gym" },
  { value: "pet_friendly", label: "Pet friendly" },
  { value: "furnished", label: "Furnished" },
  { value: "security", label: "24/7 security" },
  { value: "wheelchair_accessible", label: "Wheelchair accessible" },
] as const

export type Amenity = (typeof AMENITIES)[number]["value"]

export const AMENITY_LABELS: Record<Amenity, string> = Object.fromEntries(
  AMENITIES.map((a) => [a.value, a.label])
) as Record<Amenity, string>
