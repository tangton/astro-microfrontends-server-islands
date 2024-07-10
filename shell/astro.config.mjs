import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    output: 'hybrid',
    server: {
        port: 7000
    },
    integrations: [tailwind()]
});
