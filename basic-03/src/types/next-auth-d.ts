import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  export type ExtendedUser = DefaultSession["user"] & {
    access_token: string;
    refresh_token: string;
  };

  interface Session {
    user: ExtendedUser;
  }
}
