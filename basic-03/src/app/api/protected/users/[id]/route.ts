import { auth } from "@/auth";
import clientPromise from "@/lib/MongodbClient";
import { Db, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  // }
  // return NextResponse.json({ success: session }, { status: 200 });
  try {
    const { params } = context;
    const id = params?.id;

    var o_id = new ObjectId(id);

    const client = await clientPromise;
    const db: Db = client.db() as any;
    const user = await db.collection("users").findOne({ _id: o_id });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  // }
  // return NextResponse.json({ success: session }, { status: 200 });
  const { params } = context;
  const id = params?.id;
  return NextResponse.json({ method: request.method, id: id }, { status: 200 });
}

export async function POST(request: Request, context: any) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  // }
  // return NextResponse.json({ success: session }, { status: 200 });
  const { params } = context;
  const id = params?.id;
  return NextResponse.json({ method: request.method, id: id }, { status: 200 });
}

export async function DELETE(request: Request, context: any) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  // }
  // return NextResponse.json({ success: session }, { status: 200 });
  const { params } = context;
  const id = params?.id;
  return NextResponse.json({ method: request.method, id: id }, { status: 200 });
}
