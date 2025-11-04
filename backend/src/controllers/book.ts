import { Request, Response } from "express";

import * as BookRepository from "../repositories/book";

export async function find(req: Request, res: Response): Promise<Response> {
  const { page, limit } = req.query as { page?: string; limit?: string };

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 50;

  const p1 = BookRepository.find(pageNum, limitNum);
  const p2 = BookRepository.count();

  const [docs, totalCount] = await Promise.all([p1, p2]);

  return res.status(200).json({
    books: docs,
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
    return res.status(404).end();
  }

  return res.status(200).json(doc);
}

export async function create(req: Request, res: Response): Promise<Response> {
  const payload = {
    title: req.body.title,
    author: req.body.author,
  };

  await BookRepository.create(payload);

  return res.status(204).end();
}

export async function updateById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const payload = {
    title: req.body.title,
    author: req.body.author,
  };

  const doc = await BookRepository.updateById(id, payload);

  if (doc === null) {
    return res.status(404).end();
  }

  return res.status(200).json(doc);
}

export async function deleteById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const result = await BookRepository.deleteById(id);

  if (result.deletedCount === 0) {
    return res.status(404).end();
  }

  return res.status(204).end();
}
