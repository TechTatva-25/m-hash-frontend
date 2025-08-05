"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export interface GlassmorphicButtonProps {
	text: string;
	href?: string;
	onClick?: () => void;
	showArrow?: boolean;
	className?: string;
	size?: "sm" | "md" | "lg";
	ariaLabel?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const GlassmorphicButton: React.FC<GlassmorphicButtonProps> = ({
	text,
	href,
	onClick,
	showArrow = true,
	className = "",
	size = "md",
	ariaLabel,
	disabled = false,
	type = "button",
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	// Size-based classes
	const sizeClasses = {
		sm: "px-6 py-3 text-sm",
		md: "px-8 py-4 text-base",
		lg: "px-10 py-5 text-lg",
	};

	// Common button content with royal green theming
	const buttonContent = (
		<>
			{/* Outer border ring with royal green */}
			<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

			{/* Royal Green glow effect */}
			<div
				className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background: isDark
						? "linear-gradient(to right, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.2))"
						: "linear-gradient(to right, rgba(16, 109, 32, 0.25), rgba(34, 139, 34, 0.2))",
				}}></div>

			{/* Enhanced glassmorphic background with royal green tint */}
			<div
				className="absolute inset-1 rounded-full backdrop-blur-lg border shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
				style={{
					background: isDark ? "rgba(15, 25, 15, 0.8)" : "rgba(240, 255, 245, 0.85)",
					borderColor: isDark ? "rgba(46, 204, 113, 0.4)" : "rgba(16, 109, 32, 0.3)",
					boxShadow: isDark
						? "0 8px 32px rgba(46, 204, 113, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
						: "0 8px 32px rgba(16, 109, 32, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
				}}></div>

			{/* Inner highlight with royal green accent */}
			<div
				className="absolute inset-2 rounded-full opacity-60"
				style={{
					background: isDark
						? "linear-gradient(to bottom, rgba(46, 204, 113, 0.15) 0%, transparent 100%)"
						: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(16, 109, 32, 0.05) 100%)",
				}}></div>

			{/* Button content */}
			<span
				className="relative z-10 tracking-wider font-medium"
				style={{
					fontFamily: "var(--font-playfair-display)",
					color: isDark ? "rgba(144, 238, 144, 0.95)" : "rgba(16, 109, 32, 0.9)",
					textShadow: isDark ? "0 2px 8px rgba(46, 204, 113, 0.3)" : "0 2px 8px rgba(16, 109, 32, 0.2)",
				}}>
				{text}
			</span>

			{/* Animated arrow with royal green styling */}
			{showArrow && (
				<svg
					className="relative z-10 ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					style={{
						color: isDark ? "rgba(144, 238, 144, 0.95)" : "rgba(16, 109, 32, 0.9)",
						filter: isDark
							? "drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 4px rgba(16, 109, 32, 0.2))",
					}}>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			)}
		</>
	);

	// Base classes for the button
	const baseClasses = `group relative inline-flex items-center justify-center ${sizeClasses[size]} font-medium transition-all duration-500 ease-out hover:scale-105 active:scale-95 cursor-pointer ${disabled ? "opacity-70 pointer-events-none" : ""} ${className}`;

	// Render as a Link if href is provided
	if (href) {
		return (
			<Link href={href} className={baseClasses} aria-label={ariaLabel || text} tabIndex={disabled ? -1 : 0}>
				{buttonContent}
			</Link>
		);
	}

	// Render as a button
	return (
		<button
			type={type}
			onClick={onClick}
			className={baseClasses}
			aria-label={ariaLabel || text}
			disabled={disabled}>
			{buttonContent}
		</button>
	);
};

export default GlassmorphicButton;
