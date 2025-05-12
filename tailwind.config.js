/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#E6EDFF",
          100: "#C7D5FF",
          200: "#94ACFF",
          300: "#6282FF",
          400: "#4361EE", // Main primary
          500: "#304CD6",
          600: "#2337BF",
          700: "#1A2A99",
          800: "#111D72",
          900: "#090F4C",
        },
        dark: {
          50: "#383C4A", // Light element bg
          100: "#2E3440", // Nav and headers
          200: "#272C3A", // Card backgrounds
          300: "#20242F", // Container backgrounds
          400: "#181C24", // Main background
          500: "#121418", // Deep background
          accent1: "#6E56CF", // First accent (violet)
          accent2: "#1AD1A5", // Second accent (teal)
          accent3: "#F77F6E", // Third accent (coral)
          text: "#ECEFF4", // Main text
          textSecondary: "#A9B1D6", // Secondary text
        },
        success: {
          50: "#E6F7E6",
          100: "#CCEFD0",
          200: "#99DF9E",
          300: "#66CF6C",
          400: "#38B000", // Main success
          500: "#2A9800",
          600: "#1F8000",
          700: "#176800",
          800: "#0F5000",
          900: "#073300",
        },
        accent: {
          50: "#FFF5E5",
          100: "#FFEAC7",
          200: "#FFD58F",
          300: "#FFC057",
          400: "#FF9F1C", // Main accent
          500: "#FF8A00",
          600: "#D67100",
          700: "#AD5800",
          800: "#854000",
          900: "#5C2700",
        },
        warning: {
          400: "#FFBE0B",
        },
        error: {
          400: "#E63946",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        "dark-card":
          "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
        "dark-hover":
          "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        "colored-glow": "0 0 15px rgba(110, 86, 207, 0.5)",
        "teal-glow": "0 0 15px rgba(26, 209, 165, 0.5)",
        "coral-glow": "0 0 15px rgba(247, 127, 110, 0.5)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        scale: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 2s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        gradientFlow: "gradientFlow 3s ease infinite",
        scale: "scale 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-shimmer":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        "gradient-flow": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
