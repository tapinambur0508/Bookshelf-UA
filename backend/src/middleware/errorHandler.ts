import { Request, Response, NextFunction } from "express";

function errorHandler(
  error: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  res.status(error.status || 500).end(error.message || "Internal Server Error");
}

export default errorHandler;
