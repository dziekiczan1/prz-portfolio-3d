import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
          fontFamily: {
              roboto: ["var(--font-dmSans)", "sans-serif"],
              orbitron: ["var(--font-orbitron)", "sans-serif"],
          }
  	}
  },
  plugins: [],
};
export default config;
