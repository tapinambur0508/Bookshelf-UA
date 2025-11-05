import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http";

function notFoundHandler(_req: Request, res: Response): void {
  res.status(HTTP_STATUS.NOT_FOUND).end("Not found");
}

export default notFoundHandler;
