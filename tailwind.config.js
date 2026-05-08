/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: { colors: {
    primary: '#2E4036',
    accent:  '#CC5833',
    appbg:   '#F2F0E9',
    apptext: '#1A1A1A',
  } } },
  plugins: [],
};
