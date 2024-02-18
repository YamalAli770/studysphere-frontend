"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PostSchema } from "@/schemas";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";

export const createPostAction = async (content: z.infer<typeof PostSchema>['content'], imageUrl: string | null) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    };

    if(user.role !== UserRole.MENTEE && user.role !== UserRole.MENTOR) {
        return { error: "User not authorized!" }
    }

    const post = await db.post.create({
        data: {
            userId: user.id,
            content: content,
            imageUrl: imageUrl
        }
    })

    if(!post) {
        return { error: "Something went wrong!" }
    }

    return { success: "Post created successfully!" };
}