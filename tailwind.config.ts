import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          border: "#E2E8F0",
          darkborder: "#CBD5E1",
        },
        ink: {
          DEFAULT: "#0F2942",
          light: "#1E3A8A",
          soft: "#334155",
          muted: "#64748B",
        },
        accent: {
          DEFAULT: "#1A56DB",
          hover: "#1E429F",
          light: "#EFF6FF",
          border: "#BFDBFE",
          navy: "#0F2942",
          darknavy: "#0B192C",
        },
      },
      fontFamily: {
        sans: ["Almarai", "'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Tajawal", "Almarai", "sans-serif"],
        tajawal: ["Tajawal", "sans-serif"],
        almarai: ["Almarai", "sans-serif"],
        editorial: ["Tajawal", "'Playfair Display'", "Georgia", "serif"],
        latin: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        fine: "0 1px 3px rgba(19, 33, 29, 0.05), 0 1px 2px rgba(19, 33, 29, 0.03)",
        lifted: "0 6px 18px rgba(19, 33, 29, 0.06), 0 1px 3px rgba(19, 33, 29, 0.04)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;
