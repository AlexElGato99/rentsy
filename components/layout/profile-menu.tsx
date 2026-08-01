"use client"

import Link from "next/link"
import { CircleUserRound, LogOut, Plus, Settings, ShieldCheck, Users } from "lucide-react"

import { logout } from "@/lib/actions/auth"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import type { RoleType } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProfileMenu({
  name,
  role,
  dict,
  logOutLabel,
}: {
  name: string | null
  role: RoleType
  dict: Dictionary["profileMenu"]
  logOutLabel: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={name ?? "Profile"}
          className="rounded-full border-2 border-foreground bg-accent text-accent-foreground"
        >
          <CircleUserRound className="size-4.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        {name && (
          <>
            <DropdownMenuLabel className="font-bold">{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {role === "seller" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/seller/listings/new">
                <Plus className="size-4" />
                {dict.addNewListing}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/seller/dashboard">
                <Settings className="size-4" />
                {dict.myListings}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/seller/dashboard#account-settings">
                <Settings className="size-4" />
                {dict.accountSettings}
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {role === "admin" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard">
                <ShieldCheck className="size-4" />
                {dict.adminDashboard}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/listings">
                <Settings className="size-4" />
                {dict.manageListings}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/users">
                <Users className="size-4" />
                {dict.manageUsers}
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {role === "customer" && (
          <DropdownMenuItem asChild>
            <Link href="/account">
              <Settings className="size-4" />
              {dict.accountSettings}
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => logout()}>
          <LogOut className="size-4" />
          {logOutLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
