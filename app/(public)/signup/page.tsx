import Link from "next/link"

import { SignupForm } from "@/components/auth/signup-form"
import { AuthShell } from "@/components/auth/auth-shell"

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free for both renters and property owners."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  )
}
