import Book, { IBook } from "../models/book";

export function find(page: number, limit: number): Promise<IBook[]> {
  const skip = page > 0 ? (page - 1) * limit : 0;

  return Book.find().skip(skip).limit(limit).exec();
}

export function count(): Promise<number> {
  return Book.countDocuments().exec();
}

export function findById(id: string): Promise<IBook | null> {
  return Book.findOne({ _id: id }).exec();
}

export function create(payload: { title: string; author: string }): Promise<IBook> {
  return Book.create(payload);
}

export function updateById(
  id: string,
  payload: { title: string; author: string },
): Promise<IBook | null> {
  return Book.findOneAndReplace({ _id: id }, payload, { new: true }).exec();
}

export function deleteById(id: string): Promise<{ deletedCount: number }> {
  return Book.deleteOne({ _id: id }).exec();
}
