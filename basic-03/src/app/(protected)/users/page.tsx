"use client";

import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import UsersComponent from "./users";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import useSWR, { Fetcher } from "swr";
import { useSession } from "next-auth/react";

const URL: string = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/protected/users`;

const getUsers = async (token: string) => {
  const response = await fetch(URL, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  if (response.status === 401) {
    console.log("Unauthorized");
  }

  if (response.status === 200) {
    return response.json();
  }
  return response.statusText;
};

const fetcher: Fetcher<any, string> = (id) => getUsers(id);

const Users = () => {
  const { data: session, update } = useSession();
  const access_token = session?.user?.access_token;
  const { data, error } = useSWR(URL, fetcher);

  const users = {};

  if (error) {
    return (
      <section className="container flex flex-col items-center justify-center py-5">
        <h1>Failed to load</h1>
        <div className="grid w-full px-20 gap-2">
          <Textarea readOnly className="h-60" value={JSON.stringify(error)} />
        </div>
      </section>
    );
  }

  if (!data)
    return (
      <section className="container flex flex-col items-center justify-center py-5">
        <h1>Loading...</h1>
      </section>
    );

  return (
    <>
      <section className="container flex flex-col items-center justify-center py-5">
        <h1>Users</h1>
        <h2>{session?.user?.name}</h2>
        <h2>{session?.user?.email}</h2>
      </section>
      <section>
        <div className="grid w-full px-20 gap-2">
          <Textarea readOnly className="h-60" value={access_token} />
          <Button className="">Get Users</Button>
        </div>
      </section>
      <section>
        <div className="grid w-full px-20 gap-2">
          <Textarea readOnly className="h-60" value={JSON.stringify(data)} />
        </div>
      </section>
      <UsersComponent users={data} />
    </>
  );
};
export default Users;
