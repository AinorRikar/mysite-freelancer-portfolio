import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./src/app.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.vue",
    "./src/widgets/**/*.vue",
    "./src/features/**/*.vue",
    "./src/shared/**/*.vue",
    "./src/shared/config/**/*.ts",
    "./src/entities/**/*.vue"
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#141418",
          deep: "#0e0e11",
          surface: "#1a1a20",
          elevated: "#222228"
        },
        paper: {
          DEFAULT: "#faf7f0",
          muted: "#f0ebe3",
          border: "#ddd8ce",
          ink: "#1a1a18",
          mutedInk: "#5c5a55"
        },
        accent: {
          DEFAULT: "#2dd4bf",
          muted: "#5eead4",
          dim: "rgba(45, 212, 191, 0.12)"
        },
        product: {
          DEFAULT: "#3b82f6",
          muted: "#2563eb",
          dim: "rgba(59, 130, 246, 0.1)"
        }
      },
      fontFamily: {
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif"
        ],
        serif: ["Lora", "Georgia", "ui-serif", "serif"]
      },
      borderRadius: {
        paper: "10px"
      },
      boxShadow: {
        paper: "0 1px 2px rgba(0, 0, 0, 0.05)"
      },
      gridTemplateColumns: {
        hero: "minmax(0, 3fr) minmax(0, 7fr)"
      },
      backgroundImage: {
        "hero-cinematic":
          "linear-gradient(105deg, rgba(18,18,22,0.98) 0%, rgba(20,20,24,0.92) 42%, rgba(14,14,18,0.98) 100%)",
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")"
      }
    }
  }
};
