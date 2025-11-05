import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject auth token into all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle 401 errors - token might be missing or expired
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest._retry !== true) {
      originalRequest._retry = true;

      // Wait a bit for token to be set if it's being fetched
      await new Promise((resolve) => setTimeout(resolve, 500));

      const token = localStorage.getItem("auth_token");
      if (token !== null && token !== undefined) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      }
    }

    throw error;
  },
);

export interface Book {
  _id: string;
  title: string;
  author: string;
}

export interface BooksResponse {
  books: Book[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface CreateBookPayload {
  title: string;
  author: string;
}

export const booksApi = {
  getAll: async (page: number = 1, limit: number = 12): Promise<BooksResponse> => {
    const response = await apiClient.get<BooksResponse>("/books", {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Book> => {
    const response = await apiClient.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (payload: CreateBookPayload): Promise<void> => {
    await apiClient.post("/books", payload);
  },

  update: async (id: string, payload: CreateBookPayload): Promise<Book> => {
    const response = await apiClient.put<Book>(`/books/${id}`, payload);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/books/${id}`);
  },
};

export default apiClient;
