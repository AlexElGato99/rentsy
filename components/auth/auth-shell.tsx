import { Logo } from "@/components/layout/logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="flex flex-1">
      <div className="relative hidden w-1/2 flex-col justify-between border-r-2 border-foreground bg-primary p-10 lg:flex">
        <span className="flex items-center gap-2 text-xl font-extrabold">
          <span className="flex size-9 items-center justify-center rounded-xl border-2 border-foreground bg-background shadow-brutal-sm">
            R
          </span>
          Rentsy
        </span>

        <div className="rounded-2xl border-2 border-foreground bg-background p-6 shadow-brutal">
          <p className="text-2xl leading-snug font-extrabold text-balance">
            &ldquo;Listed my apartment in ten minutes and had three messages
            from renters by the next morning.&rdquo;
          </p>
          <p className="mt-4 text-sm font-bold text-muted-foreground">
            &mdash; A Rentsy property owner
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-1 mb-8 font-medium text-muted-foreground">
            {subtitle}
          </p>
          {children}
          <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
            {footer}
          </p>
        </div>
      </div>
    </div>
  )
}
