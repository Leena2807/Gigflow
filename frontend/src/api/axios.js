import axios from "axios";

export default axios.create({
  baseURL: "https://gigflow-backend-uyin.onrender.com",
  withCredentials: true,
});
