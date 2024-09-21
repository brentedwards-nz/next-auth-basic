"use client";

import React from "react";
import { signout } from "@/utils/authActions";
import { Button } from "./ui/button";

const SignOut = () => {
  return <Button onClick={() => signout()}>Logout</Button>;
};

export default SignOut;
