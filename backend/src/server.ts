import db from "./db";

import app from "./app";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

async function bootstrap() {
  try {
    await db.connect();

    app.listen({ port: Number(PORT), host: HOST }, (error: unknown) => {
      if (error) {
        throw error;
      }

      console.info(`Server started on http://${HOST}:${PORT}`);
    });

    async function shutdown() {
      await db.disconnect();
      process.exit(0);
    }

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err: unknown) {
    console.error("Bootstrap error:", (err as Error).message);
    process.exit(1);
  }
}

bootstrap().catch((error: unknown) => console.error((error as Error).message));
