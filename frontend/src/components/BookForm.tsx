import { useActionState, useCallback, useEffect } from "react";

import type { Book } from "../services/api";

interface BookFormProps {
  readonly book?: Book | null;
  readonly onSubmit: (title: string, author: string) => Promise<void>;
  readonly onCancel: () => void;
}

interface FormState {
  error: string | null;
  success: boolean;
}

function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const formAction = useCallback(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const titleValue = formData.get("title");
      const authorValue = formData.get("author");
      const title =
        titleValue !== null && titleValue !== undefined && typeof titleValue === "string"
          ? titleValue.trim()
          : "";
      const author =
        authorValue !== null && authorValue !== undefined && typeof authorValue === "string"
          ? authorValue.trim()
          : "";

      if (title === "" || author === "") {
        return { error: "Title and author are required", success: false };
      }

      try {
        await onSubmit(title, author);
        return { error: null, success: true };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to save book",
          success: false,
        };
      }
    },
    [onSubmit],
  );

  const [state, formActionDispatch, isPending] = useActionState(formAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success && state.error === null) {
      onCancel();
    }
  }, [state.success, state.error, onCancel]);

  let submitButtonText = "Create";
  if (isPending) {
    submitButtonText = "Saving...";
  } else if (book !== null && book !== undefined) {
    submitButtonText = "Update";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {book !== null && book !== undefined ? "Edit Book" : "Add New Book"}
        </h2>
        <form action={formActionDispatch}>
          {state.error !== null && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {state.error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              defaultValue={book !== null && book !== undefined ? book.title : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPending}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">
              Author
            </label>
            <input
              required
              type="text"
              id="author"
              name="author"
              defaultValue={book !== null && book !== undefined ? book.author : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPending}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {submitButtonText}
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              disabled={isPending}
              onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
