/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    screens: {
      xs: { max: "25em" },
      // => @media (max-width: 400px (25em) --> Screen width has to be lesser than 400px for this to apply) { ... }

      sm: { max: "36em" },
      // => @media (max-width: 576px (36em) --> Screen width has to be lesser than 576px for this to apply) { ... }

      md: { max: "48em" },
      // => @media (max-width: 768px (48em) --> Screen width has to be lesser than 768px for this to apply) { ... }

      lg: { max: "62em" },
      // => @media (max-width: 992px (62em) --> Screen width has to be lesser than 992px for this to apply) { ... }

      xl: { max: "74.94em" },
      // => @media (max-width: 1199px (74.74em) --> Screen width has to be lesser than 1199px for this to apply) { ... }
      
      "2xl": "1400px",
        // => @media (min-width: 1400px) { ... }
        
        "2xl-above": { min: "75em" },
        // => @media (min-width: 1200px (75em) --> Screen width has to be greater than 1200px for this to apply) { ... }

        "3xl-above": { min: "120em" },
        // => @media (min-width: 1920px (120em) --> Screen width has to be greater than 1920 for this to apply) { ... }
      
    },

    extend: {
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
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}