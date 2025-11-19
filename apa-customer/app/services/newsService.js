import apiClient from "../lib/apiClient";

export const NewsService = {
  // GET /news
  getAll: () => apiClient.get("/news"),
  // GET /news/:id
  getById: (id) => apiClient.get(`/news/${id}`),
};
