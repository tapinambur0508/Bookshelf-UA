import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { booksApi } from "../services/api";
import type { CreateBookPayload } from "../services/api";

import { BOOKS_PER_PAGE } from "../constants/books";

export const BOOKS_QUERY_KEY = "books";

export function useBooks(page: number) {
  return useQuery({
    queryKey: [BOOKS_QUERY_KEY, page],
    queryFn: () => booksApi.getAll(page, BOOKS_PER_PAGE),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBook(id: string | undefined) {
  return useQuery({
    queryKey: [BOOKS_QUERY_KEY, id],
    queryFn: () => {
      if (id === undefined || id === null) {
        throw new Error("Book ID is required");
      }
      return booksApi.getById(id);
    },
    enabled: id !== undefined && id !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookPayload) => booksApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateBookPayload }) =>
      booksApi.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => booksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_QUERY_KEY] });
    },
  });
}
