import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "./types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "./loading-button";
import { handleCredentialsSignin } from "@/app/actions/authActions";
import ErrorMessage from "./auth-error";

const Register = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        <Card className="w-full h-full p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Sign in to continue</CardTitle>
            <CardDescription>
              Use your email or another service to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-0 pb-0">
            <Form {...form}>
              <form
                className="space-y-2.5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LoadingButton pending={form.formState.isSubmitting} />
              </form>
              <ErrorMessage error={errorMessage} />
            </Form>
            <Separator />
            <div className="flex flex-col gap-y-2.5">
              <Button
                disabled={false}
                variant={"outline"}
                size="lg"
                className="w-full relative"
                onClick={() => signInFunc("google")}
              >
                <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                Continue with Google
              </Button>
              <Button
                disabled={false}
                variant={"outline"}
                size="lg"
                className="w-full relative"
              >
                <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                Continue with Github
              </Button>
              <Button
                disabled={false}
                variant={"outline"}
                size="lg"
                className="w-full relative"
              >
                <FaFacebook className="size-5 absolute top-2.5 left-2.5" />
                Continue with Facebook
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setState("signUp")}
                className="text-sky-700 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Register;
