"use client";

import { useTheme } from "next-themes";
import React from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { Button } from "../ui/button";

export default function ThemeToggleButton(): React.JSX.Element {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	return (
		<Button
			aria-label="Toggle Dark Mode"
			type="button"
			className="flex h-[38px] w-[38px] items-center rounded-lg p-0 md:justify-center transition-all duration-300 hover:scale-110 group"
			style={{
				background: isDark
					? "linear-gradient(135deg, rgba(15, 25, 15, 0.8), rgba(10, 26, 15, 0.9))"
					: "linear-gradient(135deg, rgba(240, 255, 245, 0.8), rgba(220, 252, 231, 0.9))",
				border: isDark ? "1px solid rgba(46, 204, 113, 0.3)" : "1px solid rgba(16, 109, 32, 0.25)",
				backdropFilter: "blur(8px)",
				boxShadow: isDark
					? "0 4px 12px rgba(46, 204, 113, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
					: "0 4px 12px rgba(16, 109, 32, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
			}}
			onClick={(): void => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
			{resolvedTheme === "dark" ? (
				<RiSunFill
					size={16}
					className="transition-all duration-300 group-hover:rotate-180"
					style={{
						color: "rgba(144, 238, 144, 0.95)",
						filter: "drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))",
					}}
				/>
			) : (
				<RiMoonClearFill
					size={16}
					className="transition-all duration-300 group-hover:-rotate-12"
					style={{
						color: "rgba(16, 109, 32, 0.9)",
						filter: "drop-shadow(0 0 4px rgba(16, 109, 32, 0.2))",
					}}
				/>
			)}
		</Button>
	);
}
