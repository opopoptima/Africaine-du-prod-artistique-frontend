import apiClient from "../lib/apiClient";

export const NewsService = {
  // GET /news?page=&limit=&q=
  getAll: ({ page = 1, limit = 10, q = "" } = {}) => 
    apiClient.get("/news", {
      params: {
        page,
        limit,
        ...(q && { q }),
      },
    }),

  // GET /news/:id
  getById: (id) => apiClient.get(`/news/${id}`),
};
