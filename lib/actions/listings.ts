"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/auth/dal"
import { listingSchema, type ListingInput } from "@/lib/validators/listing.schema"
import { processImageToWebp, ImageTooSmallError } from "@/lib/listings/process-image"
import type { ListingStatus } from "@/types/supabase"

const MAX_IMAGE_SIZE_MB = 5
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

function toRow(input: ListingInput) {
  const {
    propertyType,
    listingType,
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
    listing_type: listingType,
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

export async function uploadListingImage(
  listingId: string,
  position: number,
  formData: FormData
) {
  const file = formData.get("file")
  if (!(file instanceof File)) {
    return { error: "No file provided." }
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { error: `${file.name}: only JPEG, PNG, or WEBP images are allowed.` }
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return { error: `${file.name}: file is larger than ${MAX_IMAGE_SIZE_MB}MB.` }
  }

  const supabase = await createClient()

  let webpBuffer: Buffer
  try {
    const inputBuffer = Buffer.from(await file.arrayBuffer())
    webpBuffer = await processImageToWebp(inputBuffer)
  } catch (err) {
    if (err instanceof ImageTooSmallError) {
      return {
        error: `${file.name}: too small (${err.width}x${err.height}px). Use a photo at least 800x600px.`,
      }
    }
    return { error: `${file.name}: could not process this image.` }
  }

  const storagePath = `${listingId}/${crypto.randomUUID()}.webp`
  const { error: uploadError } = await supabase.storage
    .from("listing-images")
    .upload(storagePath, webpBuffer, {
      contentType: "image/webp",
      upsert: false,
    })

  if (uploadError) {
    return { error: `${file.name}: could not upload this image.` }
  }

  const { error: insertError } = await supabase
    .from("listing_images")
    .insert({ listing_id: listingId, storage_path: storagePath, position })

  if (insertError) {
    await supabase.storage.from("listing-images").remove([storagePath])
    return { error: "Could not attach image." }
  }

  revalidatePath(`/seller/listings/${listingId}/edit`)
  revalidatePath(`/listings/${listingId}`)
  revalidatePath("/listings")
  revalidatePath("/")
  return {}
}

export async function setListingCoverImage(listingId: string, imageId: string) {
  const supabase = await createClient()
  const { data: images, error: fetchError } = await supabase
    .from("listing_images")
    .select("id")
    .eq("listing_id", listingId)
    .order("position", { ascending: true })

  if (fetchError || !images) {
    return { error: "Could not update the featured image." }
  }

  const reordered = [
    imageId,
    ...images.map((img) => img.id).filter((id) => id !== imageId),
  ]

  const results = await Promise.all(
    reordered.map((id, position) =>
      supabase.from("listing_images").update({ position }).eq("id", id)
    )
  )

  if (results.some((r) => r.error)) {
    return { error: "Could not update the featured image." }
  }

  revalidatePath(`/seller/listings/${listingId}/edit`)
  revalidatePath(`/listings/${listingId}`)
  revalidatePath("/listings")
  revalidatePath("/")
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
