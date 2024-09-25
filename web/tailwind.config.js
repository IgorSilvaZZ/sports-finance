/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundLogin: "#fff9ef",
        skyLight: "#96cdef",
        skyBold: "#346e93",
      },
    },
  },
  plugins: [],
};
