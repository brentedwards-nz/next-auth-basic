import connectDb from "@/db/connectDb";
import Game, { IGame } from "@/db/models/Game";
import mongoose from "mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::GET...");

  try {
    let param = {};
    const game_id = request.nextUrl.searchParams.get("game_id") as string;
    if (game_id) {
      param = {
        ...param,
        _id: new mongoose.Types.ObjectId(game_id),
      };
    }
    const user_id = request.nextUrl.searchParams.get("user_id") as string;
    if (user_id) {
      param = {
        ...param,
        user_id: user_id,
      };
    }

    await connectDb();

    const games = await Game.find(param);
    if (games.length > 0) {
      return NextResponse.json(games, { status: 200 });
    }

    return NextResponse.json(new Array(), { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: { params: Params }) {
  console.log("GAMES::POST...");

  try {
    const data: { participants: string[] } = await request.json();
    console.log("*** data:", data);

    await connectDb();
    // const mainDoc = new MainDocument({
    //   title: 'Main Doc 1',
    //   relatedDocuments: [new mongoose.Types.ObjectId(data.participants.at(0)]
    // });

    const game = new Game({
      createdBy: data.participants.at(0),
      participants: data.participants,
    });
    await game.save();

    return NextResponse.json(game, { status: 200 });
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
    const data = request.body;
    console.log("*** data:", data);
    console.log("*** context:", context);

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    console.log("*** searchParams:", searchParams);

    await connectDb();
    const game = new Game({});

    await game.save();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
