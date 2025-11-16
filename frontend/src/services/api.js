import axios from "axios";

const api = axios.create({
  // Usa la URL que pusiste en .env -> VITE_API_URL
  baseURL: process.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
