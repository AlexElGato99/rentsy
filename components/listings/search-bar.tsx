import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PROPERTY_TYPES = [
  { value: "any", label: "Any type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "studio", label: "Studio" },
  { value: "villa", label: "Villa" },
  { value: "room", label: "Room" },
] as const

export function SearchBar() {
  return (
    <form
      action="/listings"
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-3xl border-2 border-foreground bg-card p-3 shadow-brutal sm:flex-row sm:items-center sm:gap-2"
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl border-2 border-foreground bg-background px-3 py-2.5 sm:border-0 sm:bg-transparent sm:py-1">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          name="city"
          placeholder="City or neighborhood"
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground"
        />
      </div>

      <div className="hidden h-8 w-0.5 bg-foreground sm:block" />

      <div className="sm:w-40">
        <Select name="type" defaultValue="any">
          <SelectTrigger className="w-full rounded-xl border-2 border-foreground bg-background font-bold shadow-none sm:border-0 sm:bg-transparent">
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Search className="size-4.5" />
        Search
      </Button>
    </form>
  )
}
