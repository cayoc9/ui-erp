// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso externo
    port: 5173, // Porta padrão do Vite
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url);
            // Headers úteis para debug
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
            proxyReq.setHeader('Origin', 'http://10.100.59.94:5173');
          });
        }
      }
    }
  }
});
