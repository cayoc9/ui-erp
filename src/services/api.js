import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptors para debug
api.interceptors.request.use(request => {
  if (import.meta.env.DEV) {
    console.log('Request:', request);
  }
  return request;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response);
    }
    return Promise.reject(error);
  }
);

export default api;
