"use server"

import * as z from "zod";

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/lib/data/user"
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid email" };
    }

    const { email } = validatedFields.data;

    const exisitingUser = await getUserByEmail(email);

    if(!exisitingUser) {
        return { error: "User not found" };
    }

    // TODO: Generate reset token and send email

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset token sent to email" };
}