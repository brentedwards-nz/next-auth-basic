import connectDb from "@/db/connectDb";
import Game from "@/db/models/Game";
import mongoose from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::GET...");

  try {
    const id: string = context.params.id;
    console.log(id);

    await connectDb();

    const game = Game.find({ id: new mongoose.Types.ObjectId(id) });

    //await game.save();

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
