import apiClient from "../lib/apiClient";

export const OrderService = {
  // POST /order
  create: (orderData) => apiClient.post("/orders", orderData),

};
