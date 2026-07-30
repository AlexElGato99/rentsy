import { ListingForm } from "@/components/listings/listing-form"

export default function NewListingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">New listing</h1>
      <p className="mt-2 font-medium text-muted-foreground">
        It goes live immediately after you create it &mdash; you can add
        photos on the next screen.
      </p>

      <div className="mt-8">
        <ListingForm mode="create" />
      </div>
    </div>
  )
}
