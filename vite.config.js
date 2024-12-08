import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        emptyOutDir: false, // Prevent clearing the dist directory
        outDir: 'dist',     // Output directory for the build
    },
});
