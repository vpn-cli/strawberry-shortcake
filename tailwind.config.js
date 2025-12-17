/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5CF6", // Violet-500
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A78BFA", // Violet-400
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F472B6", // Pink-400
          foreground: "#FFFFFF",
        },
        background: "#FDF4FF", // Very light pink/purple mix
        foreground: "#1F2937",
        muted: "#F3E8FF",
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        handwriting: ['"Indie Flower"', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
