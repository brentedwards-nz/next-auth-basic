import connectDb from "@/db/connectDb";
import Game from "@/db/models/Game";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::POST...");

  try {
    await connectDb();
    const game = new Game({});

    await game.save();

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
