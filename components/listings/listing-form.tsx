"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ChevronDown } from "lucide-react"

import { updateListing } from "@/lib/actions/listings"
import {
  listingSchema,
  PROPERTY_TYPES,
  LISTING_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  ROOM_OPTIONS,
  type ListingInput,
} from "@/lib/validators/listing.schema"
import { AMENITIES } from "@/lib/listings/amenities"
import { COUNTRIES } from "@/lib/listings/countries"
import { CITIES_BY_COUNTRY } from "@/lib/listings/cities"
import { CURRENCIES } from "@/lib/listings/currencies"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import en from "@/lib/i18n/dictionaries/en"
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
import { ComboboxWithOther } from "@/components/ui/combobox-with-other"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const DEFAULT_VALUES: ListingInput = {
  title: "",
  description: undefined,
  propertyType: "apartment",
  listingType: "rent",
  price: 0,
  currency: "MAD",
  bedrooms: undefined,
  bathrooms: undefined,
  rooms: undefined,
  amenities: [],
  country: "Morocco",
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
  dict = en.listingForm,
  amenityLabels = en.amenities,
  propertyTypeLabels = en.listings.propertyTypes,
}: {
  listingId: string
  defaultValues?: Partial<ListingInput>
  dict?: Dictionary["listingForm"]
  amenityLabels?: Dictionary["amenities"]
  propertyTypeLabels?: Dictionary["listings"]["propertyTypes"]
}) {
  const [isPending, startTransition] = useTransition()

  const propertyTypeOptions = PROPERTY_TYPES.map((type) => ({
    value: type,
    label: propertyTypeLabels[type],
  }))

  const listingTypeOptions = LISTING_TYPES.map((type) => ({
    value: type,
    label: type === "rent" ? dict.forRent : dict.forSale,
  }))

  const bedroomOptions = BEDROOM_OPTIONS.map((n) => ({
    value: String(n),
    label: n === 0 ? propertyTypeOptions[2].label : n === 5 ? "5+" : String(n),
  }))
  const bathroomOptions = BATHROOM_OPTIONS.map((n) => ({
    value: String(n),
    label: n === 5 ? "5+" : String(n),
  }))
  const roomOptions = ROOM_OPTIONS.map((n) => ({
    value: String(n),
    label: n === 6 ? "6+" : String(n),
  }))

  const form = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  })

  const listingType = form.watch("listingType")
  const country = form.watch("country")
  const cityOptions = CITIES_BY_COUNTRY[country] ?? []

  function onSubmit(values: ListingInput) {
    startTransition(async () => {
      const result = await updateListing(listingId, values)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(dict.listingSaved)
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
                <FormLabel>{dict.title}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.titlePlaceholder} {...field} />
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
                <FormLabel>{dict.propertyType}</FormLabel>
                <RadioPills
                  name="propertyType"
                  value={field.value}
                  onChange={field.onChange}
                  options={propertyTypeOptions}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.listingType}</FormLabel>
                <RadioPills
                  name="listingType"
                  value={field.value}
                  onChange={field.onChange}
                  options={listingTypeOptions}
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
                  <FormLabel>
                    {listingType === "sale" ? dict.salePrice : dict.monthlyRent}
                  </FormLabel>
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
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.currency}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={dict.selectCurrency} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.country}</FormLabel>
                  <ComboboxWithOther
                    options={COUNTRIES}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value)
                      form.setValue("city", "")
                    }}
                    placeholder={dict.selectCountry}
                    searchPlaceholder={dict.searchCountries}
                    emptyText={dict.noCountryFound}
                    otherLabel={dict.otherTypeYourOwn}
                    chooseFromListLabel={dict.chooseFromList}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.city}</FormLabel>
                  <ComboboxWithOther
                    key={country}
                    options={cityOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={dict.selectCity}
                    searchPlaceholder={dict.searchCities}
                    emptyText={
                      cityOptions.length > 0
                        ? dict.noCityFound
                        : dict.noCitiesForCountry
                    }
                    otherLabel={dict.otherTypeYourOwn}
                    chooseFromListLabel={dict.chooseFromList}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.neighborhood}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dict.neighborhoodPlaceholder}
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
                  <FormLabel>{dict.address}</FormLabel>
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
                <FormLabel>{dict.bedrooms}</FormLabel>
                <RadioPills
                  name="bedrooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={bedroomOptions}
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
                <FormLabel>{dict.bathrooms}</FormLabel>
                <RadioPills
                  name="bathrooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={bathroomOptions}
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
                <FormLabel>{dict.rooms}</FormLabel>
                <RadioPills
                  name="rooms"
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(v) => field.onChange(Number(v))}
                  options={roomOptions}
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
                <FormLabel>{dict.description}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder={dict.descriptionPlaceholder}
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
          render={({ field }) => {
            const count = field.value?.length ?? 0
            return (
              <FormItem>
                <Collapsible className="rounded-2xl border-2 border-foreground bg-secondary/40">
                  <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 p-4 text-left">
                    <span>
                      <span className="font-extrabold">{dict.extraFeatures}</span>
                      <span className="ms-2 text-sm font-medium text-muted-foreground">
                        {count > 0
                          ? dict.selectedCountTemplate.replace(
                              "{count}",
                              String(count)
                            )
                          : dict.extraFeaturesHint}
                      </span>
                    </span>
                    <ChevronDown className="size-5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {dict.selectEverything}
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
                              {amenityLabels[amenity.value]}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="rounded-2xl border-2 border-foreground bg-secondary/40 p-4">
          <h3 className="font-extrabold">{dict.contactSectionTitle}</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.phone}</FormLabel>
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
                  <FormLabel>{dict.whatsapp}</FormLabel>
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
                  <FormLabel>{dict.email}</FormLabel>
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
          {isPending ? dict.saving : dict.saveChanges}
        </Button>
      </form>
    </Form>
  )
}
