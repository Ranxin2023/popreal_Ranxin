import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

// Configure Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Directory for file uploads
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique filenames
  }),
});

// Wrap Multer middleware for compatibility with Next.js
const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => {
  upload.single("video")(req as any, res as any, next);
};

export { uploadMiddleware };
