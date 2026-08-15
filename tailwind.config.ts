import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0B0E14",
        panel: "#12161F",
        panel2: "#171C28",
        line: "#232937",
        linesoft: "#1B2029",
        primary: "#E6E9EF",
        muted: "#7C8698",
        dim: "#4E5769",
        amber: "#F2A93B",
        teal: "#4FD1C5",
      },
      fontFamily: {
        mono: ["var(--font-jbmono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(#1B2029 1px, transparent 1px), linear-gradient(90deg, #1B2029 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
    },
  },
  plugins: [],
};

export default config;
