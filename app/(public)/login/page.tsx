import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { AuthShell } from "@/components/auth/auth-shell"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.auth.login

  return (
    <AuthShell
      title={t.title}
      subtitle={t.subtitle}
      dict={dict}
      footer={
        <>
          {t.noAccount}{" "}
          <Link
            href="/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t.signUp}
          </Link>
        </>
      }
    >
      {error === "auth-callback-failed" && (
        <Alert variant="destructive" className="mb-5">
          <AlertDescription>{t.callbackError}</AlertDescription>
        </Alert>
      )}
      <LoginForm dict={t} />
    </AuthShell>
  )
}
