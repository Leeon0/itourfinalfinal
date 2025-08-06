import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Cambia esto si tu backend corre en otro puerto
  withCredentials: true,
});

export default api;
