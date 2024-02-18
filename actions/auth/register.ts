"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";

import { getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name, role } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: "Invalid Credentials" }
    };

    await db.user.create({
        data: {
            name,
            email,
            role,
            password: hashedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);


    return { success: "Confirmation email sent!" }
}