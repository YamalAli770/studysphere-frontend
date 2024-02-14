import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required."
    }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    email: z.string().email({
        message: "Email is required."
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
    role: z.enum(["MENTOR", "MENTEE"]),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required."
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
})