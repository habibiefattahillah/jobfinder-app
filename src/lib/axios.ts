import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: "https://final-project-api-alpha.vercel.app/api",
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
