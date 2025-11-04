import { Request, Response } from "express";

function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).end("Not found");
}

export default notFoundHandler;
