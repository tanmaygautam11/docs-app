import mongoose from "mongoose"

export async function connectToMongo(uri?: string) {
  const mongoUri = uri ?? process.env.MONGO_URI ?? "mongodb://localhost:27017/docs-app"

  try {
    // Mongoose will reuse existing connection if already connected
    await mongoose.connect(mongoUri)
    console.log("MongoDB connected:", mongoUri)
  } catch (err) {
    console.error("MongoDB connection error:", err)
    throw err
  }
}

export default connectToMongo
