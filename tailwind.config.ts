import type { Config } from "tailwindcss";

const gray = {
  100: "#ebeff2",
  150: "#dae2e9",
  200: "#cbd7e2",
  300: "#afc2d4",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      0: "0px",
      1: "1px",
      2: "0.125rem",
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      16: "1rem",
      24: "1.5rem",
      32: "2rem",
      48: "3rem",
      64: "4rem",
      80: "5rem",
      96: "6rem",
      112: "7rem",
      128: "8rem",
    },
    extend: {
      fontFamily: {
        mono: "var(--font-mono)",
        sans: "var(--font-sans)",
      },
      colors: {
        gray,
        accent: {
          light: "#fdd6d6",
          DEFAULT: "#f16060",
        },
        finger: {
          2: gray[100],
          3: gray[150],
          4: gray[200],
          5: gray[300],
        },
      },
      boxShadow: {
        elevated:
          "-1px 1px 5px rgba(0, 0, 0, .02), 1px -1px 5px rgba(0, 0, 0, .04), -1px -1px 5px rgba(255, 255, 255, .9), 1px 1px 5px rgba(0, 0, 0, .09), inset .5px .5px 1px rgba(255, 255, 255, .3), inset -.5px -.5px 1px rgba(0, 0, 0, .08)",
        pressed:
          ".5px .5px 1px rgba(255, 255, 255, .3), -.5px -.5px 1px rgba(0, 0, 0, .08), inset -1px 1px 5px rgba(0, 0, 0, .09), inset 1px -1px 5px rgba(0, 0, 0, .05), inset -1px -1px 5px rgba(255, 255, 255, .9), inset 1px 1px 5px rgba(0, 0, 0, .1)",
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        caret: "caret 1200ms infinite step-start",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg) translateY(0px)" },
          "50%": { transform: "rotate(8deg) translateY(-5px)" },
        },
        caret: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
