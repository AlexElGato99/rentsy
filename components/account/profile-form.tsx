"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateProfile } from "@/lib/actions/profile"
import { profileSchema, type ProfileInput } from "@/lib/validators/profile.schema"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import en from "@/lib/i18n/dictionaries/en"
import { cn } from "@/lib/utils"
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

export function ProfileForm({
  defaultValues,
  dict = en.profileForm,
  className,
}: {
  defaultValues: ProfileInput
  dict?: Dictionary["profileForm"]
  className?: string
}) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  function onSubmit(values: ProfileInput) {
    startTransition(async () => {
      const result = await updateProfile(values)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(dict.updated)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "max-w-md space-y-5 rounded-2xl border-2 border-foreground bg-card p-6 shadow-brutal-sm",
          className
        )}
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.fullName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.phone}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.whatsapp}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? dict.saving : dict.saveChanges}
        </Button>
      </form>
    </Form>
  )
}
