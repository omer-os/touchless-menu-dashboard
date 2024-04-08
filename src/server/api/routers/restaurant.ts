import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { inviteUserSchema, restaurantSchema } from "../z/restaurant";
import { z } from "zod";

export const restaurantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(restaurantSchema)
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.db.restaurant.create({
        data: input,
      });

      const Restaurantuser = await ctx.db.restaurantUser.create({
        data: {
          restaurantId: restaurant.id,
          userId: ctx.session.user.id,
        },
      });

      return restaurant;
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

  getUsers: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.restaurantUser.findMany({
        where: {
          restaurantId: input,
        },
      });
    }),

  inviteUser: protectedProcedure
    .input(inviteUserSchema)
    .mutation(async ({ ctx, input }) => {
 
      const invitedUser = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!invitedUser) {
        throw new Error("User not found");
      }

      const restaurantName = await ctx.db.restaurant.findUnique({
        where: {
          id: input.restaurantId,
        },
        select: {
          name: true,
        },
      });

      const invite = await ctx.db.invitation.create({
        data: {
          email: input.email,
          restaurantId: input.restaurantId,
          senderId: ctx.session.user.id,
        },
      });

      const notification = await ctx.db.notification.create({
        data: {
          userId: invitedUser.id,
          title: "Invitation",
          message: `You have been invited to a restaurant by ${ctx.session.user.name} to join ${input.message}. `,
        },
      });

      return invite;
    }),
});
