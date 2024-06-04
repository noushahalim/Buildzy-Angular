/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'engineer1':"url('/assets/images/BuildingEngineer.jpg')",
        'engineer2':"url('/assets/images/BuildingEngineer2.jpg')"
      }
    },
  },
  plugins: [],
}

