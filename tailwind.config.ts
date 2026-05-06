import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./app.vue",
    "./pages/**/*.vue",
    "./components/**/*.vue",
    "./widgets/**/*.vue",
    "./features/**/*.vue",
    "./shared-ui/**/*.vue",
    "./entities/**/*.vue"
  ]
};
