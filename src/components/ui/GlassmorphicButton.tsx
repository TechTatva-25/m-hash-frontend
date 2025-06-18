"use client";

import React from "react";
import Link from "next/link";

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
	// Size-based classes
	const sizeClasses = {
		sm: "px-6 py-3 text-sm",
		md: "px-8 py-4 text-base",
		lg: "px-10 py-5 text-lg",
	};

	// Common button content
	const buttonContent = (
		<>
			{/* Outer border ring for better definition */}
			<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

			{/* Glow effect */}
			<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

			{/* Enhanced glassmorphic background */}
			<div className="absolute inset-1 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-3xl"></div>

			{/* Inner highlight */}
			<div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>

			{/* Button content */}
			<span
				className="relative z-10 tracking-wider font-medium"
				style={{
					fontFamily: "var(--font-playfair-display)",
					textShadow: "0 2px 8px rgba(0,0,0,0.5)",
				}}>
				{text}
			</span>

			{/* Animated arrow - only shown if showArrow is true */}
			{showArrow && (
				<svg
					className="relative z-10 ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			)}
		</>
	);

	// Base classes for the button
	const baseClasses = `group relative inline-flex items-center justify-center ${sizeClasses[size]} font-medium text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 cursor-pointer ${disabled ? "opacity-70 pointer-events-none" : ""} ${className}`;

	// Render as a Link if href is provided
	if (href) {
		return (
			<Link href={href} className={baseClasses} aria-label={ariaLabel || text} tabIndex={disabled ? -1 : 0}>
				{buttonContent}
			</Link>
		);
	}

	// Otherwise, render as a button
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
