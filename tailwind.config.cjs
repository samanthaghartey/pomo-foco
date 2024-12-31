/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          light: "#85d7ff",
          default: "#1fb6ff",
          dark: "#009eeb",
        },
        primary: {
          DEFAULT: "var(--primary, #fbace2)",
          foreground: "hsl(var(--primary-foreground))",
          light: "var(--primarylight)",
        },

        mybackground: {
          DEFAULT: "var(--mybackground)",
        },
        myaccent: {
          DEFAULT: "var(--myaccent)",
        },
        mysecondary: {
          DEFAULT: "var(--mysecondary)",
          foreground: "hsl(var(--mysecondary))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
        },
        background: "hsl(var(--mybackground))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
};
