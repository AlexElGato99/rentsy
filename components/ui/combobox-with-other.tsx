"use client"

import * as React from "react"
import { Check, ChevronsUpDown, List } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxOption = { value: string; label: string }

export function ComboboxWithOther({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "Nothing found.",
  otherLabel = "Other (type your own)",
  chooseFromListLabel = "Choose from list",
}: {
  options: readonly ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  otherLabel?: string
  chooseFromListLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const knownValues = React.useMemo(
    () => new Set(options.map((o) => o.value)),
    [options]
  )
  const [customMode, setCustomMode] = React.useState(
    () => value.length > 0 && !knownValues.has(value)
  )

  if (customMode) {
    return (
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0"
          title={chooseFromListLabel}
          onClick={() => {
            setCustomMode(false)
            onChange("")
          }}
        >
          <List className="size-4" />
        </Button>
      </div>
    )
  }

  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-medium"
        >
          <span className={cn(!selected && "text-muted-foreground font-normal")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "size-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
              <CommandItem
                value="__other__"
                onSelect={() => {
                  setCustomMode(true)
                  onChange("")
                  setOpen(false)
                }}
              >
                <Check className="size-4 opacity-0" />
                <span className="font-bold">{otherLabel}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
