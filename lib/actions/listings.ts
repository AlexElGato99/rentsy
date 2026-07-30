"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/auth/dal"
import { listingSchema, type ListingInput } from "@/lib/validators/listing.schema"
import type { ListingStatus } from "@/types/supabase"

function toRow(input: ListingInput) {
  const {
    propertyType,
    contactEmail,
    contactPhone,
    contactWhatsapp,
    description,
    neighborhood,
    address,
    ...rest
  } = input
  return {
    ...rest,
    description: description || null,
    neighborhood: neighborhood || null,
    address: address || null,
    property_type: propertyType,
    contact_email: contactEmail || null,
    contact_phone: contactPhone || null,
    contact_whatsapp: contactWhatsapp || null,
  }
}

export async function createDraftListing() {
  const profile = await getCurrentProfile()
  if (!profile || (profile.role !== "seller" && profile.role !== "admin")) {
    redirect("/seller/dashboard")
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("listings")
    .insert({
      owner_id: profile.id,
      title: "Untitled listing",
      property_type: "apartment",
      price: 0,
      city: "",
      status: "unpublished",
    })
    .select("id")
    .single()

  if (error || !data) {
    redirect("/seller/dashboard")
  }

  redirect(`/seller/listings/${data.id}/edit?created=1`)
}

export async function updateListing(listingId: string, input: ListingInput) {
  const validated = listingSchema.safeParse(input)
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? "Invalid input." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("listings")
    .update(toRow(validated.data))
    .eq("id", listingId)
    .select("id")
    .single()

  if (error || !data) {
    return { error: "Listing not found or you don't have permission to edit it." }
  }

  revalidatePath("/seller/dashboard")
  revalidatePath(`/listings/${listingId}`)
  revalidatePath(`/seller/listings/${listingId}/edit`)
  return {}
}

export async function deleteListing(listingId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listingId)
    .select("id")
    .single()

  if (error || !data) {
    return {
      error: "Listing not found or you don't have permission to delete it.",
    }
  }

  revalidatePath("/seller/dashboard")
  revalidatePath("/admin/listings")
  revalidatePath("/listings")
  return {}
}

export async function setListingStatus(
  listingId: string,
  status: ListingStatus
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("listings")
    .update({ status })
    .eq("id", listingId)
    .select("id")
    .single()

  if (error || !data) {
    return {
      error: "Listing not found or you don't have permission to change it.",
    }
  }

  revalidatePath("/seller/dashboard")
  revalidatePath("/admin/listings")
  revalidatePath(`/listings/${listingId}`)
  revalidatePath("/listings")
  return {}
}

export async function attachListingImage(
  listingId: string,
  storagePath: string,
  position: number
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("listing_images")
    .insert({ listing_id: listingId, storage_path: storagePath, position })

  if (error) {
    return { error: "Could not attach image." }
  }

  revalidatePath(`/seller/listings/${listingId}/edit`)
  return {}
}

export async function deleteListingImage(imageId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("listing_images")
    .delete()
    .eq("id", imageId)
    .select("id, listing_id, storage_path")
    .single()

  if (error || !data) {
    return { error: "Image not found or you don't have permission to remove it." }
  }

  await supabase.storage.from("listing-images").remove([data.storage_path])

  revalidatePath(`/seller/listings/${data.listing_id}/edit`)
  return {}
}
