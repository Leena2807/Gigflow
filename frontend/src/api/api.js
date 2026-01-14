import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-iuqv.onrender.com",
  withCredentials: true,
});

export default api;