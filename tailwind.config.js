/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e61030",
        secondary: "#ffed4a",
        dark: {
          100: "#242124",
          200: "#5b5555",
        },
        light: "#fffbf9",
        lightGrey: "#bdb9b9",
      },
      keyframes: {
        favoriteIcon: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(0.9)" },
          "70%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "favorite-icon": "favoriteIcon 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
