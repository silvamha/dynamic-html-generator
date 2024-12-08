import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clear the dist folder before building
    rollupOptions: {
      input: {
        main: 'index.html', // Define your main input file
      },
    },
  },
});
