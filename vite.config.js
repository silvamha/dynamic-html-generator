// vite.config.js
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        // Dynamically include generated session HTML files
        ...(() => {
          try {
            // Run script to generate session files before build
            execSync('node script.js', { stdio: 'inherit' });
            
            // Dynamically find generated session files
            const sessionsDir = path.join(__dirname, 'dist', 'sessions');
            
            return Object.fromEntries(
              fs.readdirSync(sessionsDir)
                .filter(file => file.endsWith('.html'))
                .map(file => [
                  `session_${file.replace('.html', '')}`, 
                  path.join(sessionsDir, file)
                ])
            );
          } catch (error) {
            console.error('Error generating session files:', error);
            return {};
          }
        })()
      }
    }
  }
});