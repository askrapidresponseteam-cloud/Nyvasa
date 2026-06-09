import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#FAF7F0",
        ink: "#1A1612",
        loden: "#26352B",
        "loden-soft": "#3A4D40",
        sienna: "#B85C3A",
        smoke: "#6B6259",
        hairline: "#D9D2C5",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-fraunces)", "Georgia", "serif"],
        ui: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.02em",
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
