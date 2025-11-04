import mongoose from "mongoose";

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/bookshelf";

async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Database connection success");
  } catch (err: unknown) {
    console.error("Database connection error:", (err as Error).message);
  }
}

async function disconnect() {
  await mongoose.disconnect();
  console.info("Database connection closed");
}

export default { connect, disconnect };
