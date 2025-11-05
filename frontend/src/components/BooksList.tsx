import { useState } from "react";

import type { Book } from "../services/api";

import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from "../queries/books";
import { getErrorMessage } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/books";

import BookForm from "./BookForm";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner";

function BooksList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useBooks(currentPage);
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const books = data?.books ?? [];
  const totalPages = data?.meta.totalPages ?? 1;
  const totalCount = data?.meta.totalCount ?? 0;

  async function handleCreate(title: string, author: string) {
    try {
      setError(null);
      await createBookMutation.mutateAsync({ title, author });
      setShowForm(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.CREATE_BOOK));
    }
  }

  async function handleUpdate(id: string, title: string, author: string) {
    try {
      setError(null);
      await updateBookMutation.mutateAsync({ id, payload: { title, author } });
      setEditingBook(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_BOOK));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      setError(null);
      await deleteBookMutation.mutateAsync(id);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_BOOK));
    }
  }

  if (isLoading && books.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Bookshelf</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
          onClick={() => setShowForm(true)}>
          + Add Book
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && <BookForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}

      {editingBook !== null && (
        <BookForm
          book={editingBook}
          onSubmit={(title, author) => handleUpdate(editingBook._id, title, author)}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {books.length === 0 && isLoading === false ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found. Add your first book!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={() => setEditingBook(book)}
                onDelete={() => handleDelete(book._id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <button
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
                Previous
              </button>
              <span className="text-gray-600 text-sm sm:text-base text-center">
                Page {currentPage} of {totalPages} ({totalCount} total)
              </span>
              <button
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BooksList;
