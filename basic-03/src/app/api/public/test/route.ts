import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  try {
    return NextResponse.json({ result: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
