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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "./types";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const signInFunc = async (provider: string) => {
  console.log("*** signInFunc:", provider);
  await signIn(provider);
};

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data: session, status } = useSession();

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign in to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
          />
          <Input
            disabled={false}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
          />
          <Button type="submit" disabled={false} className="w-full" size={"lg"}>
            Continue
          </Button>
        </form>
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

        <div>
          <p>{session ? session : "No session"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default SignInCard;
