import { createDraftListing } from "@/lib/actions/listings"

export default async function NewListingPage() {
  await createDraftListing()
}
