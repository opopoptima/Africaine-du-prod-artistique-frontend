import axios from "axios";

const adminApiClient = axios.create({
  baseURL: "http://localhost:5000/api",  
});

adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

export default adminApiClient;
