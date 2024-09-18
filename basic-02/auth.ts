import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "@auth/core/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { signInSchema } from "./src/lib/zod";
import clientPromise from "./src/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        // get user
        if (!credentials) {
          return null;
        }

        user = {
          id: "1",
          name: "Aditya Singh",
          email: "jojo@jojo.com",
          role: "admin",
        };

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
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
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = auth?.user.role || "user";
      if (pathname.startsWith("/") && isLoggedIn) {
        return Response.redirect(new URL("/protected", nextUrl));
      }
      if (pathname.startsWith("/page2") && role !== "admin") {
        return Response.redirect(new URL("/", nextUrl));
      }
      return !!auth;
    },
  },
});

// export const authOptions: AuthOptions = {
//   adapter: MongoDBAdapter(clientPromise) as Adapter,
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID as string,
//       clientSecret: process.env.FACEBOOK_SECRET as string,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   // callbacks: {
//   //   async jwt({
//   //     token,
//   //     user,
//   //     account,
//   //   }: {
//   //     token: JWT;
//   //     user?: User | Adapter | undefined;
//   //     account?: Account | null | undefined;
//   //     profile?: Profile | undefined;
//   //     isNewUser?: boolean | undefined;
//   //   }) {
//   //     if (user) {
//   //       token.provider = account?.provider;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }: { session: any; token: JWT }) {
//   //     if (session.user) {
//   //       session.user.provider = token.provider;
//   //     }
//   //     return session;
//   //   },
//   // },
// };

//export default NextAuth(authOptions);
// export const config = {
//   providers: [], // rest of your config
// } satisfies NextAuthOptions;

// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }

// export const { handlers, signIn, signOut } = NextAuth(authOptions);
// export default authOptions;
