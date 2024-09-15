import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
//import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import clientPromise from "@/lib/db";

const handler = NextAuth({
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
});

export { handler as GET, handler as POST };
