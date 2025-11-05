import { Request, Response } from "express";

import { DEFAULT_PAGE, DEFAULT_LIMIT, HTTP_STATUS } from "../constants/http";

import * as BookRepository from "../repositories/book";

export async function find(req: Request, res: Response): Promise<Response> {
  const { page, limit } = req.query as { page?: string; limit?: string };

  const pageNum = Number(page) || DEFAULT_PAGE;
  const limitNum = Number(limit) || DEFAULT_LIMIT;

  const [books, totalCount] = await Promise.all([
    BookRepository.find(pageNum, limitNum),
    BookRepository.count(),
  ]);

  return res.status(HTTP_STATUS.OK).json({
    books,
    meta: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      totalCount,
    },
  });
}

export async function findById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const doc = await BookRepository.findById(id);

  if (doc === null) {
    return res.status(HTTP_STATUS.NOT_FOUND).end();
  }

  return res.status(HTTP_STATUS.OK).json(doc);
}

export async function create(req: Request, res: Response): Promise<Response> {
  const payload = {
    title: req.body.title,
    author: req.body.author,
  };

  await BookRepository.create(payload);

  return res.status(HTTP_STATUS.NO_CONTENT).end();
}

export async function updateById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const payload = {
    title: req.body.title,
    author: req.body.author,
  };

  const doc = await BookRepository.updateById(id, payload);

  if (doc === null) {
    return res.status(HTTP_STATUS.NOT_FOUND).end();
  }

  return res.status(HTTP_STATUS.OK).json(doc);
}

export async function deleteById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const result = await BookRepository.deleteById(id);

  if (result.deletedCount === 0) {
    return res.status(HTTP_STATUS.NOT_FOUND).end();
  }

  return res.status(HTTP_STATUS.NO_CONTENT).end();
}
