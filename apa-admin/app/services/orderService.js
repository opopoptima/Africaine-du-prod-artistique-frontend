import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

const orderService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order
  updateOrder: async (id, orderData) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};

export default orderService;