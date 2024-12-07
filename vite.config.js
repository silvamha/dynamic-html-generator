import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        open: true, // Auto-opens the browser when running dev
        port: 3000, // Specify port (optional)
        host: true, // Expose to network
    }
})