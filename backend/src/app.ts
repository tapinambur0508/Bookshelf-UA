import cors from "cors";
import helmet from "helmet";
import express, { Request, Response } from "express";

import errorHandler from "./middleware/errorHandler";
import notFoundHandler from "./middleware/notFoundHandler";

import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
