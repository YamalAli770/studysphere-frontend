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
});

export const EducationSchema = z.object({
    institution: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    country: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    level: z.enum(["HIGH_SCHOOL", "BACHELOR", "MASTER", "PHD"]),
    major: z.string().min(3, {
        message: "Minimum 3 characters required."
    }),
    startYear: z.coerce.number().min(4, {
        message: "Minimum 4 characters required."
    }),
    endYear: z.coerce.number().min(4, {
        message: "Minimum 4 characters required."
    })
});

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const EducationVerificationSchema = z.object({
    documentType: z.enum(["DEGREE", "TRANSCRIPT", "CERTIFICATE", "STUDENT_ID"]),
    document: z.any()
    .refine((file) => file?.name, "File is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .pdf file is accepted."
    ),
});