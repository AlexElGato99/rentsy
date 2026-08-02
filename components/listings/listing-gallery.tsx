"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { listingImageUrl } from "@/lib/listings/image-url"
import { cn } from "@/lib/utils"
import { CoverImage } from "@/components/listings/cover-image"

type GalleryImage = { id: string; storage_path: string }

export function ListingGallery({
  images,
  alt,
  noPhotosLabel,
  previousLabel,
  nextLabel,
}: {
  images: GalleryImage[]
  alt: string
  noPhotosLabel: string
  previousLabel: string
  nextLabel: string
}) {
  const [index, setIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border-2 border-foreground bg-muted font-bold text-muted-foreground">
        {noPhotosLabel}
      </div>
    )
  }

  function goPrev() {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }

  function goNext() {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div>
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl border-2 border-foreground bg-muted"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goPrev()
          if (e.key === "ArrowRight") goNext()
        }}
        tabIndex={0}
      >
        <CoverImage
          src={listingImageUrl(images[index].storage_path)}
          alt={alt}
          className="size-full"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={previousLabel}
              className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-background/90 text-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:bg-background"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={nextLabel}
              className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-background/90 text-foreground shadow-brutal-sm transition-transform hover:translate-x-0.5 hover:bg-background"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute right-3 bottom-3 rounded-full border-2 border-foreground bg-background/90 px-2.5 py-1 text-xs font-bold">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}`}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2",
                i === index
                  ? "border-primary"
                  : "border-foreground/30 hover:border-foreground"
              )}
            >
              <CoverImage
                src={listingImageUrl(image.storage_path)}
                alt=""
                className="size-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
