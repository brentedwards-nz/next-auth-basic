import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";
import Image from "next/image";
import { VerifyJOSE } from "@/utils/tokens";
import Link from "next/link";

const Manager = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const image = !session?.user?.image ? (
    ""
  ) : (
    <Image
      src={session?.user?.image ? session?.user?.image : ""}
      alt=""
      width={100}
      height={100}
    />
  );

  const accessPayload = await VerifyJOSE(session.user?.access_token || "");
  const refreshPayload = await VerifyJOSE(session.user?.refresh_token || "");

  const formatPayload = (p: any) => {
    if (typeof p === "string") {
      return (
        <>
          <p>Error: {p}</p>
        </>
      );
    }
    return (
      <>
        <p>ID: {p.payload.id}</p>
        <p>Data 1: {p.payload.data1}</p>
        <p>Data 2: {p.payload.data2}</p>
      </>
    );
  };

  const accessPayloadHTML = formatPayload(accessPayload);
  const refreshPayloadHTML = formatPayload(refreshPayload);

  return (
    <section className="container flex flex-col items-center justify-center py-5">
      <h1>Manager</h1>
      <h2>{session.user?.name}</h2>
      <h2>{session.user?.email}</h2>
      <hr className="h-px my-8 bg-red-200 border-0 dark:bg-red-700" />
      <code>{accessPayloadHTML}</code>
      <hr className="h-px my-8 bg-red-200 border-0 dark:bg-red-700" />
      <code>{refreshPayloadHTML}</code>
      <hr className="h-px my-8 bg-red-200 border-0 dark:bg-red-700" />
      {image}
      <hr className="h-px my-8 bg-red-200 border-0 dark:bg-red-700" />
      <SignOut />
      <Link href="/users">Users</Link>
      <Link href="/session">Session</Link>
    </section>
  );
};
export default Manager;
