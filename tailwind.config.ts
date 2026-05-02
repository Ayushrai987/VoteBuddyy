import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF6B35",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        india: {
          green: "#138808",
          white: "#FFFFFF",
          blue: "#000080",
          ashoka: "#0EA5E9",
        },
        dark: {
          primary: "#0a0e1a",
          secondary: "#111827",
          card: "#0f1729",
          glass: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "sans-serif"],
      },
      animation: {
        "float": "float 20s ease-in-out infinite",
        "float-delayed": "float 25s ease-in-out infinite -5s",
        "float-slow": "float 30s ease-in-out infinite -10s",
        "spin-slow": "spin 12s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "slide-down": "slideDown 0.5s ease forwards",
        "count-up": "countUp 2s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "ticker": "ticker 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, -40px) scale(1.05)" },
          "50%": { transform: "translate(-20px, 30px) scale(0.95)" },
          "75%": { transform: "translate(40px, 20px) scale(1.02)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255,107,53,0.15)",
        "glow-lg": "0 0 40px rgba(255,107,53,0.25)",
        card: "0 4px 20px rgba(0,0,0,0.4)",
        "card-light": "0 4px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
