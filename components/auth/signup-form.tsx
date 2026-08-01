"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { signup } from "@/lib/actions/auth"
import { signupSchema, type SignupInput } from "@/lib/validators/auth.schema"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioPills } from "@/components/ui/radio-pills"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SignupForm({ dict }: { dict: Dictionary["auth"]["signup"] }) {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const roleOptions = [
    { value: "customer", label: dict.roleCustomer },
    { value: "seller", label: dict.roleSeller },
  ] as const

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "customer",
      fullName: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: SignupInput) {
    setServerError(null)
    setSuccessMessage(null)
    startTransition(async () => {
      const result = await signup(values)
      if (result?.error) {
        setServerError(result.error)
      } else if (result?.message) {
        setSuccessMessage(result.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.roleQuestion}</FormLabel>
              <RadioPills
                name="role"
                value={field.value}
                onChange={field.onChange}
                options={roleOptions}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.fullName}</FormLabel>
              <FormControl>
                <Input placeholder={dict.fullNamePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.password}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? dict.submitting : dict.submit}
        </Button>
      </form>
    </Form>
  )
}
