"use server";
import { signIn, signOut } from "@/auth";

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signinWithGitHub = async () => {
  await signIn("github");
};

export const signinWithFacebook = async () => {
  await signIn("facebook");
};

export const signout = async () => {
  await signOut();
};

export const signInWithCreds = async (
  email: string,
  password: string,
  redirect: boolean = false
) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect,
    });
  } catch (error) {
    return {
      error: "Sign in error",
    };
  }
};
