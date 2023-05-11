/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        "signup-bg": "url('./src/assets/signup-bg.jpg')"
      },
      fontFamily: {
        "Lobster": "var(--font-family1)",
        "Rubik": "var(--font-family2)"
      }
    },
  },
  plugins: [],
}

