import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "../../../backend/connectDB";
import { uploadMiddleware } from "../../../backend/middleware/uploadMiddleware";
import Video from "../../../backend/models/videoModel";

// Initialize the router
const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware: Connect to MongoDB
router.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Middleware: Handle file uploads
router.use(uploadMiddleware);

// POST: Handle video uploads
router.post(async (req: any, res) => {
  try {
    const { title, description } = req.body;

    const newVideo = new Video({
      title,
      description,
      url: `/uploads/${req.file.filename}`,
      likes: 0,
      comments: [],
    });

    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
});

// Error and route handling
export default router.handler({
  onError(err, req, res) {
    console.error("Error occurred:", (err as Error).stack);
    res.status(500).end("Something went wrong!");
  },
  onNoMatch(req, res) {
    res.status(404).end("Route not found");
  },
});

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
