"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioPills({
  name,
  value,
  onChange,
  options,
}: {
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly { value: string; label: string }[]
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const id = `${name}-${option.value}`
        return (
          <div key={option.value}>
            <RadioGroupItem value={option.value} id={id} className="peer sr-only" />
            <Label
              htmlFor={id}
              className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-foreground bg-background px-4 py-2 text-sm font-bold transition-colors peer-data-checked:bg-primary peer-data-checked:text-primary-foreground"
            >
              {option.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
