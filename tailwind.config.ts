import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fadeOut": {
          '0%': { "opacity": "1" },
          '50%': { "opacity": "1" },
          '100%': { "opacity": "0" },
        },
        'border-dance': {
          '0%, 100%': { borderColor: '#000' },
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        "fadeOut": 'fadeOut 2.5s ease-out forwards',
        'border-dance': 'border-dance 1s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
