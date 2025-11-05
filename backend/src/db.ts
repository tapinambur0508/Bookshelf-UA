import mongoose from "mongoose";

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/bookshelf";

if (process.env.NODE_ENV === "production" && DB_URI === "mongodb://localhost:27017/bookshelf") {
  console.warn(
    "Warning: Using default MongoDB URI in production. Set DB_URI environment variable.",
  );
}

async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Connected to MongoDB");
  } catch (err: unknown) {
    console.error("Failed to connect to MongoDB:", (err as Error).message);
    throw err;
  }
}

async function disconnect() {
  await mongoose.disconnect();
  console.info("MongoDB connection closed");
}

export default { connect, disconnect };
