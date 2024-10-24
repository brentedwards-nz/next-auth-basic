import connectDb from "@/db/connectDb";
import Game from "@/db/models/Game";
import mongoose from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::GET...");

  try {
    await connectDb();

    const id: string = context.params.id;
    const game = await Game.findOne({
      id: new mongoose.Types.ObjectId(id),
    });

    if (game) {
      return NextResponse.json(game, { status: 200 });
    }

    return NextResponse.json({}, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  console.log("GAMES::DELETE...");

  try {
    const id: string = context.params.id;
    console.log(id);

    await connectDb();

    const result = await Game.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    }).exec();

    if (result.acknowledged && result.deletedCount == 1) {
      return NextResponse.json(result, { status: 200 });
    }

    throw HTTPError("Failed to delete");
  } catch (error) {
    if ((error as Error).na) if (error.name) console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
