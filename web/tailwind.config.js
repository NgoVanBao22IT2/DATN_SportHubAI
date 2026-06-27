/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', // Giúp các class utility của Tailwind đè được CSS specificity của MUI khi cần
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#4f46e5',
          DEFAULT: '#4338ca',
          dark: '#3730a3',
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Tắt preflight để tránh xung đột với CssBaseline của Material UI
  },
}
