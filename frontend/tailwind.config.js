/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#075cf5',
        secondary: '#00c3c7',
        tertiary: '#D22DC9',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', "Quicksand"],
        cinzel: ['Cinzel', 'serif'],

      },
     container: {
       center: true,
       padding:{
        DEFAULT:'1rem',
        sm: '2rem',
        lg:'4rem',
        xl:'5rem',
        '2xl':'6rem',
       }
    }
  },
},
  plugins: [],
}