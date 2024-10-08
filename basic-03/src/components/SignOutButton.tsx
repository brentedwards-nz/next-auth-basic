"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signout } from "@/utils/authActions";

const SignOutButton = () => {
  return <DropdownMenuItem onClick={() => signout()}>Logout</DropdownMenuItem>;
};

export default SignOutButton;
