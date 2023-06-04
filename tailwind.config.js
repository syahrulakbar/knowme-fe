/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: {
        9: "repeat(9, minmax(0, 1fr))",
      },
      colors: {
        "primary-blue": "#145488",
        "primary-black": "#030711",
        "secondary-green": "#007889",
      },
    },
  },
  plugins: [],
};
