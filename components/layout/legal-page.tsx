export function LegalPage({
  title,
  updated,
  lastUpdatedLabel = "Last updated",
  children,
}: {
  title: string
  updated: string
  lastUpdatedLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm font-bold text-muted-foreground">
        {lastUpdatedLabel}: {updated}
      </p>

      <div className="mt-8 space-y-6 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_p]:leading-relaxed [&_p]:font-medium [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:font-medium [&_ul]:text-muted-foreground">
        {children}
      </div>
    </div>
  )
}
