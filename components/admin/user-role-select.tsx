"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { updateUserRole } from "@/lib/actions/admin"
import type { RoleType } from "@/types/supabase"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UserRoleSelect({
  userId,
  role,
  disabled,
}: {
  userId: string
  role: RoleType
  disabled?: boolean
}) {
  const [isPending, startTransition] = useTransition()

  function handleChange(value: string) {
    startTransition(async () => {
      const result = await updateUserRole(userId, value as RoleType)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Role updated.")
      }
    })
  }

  return (
    <Select value={role} onValueChange={handleChange} disabled={disabled || isPending}>
      <SelectTrigger className="w-32 border-2 border-foreground font-bold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="customer">Customer</SelectItem>
        <SelectItem value="seller">Seller</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  )
}
