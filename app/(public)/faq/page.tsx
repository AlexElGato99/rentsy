import Link from "next/link"
import { HelpCircle } from "lucide-react"

import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function FaqPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.faq

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
        <HelpCircle className="size-4" />
        {t.badge}
      </span>
      <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {t.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-muted-foreground text-balance">
        {t.subtitle}
      </p>

      <div className="mx-auto mt-12 rounded-3xl border-2 border-foreground bg-card p-6 text-start shadow-brutal sm:p-8">
        <Accordion type="single" collapsible>
          {t.items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-base font-extrabold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed font-medium text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mx-auto mt-14 flex max-w-xl flex-col items-center rounded-3xl border-2 border-foreground bg-secondary/60 px-6 py-10 shadow-brutal-sm">
        <h2 className="text-xl font-extrabold tracking-tight">
          {t.stillHaveQuestions}
        </h2>
        <p className="mt-2 font-medium text-muted-foreground">
          {t.contactCtaText}
        </p>
        <div className="mt-5">
          <Link href="/contact">
            <Button>{t.contactCta}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
