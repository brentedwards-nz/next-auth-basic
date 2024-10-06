import getServerSession from "next-auth";
import { auth } from "@/auth";
import clientPromise from "@/lib/MongodbClient";
import { Db } from "mongodb";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth";

export async function GET(request: Request, context: any) {
  try {
    const session = getServerSession(authConfig);
    //console.log(session);
    if (!session) {
      return NextResponse.json({ status: 401 });
    }

    const client = await clientPromise;
    const db: Db = client.db() as any;
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
