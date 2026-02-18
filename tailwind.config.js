/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grid-soft":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.2) 1px, transparent 0)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15,23,42,0.15)",
      },
    },
  },
  plugins: [],
};
