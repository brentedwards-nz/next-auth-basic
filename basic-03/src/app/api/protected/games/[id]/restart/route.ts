import connectDb from "@/db/connectDb";
import Game from "@/db/models/Game";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context: { params: Params }) {
  try {
    var id = context.params.id;

    await connectDb();

    const game = await Game.findOne({ _id: id });
    if (!game) {
      throw new Error("Could not find game");
    }

    game.startTime = null;
    game.endTime = null;
    await game.save();

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
