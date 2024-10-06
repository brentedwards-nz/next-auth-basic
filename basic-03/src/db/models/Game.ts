import mongoose, { ObjectId } from "mongoose";
import { number } from "zod";

interface IGame {
  startTime: Date;
  endTime: Date;
  // numberOfEnds: number;
  //participants: [{ type: ObjectId; ref: "User" }];
}

const gameSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: false,
    default: null,
  },
  endTime: {
    type: Date,
    required: false,
    default: null,
  },
  // numberOfEnds: {
  //   type: number,
  //   required: false,
  // },
  //participants: [{ type: ObjectId; ref: "User" }]
});

const Game = mongoose.model<IGame>("Game", gameSchema);

export default Game;
