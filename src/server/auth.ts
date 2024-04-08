import { PrismaAdapter } from "@auth/prisma-adapter";
import { Restaurant } from "@prisma/client";
import {
  DefaultUser,
  User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      currentSelectedRestaurantId: number | null;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      session.user.currentSelectedRestaurantId =
        // @ts-ignore
        user.currentSelectedRestaurantId;

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {},
};

export const getServerAuthSession = () => getServerSession(authOptions);
