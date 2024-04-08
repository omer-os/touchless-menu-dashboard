import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { inviteUserSchema, restaurantSchema } from "../z/restaurant";
import { z } from "zod";

export const notificationRouter = createTRPCRouter({
  getMyNotifications: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.notification.findMany({
      where: {
        userId: ctx.session.user.id,
      },

      include: {
        User: true,
      },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.notification.delete({
        where: {
          id: input.id,
        },
      });
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.notification.updateMany({
      where: {
        userId: ctx.session.user.id,
      },
      data: {
        read: true,
      },
    });
  }),
});
