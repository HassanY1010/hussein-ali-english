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
          50: "#FCFBF8",
          100: "#F8F6F0",
          200: "#EFECE1",
          300: "#E2DDD0",
          border: "#E7E3D8",
          darkborder: "#333D39",
        },
        ink: {
          DEFAULT: "#13211D",
          light: "#213630",
          soft: "#3A4F48",
          muted: "#6B7C75",
        },
        accent: {
          DEFAULT: "#BA7C2C",
          hover: "#A36B23",
          light: "#FDF8F0",
          border: "#E9D2B5",
        },
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["'Playfair Display'", "Georgia", "serif"],
        latin: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        fine: "0 1px 3px rgba(19, 33, 29, 0.05), 0 1px 2px rgba(19, 33, 29, 0.03)",
        lifted: "0 6px 18px rgba(19, 33, 29, 0.06), 0 1px 3px rgba(19, 33, 29, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
