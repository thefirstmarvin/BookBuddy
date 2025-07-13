import axios from "axios";

const getToken = () => localStorage.getItem("token");

// Axios instance for user-service (port 8080)
export const userApi = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

// Axios instance for book-service (port 8082)
export const bookApi = axios.create({
  baseURL: "http://localhost:8082/api",
});

// Automatically attach JWT to protected requests
[userApi, bookApi].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
});
