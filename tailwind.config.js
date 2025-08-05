export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
};
export const plugins = [require("@tailwindcss/line-clamp")];
