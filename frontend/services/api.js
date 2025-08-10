// src/services/api.js
import axios from 'axios';

// Instância principal com interceptores e cookies
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para CSRF automático (exceto em csrf-cookie)
api.interceptors.request.use(config => {
  const token = getCookieValue('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

// Esta instância só serve para o primeiro GET /sanctum/csrf-cookie
const csrf = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Função utilitária para cookies
function getCookieValue(name) {
  const cookies = `; ${document.cookie}`;
  const parts = cookies.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

export { csrf };
export default api;