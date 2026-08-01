import Link from "next/link"

import { SignupForm } from "@/components/auth/signup-form"
import { AuthShell } from "@/components/auth/auth-shell"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export default async function SignupPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const t = dict.auth.signup

  return (
    <AuthShell
      title={t.title}
      subtitle={t.subtitle}
      dict={dict}
      footer={
        <>
          {t.haveAccount}{" "}
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t.logIn}
          </Link>
        </>
      }
    >
      <SignupForm dict={t} />
    </AuthShell>
  )
}
