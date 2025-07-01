import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 8080,
        allowedHosts: ['berghub.online', 'localhost', '127.0.0.1'],
        proxy: {
            '/api': {
                target: 'https://ai-generator-backend-3vgu.onrender.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
