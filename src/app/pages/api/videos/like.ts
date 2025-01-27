// src/pages/api/videos/like.ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../backend/connectDB";
import Video from "../../../backend/models/videoModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { videoId } = req.body;
      const video = await Video.findById(videoId);

      if (video) {
        video.likes += 1;
        await video.save();
        res.status(200).json({ message: "Video liked!", likes: video.likes });
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to like video" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
