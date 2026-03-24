import adminApiClient from '../lib/adminApiClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const orderService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await adminApiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await adminApiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await adminApiClient.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order
  updateOrder: async (id, orderData) => {
    try {
      const response = await adminApiClient.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (id) => {
    try {
      const response = await adminApiClient.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};

export default orderService;