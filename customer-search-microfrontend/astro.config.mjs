import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        build: {
          format: "file"
        }
      }
    }
  },
  server: {
    port: 7200
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind(), react()]
});