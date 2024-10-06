import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const getUsers = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/protected/users`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  );

  if (response.status === 401) {
    console.log("Unauthorized");
  }

  return response.json();
};

const Users = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const access_token = session.user?.access_token;

  const users = await getUsers(access_token);
  console.log(users);

  return (
    <>
      <section className="container flex flex-col items-center justify-center py-5">
        <h1>Users</h1>
        <h2>{session.user?.name}</h2>
        <h2>{session.user?.email}</h2>
      </section>
      <section>
        <div className="grid w-full px-20 gap-2">
          <Textarea className="h-60" value={access_token} />
          <Button className="">Get Users</Button>
        </div>
      </section>
      <section>
        <div className="grid w-full px-20 gap-2">
          <Textarea className="h-60" value={JSON.stringify(users)} />
        </div>
      </section>
    </>
  );
};
export default Users;
