import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkish: "#f7cfe0",
        lilac: "#d9caff",
        cream: "#fffaf8",
        mutedBlue: "#b8b8ff",
      },
      fontFamily: {
        header: ["Italianno", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// ✅ assign to variable first, then export
export default config;
