// src/api/axiosConfig.js
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const userApi = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

export const bookApi = axios.create({
  baseURL: "http://localhost:8082/api",
});

[userApi, bookApi].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
});
