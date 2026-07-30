import { z } from "zod"

export const signupSchema = z.object({
  role: z.enum(["customer", "seller"]),
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export type SignupInput = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().min(1, "Enter your password."),
})

export type LoginInput = z.infer<typeof loginSchema>
