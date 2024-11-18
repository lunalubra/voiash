/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display"],
        martel: ["Martel"]
      },
      colors: {
        "brand-beige": "#FFF5EB",
        "brand-beige-200": "#E7C9A8",
        "brand-beige-300": "#B48149",
        "brand-beige-400": "#482E12"
      }
    }
  },
  plugins: []
};
