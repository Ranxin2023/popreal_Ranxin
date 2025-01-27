import express from "express";
import videoRoutes from "./routes/videoRoute";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for cross-origin requests
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads"))); // Serve static files

// Database connection
mongoose
  .connect("mongodb://localhost:27017/videoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  });

// Routes
app.use("/api/videos", videoRoutes);

// Default error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "An unexpected error occurred.",
    },
  });
});

export default app;
