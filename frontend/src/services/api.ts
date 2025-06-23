import axios from "axios";
import { cookie } from "../utils/cookie";

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3100/",
});

backendApi.interceptors.request.use((config) => {
  const token = cookie.get("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default backendApi;
