/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

const withMTConfig = withMT({
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
    },
  },
  plugins: [],
});

export default withMTConfig;
