import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthOptions, getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
//import CredentialsProvider from "next-auth/providers/credentials";

// import { JWT } from "next-auth/jwt";
// import { Account, Profile, User } from "next-auth";
import { Adapter } from "next-auth/adapters";
import clientPromise from "@/lib/db";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: AuthOptions = {
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
  // callbacks: {
  //   async jwt({
  //     token,
  //     user,
  //     account,
  //   }: {
  //     token: JWT;
  //     user?: User | Adapter | undefined;
  //     account?: Account | null | undefined;
  //     profile?: Profile | undefined;
  //     isNewUser?: boolean | undefined;
  //   }) {
  //     if (user) {
  //       token.provider = account?.provider;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: JWT }) {
  //     if (session.user) {
  //       session.user.provider = token.provider;
  //     }
  //     return session;
  //   },
  // },
};

//export default NextAuth(authOptions);
export const config = {
  providers: [], // rest of your config
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

export const { handlers, signIn, signOut } = NextAuth(authOptions);
export default authOptions;
