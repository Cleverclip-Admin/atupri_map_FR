/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    colors: {
      blue: "#324AB5",
      black: "#000",
      white: "#FFF",
      off_white: "#EEE",
      green: "#C12273",
      red: "#FF3C34",
      purple: "#694bA7",
      light_blue: "#8CCDF2",
    },
    extend: {},
  },
  safelist: [
    "bg-blue",
    "bg-black",
    "bg-white",
    "bg-green",
    "bg-red",
    "bg-purple",
    "bg-light_blue",
    {
      pattern: /scale-./,
    },
  ],
  plugins: [],
};
