"use client"

import { useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { attachListingImage, deleteListingImage } from "@/lib/actions/listings"
import { listingImageUrl } from "@/lib/listings/image-url"

const MAX_IMAGES = 10
const MAX_SIZE_MB = 5
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

type ExistingImage = { id: string; storage_path: string }

export function ImageUploader({
  listingId,
  images,
}: {
  listingId: string
  images: ExistingImage[]
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`You can upload up to ${MAX_IMAGES} photos per listing.`)
      return
    }

    const validFiles = files.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: only JPEG, PNG, or WEBP images are allowed.`)
        return false
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name}: file is larger than ${MAX_SIZE_MB}MB.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setIsUploading(true)
    const supabase = createClient()

    for (const [index, file] of validFiles.entries()) {
      const ext = file.name.split(".").pop()
      const path = `${listingId}/${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(path, file)

      if (uploadError) {
        toast.error(`Could not upload ${file.name}.`)
        continue
      }

      const result = await attachListingImage(
        listingId,
        path,
        images.length + index
      )
      if (result?.error) {
        toast.error(result.error)
      }
    }

    setIsUploading(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  function handleDelete(imageId: string) {
    startTransition(async () => {
      const result = await deleteListingImage(imageId)
      if (result?.error) toast.error(result.error)
    })
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-xl border-2 border-foreground"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listingImageUrl(image.storage_path)}
              alt=""
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(image.id)}
              disabled={isPending}
              className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-full border-2 border-foreground bg-background text-foreground shadow-brutal-sm hover:bg-destructive hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-foreground text-center text-sm font-bold text-muted-foreground hover:bg-muted">
          <Upload className="size-5" />
          {isUploading ? "Uploading..." : "Add photo"}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            disabled={isUploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        JPEG, PNG, or WEBP. Up to {MAX_IMAGES} photos, {MAX_SIZE_MB}MB each.
      </p>
    </div>
  )
}
