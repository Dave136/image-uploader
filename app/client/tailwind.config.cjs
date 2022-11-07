/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F80ED',
        'primary-hover': '#0e6eec',
        'custom-light': '#f2f2f2',
        'custom-color-1': '#E0E0E0',
        'custom-color-2': '#f6f8fb',
      },
      textColor: {
        'custom-color': '#4F4F4F',
      },
      keyframes: {
        loader: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(225px)' },
        },
      },
      animation: {
        loader: 'loader 1s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
