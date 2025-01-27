import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/videoApp");
    console.log("Connected to MongoDB");
  }
};

export default connectDB;
