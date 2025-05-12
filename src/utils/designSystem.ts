/**
 * RiseUp AI Design System
 * 
 * This file contains shared design tokens and styles to maintain consistency across
 * the entire application. Use these values instead of hardcoding colors, spacing,
 * or other design properties directly in components.
 */

// Color palette
export const colors = {
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
    400: "#38B000", // Main success
    500: "#2A9800",
  },
  error: {
    400: "#E63946",
    500: "#D32F2F",
  },
  warning: {
    400: "#FFBE0B",
    500: "#F59E0B",
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
  }
};

// Typography
export const typography = {
  fontFamily: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Roboto, system-ui, sans-serif",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  }
};

// Spacing
export const spacing = {
  0: "0",
  0.5: "0.125rem",  // 2px
  1: "0.25rem",     // 4px
  1.5: "0.375rem",  // 6px
  2: "0.5rem",      // 8px
  2.5: "0.625rem",  // 10px
  3: "0.75rem",     // 12px
  3.5: "0.875rem",  // 14px
  4: "1rem",        // 16px
  5: "1.25rem",     // 20px
  6: "1.5rem",      // 24px
  8: "2rem",        // 32px
  10: "2.5rem",     // 40px
  12: "3rem",       // 48px
  16: "4rem",       // 64px
  20: "5rem",       // 80px
  24: "6rem",       // 96px
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
  "dark-card": "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
  "dark-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
  "colored-glow": "0 0 15px rgba(110, 86, 207, 0.5)",
  "teal-glow": "0 0 15px rgba(26, 209, 165, 0.5)",
  "coral-glow": "0 0 15px rgba(247, 127, 110, 0.5)",
  none: "none",
};

// Border radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem",   // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem",   // 6px
  lg: "0.5rem",     // 8px
  xl: "0.75rem",    // 12px
  "2xl": "1rem",    // 16px
  "3xl": "1.5rem",  // 24px
  full: "9999px",
};

// Z-index
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50", // Default
  modal: "100",
  tooltip: "90",
  dropdown: "80",
  navbar: "50",
  toast: "1000",
};

// Animations
export const animations = {
  fadeIn: "fadeIn 0.5s ease-out",
  slideUp: "slideUp 0.5s ease-out",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 2s ease infinite",
  shimmer: "shimmer 2.5s linear infinite",
  gradientFlow: "gradientFlow 3s ease infinite",
  scale: "scale 0.3s ease-out",
};

// Transitions
export const transitions = {
  DEFAULT: "all 0.3s ease",
  fast: "all 0.15s ease",
  slow: "all 0.5s ease",
  colors: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  transform: "transform 0.3s ease",
  opacity: "opacity 0.3s ease",
};

// Common component styles
export const componentStyles = {
  // Card styles
  card: {
    light: "bg-white shadow-card rounded-lg hover:shadow-card-hover transition-shadow duration-300",
    dark: "bg-dark-200 shadow-dark-card rounded-lg hover:shadow-dark-hover transition-shadow duration-300",
  },
  
  // Button styles
  button: {
    primary: "bg-primary-400 hover:bg-primary-500 text-white",
    secondary: "bg-neutral-200 hover:bg-neutral-300 text-neutral-800 dark:bg-dark-50 dark:hover:bg-dark-100 dark:text-dark-text",
    success: "bg-success-400 hover:bg-success-500 text-white",
    error: "bg-error-400 hover:bg-error-500 text-white",
    outline: "border border-primary-400 text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-100 dark:border-dark-accent1 dark:text-dark-accent1",
    ghost: "text-primary-400 hover:bg-primary-50 dark:text-dark-accent1 dark:hover:bg-dark-100",
    base: "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  },
  
  // Form input styles
  input: {
    base: "w-full rounded-lg border transition-colors focus:outline-none focus:ring-2",
    light: "bg-white border-neutral-300 text-neutral-900 focus:border-primary-400 focus:ring-primary-400/50",
    dark: "bg-dark-200 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1/50"
  },
  
  // Section styles
  section: {
    light: "bg-neutral-50 border border-neutral-200 rounded-lg p-6",
    dark: "bg-dark-300 border border-dark-50 rounded-lg p-6"
  },
};

// Design tokens for specific UI patterns
export const patterns = {
  // Page headers
  pageHeader: {
    light: "mb-8 pb-4 border-b border-neutral-200",
    dark: "mb-8 pb-4 border-b border-dark-50"
  },
  
  // Feature sections
  featureSection: {
    light: "py-12 bg-neutral-50",
    dark: "py-12 bg-dark-300"
  },
  
  // Grid layouts
  grid: {
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    twoColumn: "grid grid-cols-1 lg:grid-cols-2 gap-8",
  },
  
  // Badge/tag styles
  badge: {
    primary: "bg-primary-100 text-primary-700 dark:bg-dark-accent1/20 dark:text-dark-accent1",
    success: "bg-success-100 text-success-700 dark:bg-success-400/20 dark:text-success-400",
    warning: "bg-warning-100 text-warning-700 dark:bg-warning-400/20 dark:text-warning-400",
    error: "bg-error-100 text-error-700 dark:bg-error-400/20 dark:text-error-400",
    base: "px-2.5 py-0.5 rounded-full text-xs font-medium"
  }
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  zIndex,
  animations,
  transitions,
  componentStyles,
  patterns
}; 