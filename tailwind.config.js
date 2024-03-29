/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      
      // padding: "2rem",
      screens: {
        "sm":"640px",
        "md":"768px",
        "lg":"1024px",
        "xl":"1300px",
      },
    },
    extend: {
      maxWidth: {
        "8xl": "90rem"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textColor: {
        "primary-text": "#000",
        "secondary-text": "#737373",
        "accent-text": "#2dd4be",
        "accent-text-dark": "#115e59",
        "accent": "#27A68F",
        "modal": "#21e9c5"
      },
      backgroundColor: {
        "primary-bg": "#fff",
        "secondary-bg": "#21e9c5",
        "ternary-bg": "#094044",
        "dark-bg":"#121212",
        "dark-ll-bg":"#1e1e1e",
        "dark-ul-bg":"",
        "accent": "#E0F6F2",
        "modal": "#c8e8e2"
      },
      width: {
        "testimony": "30rem",
        "user": "30rem",
      },
      borderColor: {
        "secondary": "#21e9c5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};