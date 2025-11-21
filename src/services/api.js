// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log('API Base URL:', API_BASE_URL); // Debug line

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getAll: () => api.get('/users'),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;
