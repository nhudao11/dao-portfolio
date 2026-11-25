import type { Config } from "tailwindcss";

/**
 * Tokens mirror the "DAO. — The Quality Mindset" design system.
 * Colours are CSS variables (see app/globals.css) so a dark theme can reuse them.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        raised: "rgb(var(--surface-raised-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--ink-muted-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong-rgb) / <alpha-value>)",
        lime: "rgb(var(--lime-rgb) / <alpha-value>)",
        orange: "rgb(var(--orange-rgb) / <alpha-value>)",
        panel: "rgb(var(--panel-rgb) / <alpha-value>)",
        "on-panel": "rgb(var(--on-panel-rgb) / <alpha-value>)",
        "on-panel-muted": "rgb(var(--on-panel-muted-rgb) / <alpha-value>)",
        "panel-line": "rgb(var(--panel-line-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        label: ["12px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "500" }],
        metric: ["14px", { lineHeight: "20px" }],
        code: ["13px", { lineHeight: "22px" }],
        small: ["14px", { lineHeight: "22px" }],
        body: ["16px", { lineHeight: "26px" }],
        lead: ["clamp(18px, 1.6vw, 20px)", { lineHeight: "1.5" }],
        h3: ["24px", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h2: ["clamp(28px, 3.4vw, 36px)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        h1: ["clamp(36px, 5.5vw, 56px)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-l": ["clamp(44px, 7vw, 80px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(38px, 6.3vw, 92px)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
      },
      borderRadius: { xs: "2px", pill: "999px" },
      spacing: { 18: "72px", 24: "96px", 40: "160px" },
      maxWidth: { page: "1440px", prose: "38rem" },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
