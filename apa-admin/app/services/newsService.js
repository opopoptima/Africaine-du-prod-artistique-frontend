import adminApiClient from "../lib/adminApiClient";

export const NewsService = {
  // GET /news?page=&limit=&q=&sort= (for public - excludes Brouillon)
  getAll: ({ page = 1, limit = 10, q = "", sort = "" } = {}) => 
    adminApiClient.get("/news/all", {
      params: {
        page,
        limit,
        ...(q && { q }),
        ...(sort && { sort }),
      },
    }),

  // GET /news/:id (for public - excludes Brouillon)
  getById: (id) => adminApiClient.get(`/news/${id}`),

  // POST /news
  create: (newsData, options = {}) => adminApiClient.post("/news", newsData, options),

  // PUT /news/:id
  update: (id, newsData, options = {}) => adminApiClient.put(`/news/${id}`, newsData, options),

  // DELETE /news/:id
  delete: (id) => adminApiClient.delete(`/news/${id}`),
};