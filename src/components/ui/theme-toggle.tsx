"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="group relative">
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				aria-label="Toggle theme"
				className="relative h-10 w-10 rounded-full cursor-pointer transition-all duration-500 ease-out hover:scale-105 active:scale-95 border-0 p-0 overflow-hidden">

				{/* Outer border ring for better definition */}
				<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

				{/* Glow effect */}
				<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

				{/* Enhanced glassmorphic background */}
				<div className="absolute inset-1 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-3xl"></div>

				{/* Inner highlight */}
				<div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>

				{/* Icon with smooth transition */}
				<div className="relative z-10 transition-all duration-300 group-hover:scale-110 text-white">
					{theme === "light" ? (
						<Moon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
					) : (
						<Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
					)}
				</div>

				{/* Ripple effect on click */}
				<div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 group-active:animate-ping bg-white/30 pointer-events-none"></div>
			</Button>
		</div>
	);
}
