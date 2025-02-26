// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        indigo: {
          950: '#1a1a2e',
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      },
      minHeight: {
        '40': '10rem',
      },
    },
  },
  plugins: [],
}
