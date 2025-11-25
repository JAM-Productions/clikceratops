/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['monospace'], // Placeholder, will update with specific mono font if needed or use default
      },
    },
  },
  plugins: [],
}
