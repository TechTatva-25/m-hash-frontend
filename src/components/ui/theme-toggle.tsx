"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className={
				`relative h-10 w-10 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 group ` +
				(isDark
					? "bg-[rgba(30,30,40,0.6)] border-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.9)] hover:bg-[rgba(103,80,164,0.15)] hover:text-[rgba(220,200,255,0.95)]"
					: "bg-[rgba(255,255,255,0.8)] border-[rgba(132,95,220,0.3)] text-[rgba(103,80,164,0.9)] hover:bg-[rgba(132,95,220,0.08)] hover:text-[rgba(103,80,164,0.95)]")
			}
			style={{
				backdropFilter: "blur(12px)",
				boxShadow: isDark
					? "0 4px 15px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
					: "0 4px 15px rgba(103,80,164,0.1), 0 0 0 1px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.8)",
				border: isDark ? "1px solid rgba(103,80,164,0.3)" : "1px solid rgba(132,95,220,0.3)",
			}}>
			{/* Hover glow effect */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
				style={{
					background: isDark
						? "radial-gradient(circle at center, rgba(149,128,255,0.15) 0%, transparent 70%)"
						: "radial-gradient(circle at center, rgba(149,128,255,0.08) 0%, transparent 70%)",
				}}></div>
			
			{/* Icon with smooth transition */}
			<div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
				{theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
			</div>
		</Button>
	);
}
