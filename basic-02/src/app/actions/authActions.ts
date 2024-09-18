"use server";

import { signIn, signOut } from "@/../auth";
import { AuthError } from "next-auth";

export async function handleSignout() {
  await signOut();
}

export async function handleCredentialsSignin({
  email,
  password,
  redirectUrl = "/",
}: {
  email: string;
  password: string;
  redirectUrl: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: redirectUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "AuthError: Invalid credentials" };
        default:
          return { message: "AuthError: Something went wrong" };
      }
    }
    throw error;
  }
}
