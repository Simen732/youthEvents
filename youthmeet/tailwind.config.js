/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      // => @media (min-width: 480px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        oranienbaum: ['Oranienbaum', 'serif'],
      },
      colors: {
        primary: "#EC9928",
        secondary: "#3FD13D"
      },
      screens: {
        'max-sm': {'max': '479px'}, // applies styles for screens up to 479px wide
      },
    },
  },
  plugins: [
    require('tailwind-children'),
    ]
}

