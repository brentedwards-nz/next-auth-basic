import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { number } from "zod";

export interface IGame extends Document {
  startTime: Date;
  endTime: Date;
  // numberOfEnds: number;
  createdBy: [{ type: ObjectId; ref: "User" }];
  participants: [{ type: ObjectId; ref: "User" }];
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
  createdBy: { type: ObjectId, ref: "User" },
  participants: [{ type: ObjectId, ref: "User" }],
});

// const Game = mongoose.model<IGame>("Game", gameSchema);

// export default Game;
const Game = mongoose.models.Game || mongoose.model<IGame>("Game", gameSchema);
export default Game;
