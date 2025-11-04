import cors from "cors";
import helmet from "helmet";
import express from "express";

import errorHandler from "./middleware/errorHandler";
import notFoundHandler from "./middleware/notFoundHandler";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
