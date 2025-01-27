import express, { Request, Response } from "express";
import multer from "multer";
import Video from "../models/videoModel";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads", // Save files in public/uploads for static serving
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload video route
router.post("/upload", upload.single("video"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const { title, description } = req.body;

    const video = new Video({
      title,
      description,
      url: `/uploads/${req.file.filename}`, // Accessible via public folder
      likes: 0,
      comments: [],
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully!", video });
  } catch (error) {
    console.error("Error while uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
});

// Fetch video feed route
router.get("/feed", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error while fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Like video route
router.post("/:id/like", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    video.likes += 1;
    await video.save();
    res.status(200).json({ message: "Video liked!", video });
  } catch (error) {
    console.error("Error while liking video:", error);
    res.status(500).json({ error: "Failed to like video" });
  }
});

export default router;
