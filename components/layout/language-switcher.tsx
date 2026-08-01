"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Globe, Check } from "lucide-react"

import { setLocale } from "@/lib/actions/locale"
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleSelect(next: Locale) {
    if (next === locale) return
    startTransition(async () => {
      await setLocale(next)
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          aria-label="Change language"
          className="gap-1.5 px-2.5"
        >
          <Globe className="size-4" />
          <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LOCALES.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleSelect(code)}
            className="justify-between font-bold"
          >
            {LOCALE_LABELS[code]}
            {code === locale && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
