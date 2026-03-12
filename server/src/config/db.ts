import mongoose from "mongoose"

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/docs-app"

  try {
    await mongoose.connect(mongoUri)

    console.log("MongoDB Connected")
  } catch (error) {
    console.error("Database connection failed:", error)
    process.exit(1)
  }
}