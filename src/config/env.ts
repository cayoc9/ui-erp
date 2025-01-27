export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  appTitle: import.meta.env.VITE_APP_TITLE ?? 'ERP Hospitalar',
  apiTimeout: import.meta.env.VITE_API_TIMEOUT ?? 10000,
};
