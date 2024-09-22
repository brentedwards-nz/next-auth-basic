import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import Image from "next/image";

const Manager = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <section className="container flex flex-col items-center justify-center py-5">
      <h1>Manager</h1>
      <h2>{session.user?.name}</h2>
      <h2>{session.user?.email}</h2>
      <Image
        src={session?.user?.image ? session?.user?.image : ""}
        alt=""
        width={100}
        height={100}
      />
      <SignOut />
    </section>
  );
};
export default Manager;
