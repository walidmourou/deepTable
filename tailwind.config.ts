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
        // DeepTable Color Scheme - Flattened for proper Tailwind usage
        "deep-table-primary": "var(--deep-table-primary, #009ee3)",
        "deep-table-primary-light": "var(--deep-table-primary-light, #afd3e8)",
        "deep-table-primary-medium":
          "var(--deep-table-primary-medium, #007caa)",
        "deep-table-primary-dark": "var(--deep-table-primary-dark, #00597a)",

        "deep-table-secondary-100": "var(--deep-table-secondary-100, #e6ecf0)",
        "deep-table-secondary-200": "var(--deep-table-secondary-200, #c3ced5)",
        "deep-table-secondary-300": "var(--deep-table-secondary-300, #8fa2ac)",
        "deep-table-secondary-400": "var(--deep-table-secondary-400, #506671)",
        "deep-table-secondary-500": "var(--deep-table-secondary-500, #3d525a)",

        "deep-table-content-yellow":
          "var(--deep-table-content-yellow, #ffcc00)",
        "deep-table-content-red": "var(--deep-table-content-red, #d50c2f)",
        "deep-table-content-orange":
          "var(--deep-table-content-orange, #e94c0a)",

        "deep-table-bg-main": "var(--deep-table-bg-main, #f4f4f5)",
        "deep-table-bg-white": "var(--deep-table-bg-white, #ffffff)",
        "deep-table-bg-error": "var(--deep-table-bg-error, #fef2f2)",

        "deep-table-semantic-pink-text":
          "var(--deep-table-semantic-pink-text, #9f1239)",

        // Legacy color support (backwards compatibility)
        primary: {
          DEFAULT: "var(--deep-table-primary, #009ee3)",
          light: "var(--deep-table-primary-light, #afd3e8)",
          medium: "var(--deep-table-primary-medium, #007caa)",
          dark: "var(--deep-table-primary-dark, #00597a)",
        },
        pinky: {
          DEFAULT: "var(--color-pinky, #e5007d)",
          dark: "var(--color-pinky-dark, #7b0040)",
          medium: "var(--color-pinky-medium, #a8005c)",
        },
        secondary: {
          100: "var(--deep-table-secondary-100, #e6ecf0)",
          200: "var(--deep-table-secondary-200, #c3ced5)",
          300: "var(--deep-table-secondary-300, #8fa2ac)",
          400: "var(--deep-table-secondary-400, #506671)",
          500: "var(--deep-table-secondary-500, #3d525a)",
        },
        content: {
          "yellow-light": "var(--color-content-yellow-light, #ffe596)",
          yellow: "var(--deep-table-content-yellow, #ffcc00)",
          peach: "var(--color-content-peach, #fbcdab)",
          red: "var(--deep-table-content-red, #d50c2f)",
          orange: "var(--deep-table-content-orange, #e94c0a)",
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
