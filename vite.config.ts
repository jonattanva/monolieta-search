import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'monolieta-search',
            fileName: 'monolieta-search'
        }
    },
    test: {
        globals: true,
        reporters: ['verbose', 'junit'],
        outputFile: {
            junit: './junit.xml'
        },
        coverage: {
            provider: 'c8',
            reporter: ['text-summary', 'cobertura', 'lcov']
        }
    },
    plugins: [
        dts({
            insertTypesEntry: true
        })
    ]
});
