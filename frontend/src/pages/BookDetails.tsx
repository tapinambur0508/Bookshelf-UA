import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useBook, useUpdateBook, useDeleteBook } from "../queries/books";
import { getErrorMessage } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/books";

import LoadingSpinner from "../components/LoadingSpinner";
import BookForm from "../components/BookForm";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: book, isLoading } = useBook(id);
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  async function handleUpdate(title: string, author: string) {
    if (book === null || book === undefined) return;
    try {
      setError(null);
      await updateBookMutation.mutateAsync({ id: book._id, payload: { title, author } });
      setShowEditForm(false);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_BOOK));
    }
  }

  async function handleDelete() {
    if (book === null || book === undefined) return;
    if (!confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      setError(null);
      await deleteBookMutation.mutateAsync(book._id);
      navigate("/");
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_BOOK));
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error !== null || book === null || book === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error ?? "Book not found"}
        </div>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Back to Bookshelf
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Bookshelf
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4">
            ← Back to Bookshelf
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-xl sm:text-2xl text-gray-600">by {book.author}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase">Book ID</span>
                <p className="text-gray-800 mt-1 font-mono text-xs sm:text-sm break-all">
                  {book._id}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              onClick={() => setShowEditForm(true)}>
              Edit Book
            </button>
            <button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              onClick={handleDelete}>
              Delete Book
            </button>
          </div>
        </div>

        {showEditForm && book !== null && (
          <BookForm book={book} onSubmit={handleUpdate} onCancel={() => setShowEditForm(false)} />
        )}
      </div>
    </div>
  );
}

export default BookDetails;
