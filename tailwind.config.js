/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#cc0000",
        secondary: "#ff0000",
        bug: "#94bc4a",
        dark: "#736c75",
        dragon: "#6a7baf",
        electric: "#e5c531",
        fairy: "#e397d1",
        fighting: "#cb5f48",
        fire: "#ea7a3c",
        flying: "#7da6de",
        ghost: "#846ab6",
        grass: "#71c558",
        ground: "#cc9f4f",
        ice: "#70cbd4",
        normal: "#aab09f",
        poison: "#b468b7",
        psychic: "#e5709b",
        rock: "#b2a061",
        steel: "#89a1b0",
        water: "#539ae2",
      },
    },
  },
  plugins: [],
};
