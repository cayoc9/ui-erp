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
  response => {
    if (import.meta.env.DEV) {
      // Log específico para rota de estatísticas
      if (response.config.url.includes('/statistics')) {
        console.group('Dados das Estatísticas:');
        console.log('URL:', response.config.url);
        console.log('Parâmetros:', response.config.params);
        console.log('Resposta:', JSON.stringify(response.data, null, 2));
        console.groupEnd();
      }
    }
    return response;
  },
  error => {
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data
      });
    }
    return Promise.reject(error);
  }
);

export default api;
