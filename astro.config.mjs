// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://portefolio-hiba-chghaf.vercel.app',
  security: {
    checkOrigin: false,
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});