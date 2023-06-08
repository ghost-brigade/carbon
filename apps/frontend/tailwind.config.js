/* eslint-disable */
const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    "col-span-1",
    "col-span-2",
    "alert-success", 
    "alert-warning", 
    "alert-error", 
    "alert-info"
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
          "neutral": "#FFFFFF",
          "base-100": "#282B2A",
          "info": "#6665DD",
          "base-content": "#FFFFFF",
          "success": "#36d399",
          "warning": "#facc15",
          "error": "#E53F49",
        },
      },
    ],
  },
};
