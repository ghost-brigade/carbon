/* eslint-disable */
const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        carbon: {
          "primary": "#6665DD",
          "secondary": "#a1cef7",
          "accent": "#00BB7E",
          "neutral": "#282B2A",
          "base-100": "#FDFDFD",
          "info": "#6665DD",
          "success": "#36d399",
          "warning": "#facc15",
          "error": "#E53F49",
        },
      },
    ],
  },
};
