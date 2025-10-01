// module.exports = {
//   theme: {
//     extend: {
//       boxShadow: {
//         'strong': '0 30px 60px -10px rgba(0, 0, 0, 0.25)',
//       }
//     }
//   }
// }

// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Professional font
      },
      colors: {
        'primary': '#1987BF', // A professional blue
        'primary-hover': '#1474a4',
        'neutral': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          600: '#6c757d',
          900: '#212529',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For styling blog content
  ],
}