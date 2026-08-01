"use client"

import { useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { deleteListing, setListingStatus } from "@/lib/actions/listings"
import type { ListingStatus } from "@/types/supabase"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import en from "@/lib/i18n/dictionaries/en"
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
  dict = en.dashboard.rowActions,
  actionsDict = en.common.actions,
}: {
  listingId: string
  status: ListingStatus
  editHref?: string
  dict?: Dictionary["dashboard"]["rowActions"]
  actionsDict?: Dictionary["common"]["actions"]
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
        toast.success(next === "published" ? dict.published : dict.unpublished)
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteListing(listingId)
      if (result?.error) toast.error(result.error)
      else toast.success(dict.deleted)
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {editHref && (
        <Link href={editHref}>
          <Button variant="outline" size="sm">
            {actionsDict.edit}
          </Button>
        </Link>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleStatus}
        disabled={isPending}
      >
        {status === "published" ? actionsDict.unpublish : actionsDict.publish}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
            {actionsDict.delete}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {dict.deleteConfirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{actionsDict.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {actionsDict.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
