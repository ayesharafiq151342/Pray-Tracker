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
        sans: "Inter",
        heading: "Poppins",
      },
      colors: {
        primary: "#1D4ED8",
        secondary: "#9333EA",
        dark: "#111827",
        light: "#F3F4F6",
        darkGreen: "#043232", 
        lightGreen:"#01A728",
        HoverGreen:"#27873d"
      },
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
  plugins: [],
};

export default config;
