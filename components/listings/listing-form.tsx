"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateListing } from "@/lib/actions/listings"
import {
  listingSchema,
  PROPERTY_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  ROOM_OPTIONS,
  type ListingInput,
} from "@/lib/validators/listing.schema"
import { AMENITIES } from "@/lib/listings/amenities"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioPills } from "@/components/ui/radio-pills"

const PROPERTY_TYPE_LABELS: Record<(typeof PROPERTY_TYPES)[number], string> = {
  apartment: "Apartment",
  house: "House",
  studio: "Studio",
  villa: "Villa",
  room: "Room",
  office: "Office",
  land: "Land",
  other: "Other",
}

const BEDROOM_PILL_OPTIONS = BEDROOM_OPTIONS.map((n) => ({
  value: String(n),
  label: n === 0 ? "Studio" : n === 5 ? "5+" : String(n),
}))
const BATHROOM_PILL_OPTIONS = BATHROOM_OPTIONS.map((n) => ({
  value: String(n),
  label: n === 5 ? "5+" : String(n),
}))
const ROOM_PILL_OPTIONS = ROOM_OPTIONS.map((n) => ({
  value: String(n),
  label: n === 6 ? "6+" : String(n),
}))

const DEFAULT_VALUES: ListingInput = {
  title: "",
  description: undefined,
  propertyType: "apartment",
  price: 0,
  bedrooms: undefined,
  bathrooms: undefined,
  rooms: undefined,
  amenities: [],
  city: "",
  neighborhood: undefined,
  address: undefined,
  contactPhone: undefined,
  contactWhatsapp: undefined,
  contactEmail: undefined,
}

export function ListingForm({
  listingId,
  defaultValues,
}: {
  listingId: string
  defaultValues?: Partial<ListingInput>
}) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  })

  function onSubmit(values: ListingInput) {
    startTransition(async () => {
      const result = await updateListing(listingId, values)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Listing saved.")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Bright 2-bedroom near downtown" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property type</FormLabel>
                <RadioPills
                  name="propertyType"
                  value={field.value}
                  onChange={field.onChange}
                  options={PROPERTY_TYPES.map((type) => ({
                    value: type,
                    label: PROPERTY_TYPE_LABELS[type],
                  }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="1"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Casablanca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood / area</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Maarif"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <RadioPills
                  name="bedrooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={BEDROOM_PILL_OPTIONS}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <RadioPills
                  name="bathrooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={BATHROOM_PILL_OPTIONS}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total rooms</FormLabel>
                <RadioPills
                  name="rooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={ROOM_PILL_OPTIONS}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Describe the place, nearby transit, house rules..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-2xl border-2 border-foreground bg-secondary/40 p-4">
                <h3 className="font-extrabold">Features &amp; amenities</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Select everything this place offers.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {AMENITIES.map((amenity) => {
                    const checked = field.value?.includes(amenity.value)
                    return (
                      <label
                        key={amenity.value}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-transparent px-2 py-1.5 hover:border-foreground"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(isChecked) => {
                            const current = field.value ?? []
                            field.onChange(
                              isChecked
                                ? [...current, amenity.value]
                                : current.filter((v) => v !== amenity.value)
                            )
                          }}
                        />
                        <span className="text-sm font-bold">
                          {amenity.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-2xl border-2 border-foreground bg-secondary/40 p-4">
          <h3 className="font-extrabold">Contact info shown to renters</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactWhatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  )
}
