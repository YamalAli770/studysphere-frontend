"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CreateCommentSchema, DeletePostSchema, KudoSchema, PostSchema } from "@/schemas";
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

export const deletePostAction = async (postId: string) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    }

    const validatedFields = DeletePostSchema.safeParse({
        postId: postId
    })

    if(!validatedFields.success) {
        return { error: "Missing fields, Failed to delete post." }
    }

    const post = await db.post.findUnique({
        where: {
            id: validatedFields.data.postId,
            userId: user.id
        }
    })

    if(!post) {
        return { error: "Post not found!" }
    }

    try {
        await db.post.delete({
            where: {
                id: post.id
            }
        })
        revalidatePath("/dashboard")
        return { success: "Post deleted successfully!" }
    } catch (error) {
        return { error: "Failed to delete post." }
    }

};

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

export const createCommentAction = async (values: z.infer<typeof CreateCommentSchema>) => {
    const user = await currentUserServer();

    if(!user) {
        return { error: "User not found!" }
    }

    const validatedFields = CreateCommentSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Missing fields, Failed to create comment." }
    }

    const { postId, content } = validatedFields.data

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if(!post) {
        return { error: "Post not found!" }
    }

    try {
        await db.comment.create({
            data: {
                content,
                postId,
                userId: user.id
            }
        })
        revalidatePath("/dashboard")
        return { success: "Comment created successfully!" }
    } catch (error) {
        return { error: "Failed to create comment." }
    }

};