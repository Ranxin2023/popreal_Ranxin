// src/backend/models/videoModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  likes: number;
  comments: { userId: string; text: string }[];
}

const videoSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [
      {
        userId: { type: String },
        text: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);
