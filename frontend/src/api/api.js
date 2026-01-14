import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-backend-uyin.onrender.com/api",
  withCredentials: true,
});

export default api;