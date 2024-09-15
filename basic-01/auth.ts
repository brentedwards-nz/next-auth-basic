import NextAuth from "next-auth";
import "next-auth/jwt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import vercelKVDriver from "unstorage/drivers/vercel-kv";
import type { NextAuthConfig } from "next-auth";
import clientPromise from "./lib/db";
import { Adapter } from "next-auth/adapters";

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
});

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  basePath: "/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
function MongoDBAdapter(
  clientPromise: Promise<import("mongodb").MongoClient>
): Adapter {
  throw new Error("Function not implemented.");
}
