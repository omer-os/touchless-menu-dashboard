 import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { restaurantRouter } from "./routers/restaurant";
import { userRouter } from "./routers/user";
import { notificationRouter } from "./routers/notification";
import { invitationRouter } from "./routers/invitation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  user: userRouter,
  notification: notificationRouter,
  invitation: invitationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
