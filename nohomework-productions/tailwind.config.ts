import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'warm-off-white': '#F9F6F1',
        'burnt-orange': '#E07A5F',
        'mustard': '#D4A373',
        'charcoal-gray': '#3D3D3D'
      },
    },
  },
  plugins: [],
} satisfies Config;


