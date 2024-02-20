"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { KudoSchema, PostSchema } from "@/schemas";
import { currentUserServer } from "@/lib/user-server";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/dashboard")
    return { success: "Post created successfully!" };
}

export const kudoPostAction = async (value: FormDataEntryValue | null) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    }

    const validatedFields = KudoSchema.safeParse({ postId: value })

    if(!validatedFields.success) {
        return { error: "Missing fields, Failed to Kudo Post." }
    }

    const { postId } = validatedFields.data;

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    });

    if(!post) {
        return { error: "Post not found!" }
    }

    const kudo = await db.kudo.findUnique({
        where: {
            userId_postId: {
                userId: user.id,
                postId
            }
        }
    })

    if(kudo) {
        try {
            await db.kudo.delete({
                where: {
                    userId_postId: {
                        userId: user.id,
                        postId
                    }
                }
            })
            revalidatePath("/dashboard")
            return { success: "Un-Kodoed Post" }
        } catch (error) {
            return { error: "Failed to Un-Kudo Post" }
        }
    };

    try {
        await db.kudo.create({
            data: {
                postId,
                userId: user.id
            }
        })
        revalidatePath("/dashboard")
        return { success: "Kudoed Post." }
    } catch (error) {
        return { error: "Failed to Kudo Post" }
    }
}