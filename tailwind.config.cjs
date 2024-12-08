/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupcake", 
      {
        mytheme: {
          "primary": "#ff00ee",
          "secondary": "#0000ff",
          "accent": "#0000ff",
          "neutral": "#05190a",
          "base-100": "#252530",
          "info": "#007cb6",
          "success": "#3ba22e",
          "warning": "#9b5800",
          "error": "#d5004c",
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('daisyui'),
  ],
}
