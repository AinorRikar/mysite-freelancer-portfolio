export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  experimental: {
    appManifest: false
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    config: {
      content: [
        "./app.vue",
        "./pages/**/*.vue",
        "./components/**/*.vue",
        "./widgets/**/*.vue",
        "./features/**/*.vue",
        "./shared-ui/**/*.vue"
      ]
    }
  }
});
