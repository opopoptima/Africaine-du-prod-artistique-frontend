import apiClient from "../lib/apiClient";

export const OrderService = {
  // GET /order
  getAll: () => apiClient.get("/orders"),

  // GET /order/:id
  getById: (id) => apiClient.get(`/orders/${id}`),

  // POST /order
  create: (orderData) => apiClient.post("/orders", orderData),

  // PUT /order/:id/status
  updateStatus: (id, status) => apiClient.put(`/orders/${id}/status`, { status }),

  // DELETE /order/:id
  delete: (id) => apiClient.delete(`/orders/${id}`),
};
