import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import { HTTP_STATUS } from "../constants/http";

const errorHandler: ErrorRequestHandler = (
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err.name === "UnauthorizedError") {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Invalid or missing authentication token",
    });
    return;
  }

  const statusCode = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "production") {
    console.error("Error:", {
      message: err.message,
      status: statusCode,
      stack: err.stack,
    });
  } else {
    console.error("Error:", err);
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
