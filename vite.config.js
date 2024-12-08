import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
        minify: 'esbuild',
        sourcemap: true,
    },
    server: {
        open: true,
        port: 3000,
    }
})