"use client"

import { useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { deleteListing, setListingStatus } from "@/lib/actions/listings"
import type { ListingStatus } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ListingRowActions({
  listingId,
  status,
  editHref,
}: {
  listingId: string
  status: ListingStatus
  editHref?: string
}) {
  const [isPending, startTransition] = useTransition()

  function toggleStatus() {
    const next: ListingStatus =
      status === "published" ? "unpublished" : "published"
    startTransition(async () => {
      const result = await setListingStatus(listingId, next)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(
          next === "published" ? "Listing published." : "Listing unpublished."
        )
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteListing(listingId)
      if (result?.error) toast.error(result.error)
      else toast.success("Listing deleted.")
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {editHref && (
        <Link href={editHref}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleStatus}
        disabled={isPending}
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the listing and its photos. This
              can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
