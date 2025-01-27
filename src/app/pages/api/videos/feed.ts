import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "../../../backend/connectDB";
import Video from "../../../backend/models/videoModel";

// Initialize the router
const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware: Connect to MongoDB
router.use(async (req, res, next) => {
  await connectDB();
  next();
});

// GET: Fetch recommended videos
router.get(async (req, res) => {
  try {
    const { tag, sort } = req.query;

    let videos;

    if (tag) {
      // Content-based recommendation: Search for videos matching the tag
      videos = await Video.find({
        description: { $regex: tag as string, $options: "i" }, // Case-insensitive match
      }).limit(20);
    } else if (sort === "trending") {
      // Trending videos: Most liked videos
      videos = await Video.find().sort({ likes: -1 }).limit(10);
    } else {
      // Default: Return all videos sorted by the latest
      videos = await Video.find().sort({ createdAt: -1 }).limit(20);
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Error and route handling
export default router.handler({
  onError(err, req, res) {
    const error = err as Error; // Cast error to `Error` type
    console.error("Error occurred:", error.stack);
    res.status(500).end("Something went wrong!");
  },
  onNoMatch(req, res) {
    res.status(404).end("Route not found");
  },
});
