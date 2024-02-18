import { currentUserServer } from '@/lib/user-server';
import { initEdgeStore } from '@edgestore/server';
import { CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { UserRole } from '@prisma/client';

type Context = {
    userId: string;
    userRole: UserRole
}

const createContext = async (): Promise<Context> => {
    const user = await currentUserServer();

    if (!user) {
        throw new Error('User not found');
    }

    return {
        userId: user.id,
        userRole: user.role
    };
};

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  educationDocument: es.fileBucket({
    maxSize: 1024 * 1024 * 4, // 4MB
    accept: ['application/pdf']
  }).path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
        OR: [
            {
                userId: { path: "owner" }
            },
            {
                userRole: UserRole.ADMIN
            }
        ]
    })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;