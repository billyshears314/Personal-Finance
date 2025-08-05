import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-category-green",
    "bg-category-yellow",
    "bg-category-cyan",
    "bg-category-navy",
    "bg-category-red",
    "bg-category-beige",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "beige-100": "#F8F4F0", // Adding beige color
        green2: "#277C78",
        // "category-1": "#277C78",
        // "category-2": "#82C9D7",
        // "category-3": "#F2CDAC",
        // "category-4": "#626070",
        "category-green": "#277C78",
        "category-yellow": "#F2CDAC",
        "category-cyan": "#82C9D7",
        "category-navy": "#626070",
        "category-red": "#C94736",
        "category-beige": "#F8F4F0",
      },
      fontFamily: {
        public: ["Public Sans", "sans-serif"],
      },
      fontSize: {
        xxs: "0.625rem", // 10px
      },
    },
  },
  plugins: [],
} satisfies Config;
