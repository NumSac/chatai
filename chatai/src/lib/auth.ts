import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        access_token: account?.refresh_token,
      };
    },
    async session({ session, token, user }) {
      // This is necessary to retrieve the access token in a comparable acceptable manner
      const getToken = await db.account.findFirst({
        where: {
          userId: token.id,
        },
      });

      let accessToken: string | null = null;
      if (getToken) {
        accessToken = getToken.access_token!;
      }

      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.token = token.access_token;
      }

      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<any> {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
  },
};
