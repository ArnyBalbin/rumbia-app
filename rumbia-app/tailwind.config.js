/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#012E4A',
        secondary: '#036280',
        accent: '#378BA4',
        light: '#81BECE',
        cream: '#E8EDE7',
        background: '#F7FAF9',
        textDark: '#0f172a',
        muted: '#495a6a',
      },
      borderRadius: {
        'custom': '16px',
      },
      boxShadow: {
        'custom': '0 6px 24px rgba(1, 46, 74, 0.15)',
      },
    },
  },
  plugins: [],
}