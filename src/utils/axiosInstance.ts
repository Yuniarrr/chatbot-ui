import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/dev",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear(); // atau remove specific items
      window.location.href = "/login"; // force logout
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
