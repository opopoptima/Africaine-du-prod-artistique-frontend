// src/api/adminApiClient.js
import axios from "axios";

// Client Axios simple pour la partie admin (pas encore de login)
const adminApiClient = axios.create({
  baseURL: "http://localhost:5000/api", // URL de base pour l'admin
  timeout: 10000, // 10 secondes
});

// Intercepteur pour loguer les erreurs
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("Admin API error");

    throw error;
  }
);

export default adminApiClient;
