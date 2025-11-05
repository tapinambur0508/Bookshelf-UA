import { useNavigate } from "react-router-dom";

import type { Book } from "../services/api";

interface BookCardProps {
  readonly book: Book;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const navigate = useNavigate();

  function handleTitleClick() {
    navigate(`/books/${book._id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/books/${book._id}`);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <button
        className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors text-left w-full"
        onClick={handleTitleClick}
        onKeyDown={handleKeyDown}>
        {book.title}
      </button>
      <p className="text-gray-600 mb-4">by {book.author}</p>
      <div className="flex gap-2">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          onClick={onEdit}>
          Edit
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
