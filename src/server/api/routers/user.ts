import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  listRestaurants: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return ctx.db.restaurant.findMany({
      where: {
        RestaurantUser: {
          some: {
            userId,
          },
        },
      },
    });
  }),

  currentUser: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return ctx.db.user.findUnique({
      where: {
        id: userId,
      },
    });
  }),

  currentSelectedRestaurantId: protectedProcedure.query(
    async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          currentSelectedRestaurantId: true,
        },
      });
    },
  ),

  selectRestaurant: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          currentSelectedRestaurantId: input,
        },
      });
    }),
});
