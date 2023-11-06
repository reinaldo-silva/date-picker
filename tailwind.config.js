/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
  // prefix: 'date-picker-',
};
