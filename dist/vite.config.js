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
        // Copy all assets including styles.css
        assetsDir: '',
        copyPublicDir: true
    },
    server: {
        open: true,
        port: 3000,
    },
    // Make sure styles.css is treated as a public asset
    publicDir: './'
})