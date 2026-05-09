import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./src/app.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.vue",
    "./src/widgets/**/*.vue",
    "./src/features/**/*.vue",
    "./src/shared/**/*.vue",
    "./src/entities/**/*.vue"
  ]
};
