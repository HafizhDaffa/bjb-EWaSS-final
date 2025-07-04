// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'https://eac9-210-210-144-170.ngrok-free.app'; // Ubah di sini saja jika perlu

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': '6024',
  },
  withCredentials: false,
});

// Interceptor untuk menambahkan token otomatis dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Instance khusus untuk request tanpa token (misalnya login, register)
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': '6024',
  },
  withCredentials: false,
});

export default api;
