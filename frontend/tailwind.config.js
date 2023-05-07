/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        "Lobster": "var(--font-family1)",
        "Rubik": "var(--font-family2)"
      }
    },
  },
  plugins: [],
}

