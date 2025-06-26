/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				"playfair-display": ["var(--font-playfair-display)"],
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
				"float-slow": {
					"0%": { transform: "translateY(0) translateX(0)" },
					"25%": { transform: "translateY(-10px) translateX(5px)" },
					"50%": { transform: "translateY(0) translateX(10px)" },
					"75%": { transform: "translateY(10px) translateX(5px)" },
					"100%": { transform: "translateY(0) translateX(0)" },
				},
				"pulse-slow": {
					"0%": { opacity: "0.3" },
					"50%": { opacity: "0.5" },
					"100%": { opacity: "0.3" },
				},
				shimmer: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"float-slow": "float-slow 8s ease-in-out infinite",
				"pulse-slow": "pulse-slow 6s ease-in-out infinite",
				shimmer: "shimmer 2.5s infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
