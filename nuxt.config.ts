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
  tailwindcss: {
    cssPath: "~/assets/css/main.css"
  },
  app: {
    head: {
      title: "Главная",
      titleTemplate: "%s",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap"
        }
      ]
    }
  },
  runtimeConfig: {
    integrationSecret: "",
    gogolDashboardBaseUrl: ""
  }
});
