import type { Comment, Kudo, Post, User } from "@prisma/client";

type SelectedUserProperties = Pick<User, "id" | "name" | "email" | "emailVerified" | "image">;

export type CommentWithExtras = Comment & { user: SelectedUserProperties };
export type KudoWithExtras = Kudo & { user: SelectedUserProperties };

export type PostWithExtras = Post & {
    comments: CommentWithExtras[];
    kudos: KudoWithExtras[];
    user: SelectedUserProperties;
};