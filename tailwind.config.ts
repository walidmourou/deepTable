import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #009ee3)",
          light: "var(--color-primary-light, #afd3e8)",
          medium: "var(--color-primary-medium, #007caa)",
          dark: "var(--color-primary-dark, #00597a)",
        },
        pinky: {
          DEFAULT: "var(--color-pinky, #e5007d)",
          dark: "var(--color-pinky-dark, #7b0040)",
          medium: "var(--color-pinky-medium, #a8005c)",
        },
        secondary: {
          100: "var(--color-secondary-100, #e6ecf0)",
          200: "var(--color-secondary-200, #c3ced5)",
          300: "var(--color-secondary-300, #8fa2ac)",
          400: "var(--color-secondary-400, #506671)",
        },
        content: {
          "yellow-light": "var(--color-content-yellow-light, #ffe596)",
          yellow: "var(--color-content-yellow, #ffcc00)",
          peach: "var(--color-content-peach, #fbcdab)",
          red: "var(--color-content-red, #d50c2f)",
          orange: "var(--color-content-orange, #e94c0a)",
          brown: "var(--color-content-brown, #652e2b)",
          "green-light": "var(--color-content-green-light, #c2ddaf)",
          green: "var(--color-content-green, #54a931)",
          "green-dark": "var(--color-content-green-dark, #486f4f)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
