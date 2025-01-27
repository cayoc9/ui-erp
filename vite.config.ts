import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Permite acesso externo
    port: 5173, // Porta padrão do Vite
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.method, req.url);
            // Headers úteis para debug
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
            proxyReq.setHeader('Origin', 'http://10.100.59.94:5173');
          });
        },
      },
    },
  },
});
