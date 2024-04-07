import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { restaurantSchema } from "../z/restaurant";
import { z } from "zod";

export const restaurantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(restaurantSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.restaurant.create({
        data: {
          ...input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: restaurantSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.restaurant.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  get: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return ctx.db.restaurant.findUnique({
      where: {
        id: input,
      },
    });
  }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.restaurant.delete({
        where: {
          id: input,
        },
      });
    }),
});
