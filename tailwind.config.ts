import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071421",
        emerald: "#0f8a63",
        gold: "#f3c64c",
        jade: "#9de2cb",
        pearl: "#fff7dc"
      },
      boxShadow: {
        glow: "0 0 42px rgba(243, 198, 76, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
