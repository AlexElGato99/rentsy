import Link from "next/link"
import { Compass } from "lucide-react"

import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"

export default async function NotFound() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.notFound

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl border-2 border-foreground bg-accent text-accent-foreground shadow-brutal">
        <Compass className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">404</h1>
      <p className="mt-1 text-xl font-extrabold">{t.title}</p>
      <p className="mt-2 font-medium text-muted-foreground">{t.description}</p>

      <div className="mt-8 w-full">
        <Link href="/" className="block">
          <Button size="lg" className="w-full">
            {t.backHome}
          </Button>
        </Link>
      </div>
    </div>
  )
}
