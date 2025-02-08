import {  z } from "zod";

export const signUpformSchema = z.object({
  email: z.string().min(2).email({ message: "Invalid Email format" }),
  password: z
    .string()
    .min(2, { message: "Password must contain more than 8 character" }),
  confirmPassword: z
    .string()
    .min(2, { message: "Password must contain more than 8 character" }),

  userType: z.string({
    required_error: "Please select an user type.",
  }),
});

export const signInformSchema = z.object({
  email: z.string().min(2).email({ message: "Invalid Email format" }),
  password: z
    .string()
    .min(2, { message: "Password must contain more than 8 character" }),

  userType: z.string({
    required_error: "Please select an user type.",
  }),
});

export const eventFormSchema = z.object({
  name: z.string().min(2),
  date: z.string(),
  time: z.string(),
  description: z.string().optional(),
  location: z.string(),
  category: z.string(),
  imagePath: z.any(),
});

export const updateFormSchema = z.object({
  name: z.string().min(2),
  date: z.string(),
  time: z.string(),
  description: z.string().optional(),
  location: z.string(),
  category: z.string(),
});
