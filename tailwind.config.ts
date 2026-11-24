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
          50: "#FAF9F5",
          100: "#F5F3EC",
          200: "#ECE7DC",
          300: "#DED7C8",
          border: "#E5DFD1",
          darkborder: "#424941",
        },
        ink: {
          DEFAULT: "#1A2F4C",      // الأزرق الكحلي الداكن الرسمي
          deep: "#112035",         // كحلي أعمق
          light: "#243E63",        // كحلي متوسط للحدود والقوائم
          soft: "#424941",         // الرمادي الزيتي/المخضر الداكن للنصوص
          muted: "#66746E",        // رمادي زيتي ناعم
        },
        accent: {
          DEFAULT: "#D4AF37",      // الذهبي الملكي اللامع (Royal Gold)
          hover: "#C5A059",        // الذهبي العسلي الخافت (Muted Gold/Honey)
          honey: "#C5A059",        // الذهبي العسلي الخافت
          bronze: "#8C7853",       // البرونزي / الذهبي الداكن
          light: "#FAF6EC",        // خلفية ذهبية عاجية ناعمة جداً
          border: "#DECBA5",       // حدود ذهبية ناعمة
        },
        royalGold: {
          DEFAULT: "#D4AF37",
          light: "#E5C866",
          dark: "#B89528",
        },
        honeyGold: {
          DEFAULT: "#C5A059",
          light: "#D4B678",
          dark: "#A88440",
        },
        navy: {
          DEFAULT: "#1A2F4C",
          dark: "#112035",
          light: "#253E63",
        },
        slateOlive: {
          DEFAULT: "#424941",
          light: "#5A6359",
          muted: "#66746E",
        },
        bronze: {
          DEFAULT: "#8C7853",
          light: "#A5906A",
          dark: "#6F5E3E",
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
        fine: "0 1px 3px rgba(26, 47, 76, 0.05), 0 1px 2px rgba(26, 47, 76, 0.03)",
        lifted: "0 6px 18px rgba(26, 47, 76, 0.07), 0 1px 3px rgba(26, 47, 76, 0.04)",
        gold: "0 4px 14px rgba(212, 175, 55, 0.25)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;
