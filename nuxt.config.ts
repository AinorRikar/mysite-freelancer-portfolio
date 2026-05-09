import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "src/",
  ssr: true,
  compatibilityDate: "2025-01-01",
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"]
});
