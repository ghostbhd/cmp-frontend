import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(__dirname, '../tests/setup.ts')],
        include: [path.resolve(__dirname, '../tests/**/*.test.{ts,tsx}')],
        exclude: ['**/node_modules/**', '**/dist/**'],
        typecheck: {
            tsconfig: path.resolve(__dirname, '../tests/tsconfig.json'),
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
});
