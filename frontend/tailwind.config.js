/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#2E8B57",
      secondary: { DEFAULT: "#819685", light: "#D0E1CA", lighter: "#EFF5ED" },
      tertiary: "#6d97a3",
      neutral: "#FAFDF7",
      black: "#000000",
      white: "#FFFFFF",
      gray: {
        DEFAULT: "#999999",
        light: "#BDBDBD",
        lighter: "#d3d3d3",
        lightest: "#E8E8E8",
      },
      attention: "#D42121",
    },
    minWidth: {
      "1/2": "50%",
      "2/5": "40%",
    },
    maxHeight: {
      "3/5": "60%",
    },
    extend: {
      fontFamily: {
        zen: ["zen", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
}
