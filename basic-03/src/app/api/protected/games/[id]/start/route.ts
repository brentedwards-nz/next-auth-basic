import connectDb from "@/db/connectDb";
import Game from "@/db/models/Game";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::PUT...");

  try {
    var id = context.params.id;
    console.log(id);

    await connectDb();
    const game = Game.findOne(id);

    //await game.save();

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
