import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    esbuild: {
        target: 'es2022',
        supported: {
            'top-level-await': true,
        },
    },
    server: {
        // Improve HMR stability
        hmr: {
            overlay: true,
        },
        // Force page reload on certain errors
        watch: {
            usePolling: true,
        },
    },
    optimizeDeps: {
        // Include lazy-loaded components in optimization
        include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    },
});
