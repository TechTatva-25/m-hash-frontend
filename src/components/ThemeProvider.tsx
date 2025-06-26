"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
	theme: "light",
	setTheme: () => null,
	toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);
	const [mounted, setMounted] = useState(false);

	// Only run once on mount to prevent hydration issues
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem(storageKey) as Theme | null;

		if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
			setTheme(savedTheme);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		}
	}, [storageKey]);

	// Apply theme class and save to localStorage whenever theme changes
	useEffect(() => {
		if (!mounted) return;

		const root = window.document.documentElement;

		// First remove both classes to ensure clean state
		root.classList.remove("light", "dark");
		// Then add the current theme
		root.classList.add(theme);

		// Save to localStorage for persistence
		localStorage.setItem(storageKey, theme);
		// (Removed DOM repaint hack that caused scroll-to-top)
	}, [theme, storageKey, mounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const value = {
		theme,
		setTheme,
		toggleTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
