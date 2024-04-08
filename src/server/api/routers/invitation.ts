import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { inviteUserSchema, restaurantSchema } from "../z/restaurant";
import { z } from "zod";

export const invitationRouter = createTRPCRouter({
  acceptInvitation: protectedProcedure
    .input(
      z.object({
        invitationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.invitation.update({
        where: {
          id: input.invitationId,
        },
        data: {
          accepted: true,
        },
      });
    }),
});
