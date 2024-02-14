/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      background: '#111218',
      secondary: '#202332',
      dark: '#141721',
      gray: '#909090',
      white: '#ffffff',
      black: '#000000',
      block: '#1B1D2E',
      border: '#191B28',

      primary: {
        '50': '#f2f9fc',
        '100': '#e6f5fc',
        '200': '#c1e3f7',
        '300': '#99ccf0',
        '400': '#559de6',
        '500': '#1668dc',
        '600': '#1259c4',
        '700': '#0b43a3',
        '800': '#083285',
        '900': '#042163',
        '950': '#021240',
      },
    },
    extend: {
      fontFamily: {
        display: 'Poppins, ui-serif',
        header: 'Righteous, ui-serif',
      },
    },
  },
  plugins: [],
};
