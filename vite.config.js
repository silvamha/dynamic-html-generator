// import { defineConfig } from 'vite'

// export default defineConfig({
//     server: {
//         open: true, 
//         port: 3000, 
//         host: true, 
//     }
// })

// import { defineConfig } from 'vite';

// export default defineConfig({
//     build: {
//         rollupOptions: {
//             input: {
//                 main: './index.html', // Define only what should be built
//             },
//         },
//     },
// });



// import { defineConfig } from 'vite'

// export default defineConfig({
//     server: {
//         open: true,
//         port: 3000,
//     },
//     build: {
//         // Don't clean the output directory between builds
//         emptyOutDir: false,
//         // Copy all assets
//         copyPublicDir: true,
//     }
// })

import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        open: true,
        port: 3000,
    },
    build: {
        // Don't clean the output directory between builds
        emptyOutDir: false,
        // Copy all assets
        copyPublicDir: true,
        // Specify public directory
        publicDir: 'public',
        // Preserve the directory structure
        assetsDir: '',
    }
})