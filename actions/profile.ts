"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { ProfileImageSchema } from "@/schemas";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProfileImage = async (values: z.infer<typeof ProfileImageSchema>) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }

    const res = await db.user.update({
        where: {
            id: user.id
        },
        data: {
            image: values.image
        }
    })

    if(!res) {
        return { error: "Something went wrong!" }
    }

    revalidatePath("/dashboard")
    return { success: "Profile updated successfully!" };
}