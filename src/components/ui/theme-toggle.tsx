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
				{/* Outer border ring with royal green */}
				<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

				{/* Royal Green glow effect */}
				<div 
					className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					style={{
						background: theme === "dark"
							? "linear-gradient(to right, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.2))"
							: "linear-gradient(to right, rgba(16, 109, 32, 0.25), rgba(34, 139, 34, 0.2))",
					}}></div>

				{/* Enhanced glassmorphic background with royal green tint */}
				<div 
					className="absolute inset-1 rounded-full backdrop-blur-lg border shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
					style={{
						background: theme === "dark" ? "rgba(15, 25, 15, 0.8)" : "rgba(240, 255, 245, 0.85)",
						borderColor: theme === "dark" ? "rgba(46, 204, 113, 0.4)" : "rgba(16, 109, 32, 0.3)",
						boxShadow: theme === "dark"
							? "0 8px 32px rgba(46, 204, 113, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
							: "0 8px 32px rgba(16, 109, 32, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
					}}></div>

				{/* Inner highlight with royal green accent */}
				<div
					className="absolute inset-2 rounded-full opacity-60"
					style={{
						background: theme === "dark"
							? "linear-gradient(to bottom, rgba(46, 204, 113, 0.15) 0%, transparent 100%)"
							: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(16, 109, 32, 0.05) 100%)",
					}}></div>

				{/* Icon with smooth transition and royal green styling */}
				<div 
					className="relative z-10 transition-all duration-300 group-hover:scale-110"
					style={{
						color: theme === "dark" ? "rgba(144, 238, 144, 0.95)" : "rgba(16, 109, 32, 0.9)",
						filter: theme === "dark"
							? "drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 4px rgba(16, 109, 32, 0.2))",
					}}>
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
