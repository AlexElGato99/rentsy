import Link from "next/link"
import { Home } from "lucide-react"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-extrabold tracking-tight",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground shadow-brutal-sm">
        <Home className="size-4.5" strokeWidth={2.5} />
      </span>
      Rentsy
    </Link>
  )
}
