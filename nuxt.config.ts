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
  runtimeConfig: {
    integrationSecret: process.env.INTEGRATION_SECRET ?? "",
    gogolDashboardBaseUrl:
      process.env.GOGOL_DASHBOARD_BASE_URL ?? "http://178.250.158.178/dashboard"
  }
});
