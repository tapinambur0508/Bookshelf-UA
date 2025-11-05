import db from "./db";

import app from "./app";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

async function startServer() {
  try {
    await db.connect();

    app.listen({ port: Number(PORT), host: HOST }, (error: unknown) => {
      if (error) {
        throw error;
      }

      console.info(`Server running on http://${HOST}:${PORT}`);
    });

    async function gracefulShutdown() {
      console.info("Shutting down gracefully...");
      await db.disconnect();
      process.exit(0);
    }

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (err: unknown) {
    console.error("Failed to start server:", (err as Error).message);
    process.exit(1);
  }
}

startServer().catch((error: unknown) => console.error((error as Error).message));
