"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="cursor-pointer">
			{theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
		</Button>
	);
}
