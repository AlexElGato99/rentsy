import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { AuthShell } from "@/components/auth/auth-shell"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back to Rentsy."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      {error === "auth-callback-failed" && (
        <Alert variant="destructive" className="mb-5">
          <AlertDescription>
            That confirmation link is invalid or has expired. Log in below,
            or sign up again if you still need to confirm your email.
          </AlertDescription>
        </Alert>
      )}
      <LoginForm />
    </AuthShell>
  )
}
