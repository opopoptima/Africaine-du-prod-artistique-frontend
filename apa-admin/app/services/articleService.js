import adminApiClient from "../lib/adminApiClient";

export const ArticleService = {
  list: (params) => adminApiClient.get("/articles", { params }),
  getById: (id) => adminApiClient.get(`/articles/${id}`),
  create: (data) => {
    // Pour FormData, ne PAS définir Content-Type manuellement
    // Le navigateur le définit automatiquement avec la boundary
    // Si on le définit manuellement, ça casse la boundary
    return adminApiClient.post("/articles", data);
  },
  update: (id, data) => {
    // Même chose pour update
    return adminApiClient.put(`/articles/${id}`, data);
  },
  delete: (id) => adminApiClient.delete(`/articles/${id}`)
};
