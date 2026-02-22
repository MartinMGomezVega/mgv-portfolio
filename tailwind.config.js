/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          primary: '#0A192F',    // Prussian Blue
          secondary: '#112240',  // Slate Blue
          accent: '#64FFDA',     // Aquamarine
          highlight: '#61DAFB',  // React Blue
          text: '#E6F1FF',       // Ice White
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'steel-gradient': 'linear-gradient(135deg, #0A192F 0%, #112240 100%)',
      }
    },
  },
  plugins: [],
}
