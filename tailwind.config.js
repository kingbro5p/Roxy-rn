/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#100C1A",
        surface: "#1A1526",
        surface2: "#221B32",
        line: "#332A47",
        mist: "#9A93AC",
        fog: "#CFC9DC",
        paper: "#F5F2FA",
        roxy: {
          50: "#FFF0F6",
          200: "#FFB8D9",
          400: "#FF6FAE",
          500: "#FF3D81",
          600: "#E01E63",
          700: "#B3134C",
        },
        indigo: {
          400: "#8B7CF6",
          500: "#6C4CF1",
          600: "#5636D6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "roxy-aurora":
          "radial-gradient(60% 60% at 20% 20%, rgba(255,61,129,0.35) 0%, rgba(255,61,129,0) 60%), radial-gradient(50% 50% at 85% 15%, rgba(108,76,241,0.35) 0%, rgba(108,76,241,0) 60%), radial-gradient(70% 70% at 50% 100%, rgba(139,124,246,0.25) 0%, rgba(139,124,246,0) 60%)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.97)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        rise: "rise 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
