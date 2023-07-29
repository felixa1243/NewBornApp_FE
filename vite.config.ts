import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Replace this with the URL of your backend server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix when forwarding the request
            },
        },
    },
});
