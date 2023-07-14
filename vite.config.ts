import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'monolieta-search',
            formats: ['es', 'umd'],
            fileName: (format: string) => `monolieta-search.${format}.js`
        }
    }
});
