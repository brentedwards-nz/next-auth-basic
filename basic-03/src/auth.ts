import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "./lib/MongodbClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { SignJOSE } from "./utils/tokens";

export const authConfig: NextAuthConfig = {
  pages: {
    error: "/auth/error",
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      // allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const client = await clientPromise;
          const db = client.db() as any;
          const user = await db
            .collection("users")
            .findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("Could not find user");
          }

          const bcrypt = require("bcrypt");

          const passwordCorrect = await bcrypt.compare(
            credentials?.password,
            user?.password
          );

          if (passwordCorrect) {
            return {
              id: user?._id,
              email: user?.email,
            };
          }
          return null;
        } catch (e: any) {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (user) {
        if (account?.provider === "google") {
        } else if (account?.provider === "github") {
        } else if (account?.provider === "facebook") {
        } else if (account?.provider === "credentials") {
        }

        return true;
      }
      return "/auth/error?error=SignInFailed";
    },
    jwt: async ({ token, account, user }) => {
      return { ...token, ...user };
    },
    session: async ({ token, session }) => {
      session.user.id = token?.sub || "";
      session.user.access_token = await SignJOSE(
        {
          id: token?.id as string,
          data1: "session access data1",
          data2: "session access data2",
        },
        "1h"
      );
      session.user.refresh_token = await SignJOSE(
        {
          id: token?.id as string,
          data1: "session refresh data1",
          data2: "sessionrefresh data2",
        },
        "1h"
      );
      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);

//export { handlers as GET, handlers as POST };
