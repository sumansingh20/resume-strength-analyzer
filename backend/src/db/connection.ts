import mongoose from "mongoose"

export async function connectMongo() {
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error("MONGO_URI not set")
  mongoose.set("strictQuery", true)
  await mongoose.connect(uri)
  console.log("[mongo] connected")
}
