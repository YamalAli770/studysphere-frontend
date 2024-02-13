import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: "MENTOR" | "MENTEE"
};

declare module "next-auth" {
    interface Session {
      user: {
        role: UserRole,
      } & DefaultSession["user"]
    }
  }