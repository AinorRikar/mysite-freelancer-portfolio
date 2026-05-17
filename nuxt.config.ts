import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "src/",
  serverDir: "server",
  ssr: true,
  compatibilityDate: "2025-01-01",
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Главная",
      titleTemplate: "%s"
    }
  },
  runtimeConfig: {
    integrationSecret: "",
    gogolDashboardBaseUrl: "http://gogol-dashboard:3000/dashboard"
  }
});
