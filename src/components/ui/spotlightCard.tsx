import React, { useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Position {
	x: number;
	y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
	className?: string;
	spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
	children,
	className = "",
	spotlightColor,
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState<number>(0);
	const [isHovered, setIsHovered] = useState<boolean>(false);

	// Theme-aware spotlight color
	const defaultSpotlightColor = isDark 
		? "rgba(149, 128, 255, 0.15)" 
		: "rgba(149, 128, 255, 0.08)";
	const finalSpotlightColor = spotlightColor || defaultSpotlightColor;

	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!divRef.current || isFocused) return;

		const rect = divRef.current.getBoundingClientRect();
		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(0.8);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
		setOpacity(0.7);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer ${className}`}
			style={{
				background: isDark
					? "linear-gradient(135deg, rgba(30,30,45,0.7) 0%, rgba(35,35,60,0.5) 100%)"
					: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.7) 100%)",
				backdropFilter: "blur(16px)",
				boxShadow: isDark
					? `0 20px 40px -12px rgba(0,0,0,0.3), 
					   0 0 0 1px rgba(103,80,164,0.2),
					   inset 0 1px 0 0 rgba(255,255,255,0.05)`
					: `0 20px 40px -12px rgba(103,80,164,0.15), 
					   0 0 0 1px rgba(132,95,220,0.2),
					   inset 0 1px 0 0 rgba(255,255,255,0.8)`,
				borderRadius: "24px",
				border: isDark
					? "1px solid rgba(103,80,164,0.3)"
					: "1px solid rgba(132,95,220,0.25)",
			}}>
			
			{/* Enhanced animated border glow on hover */}
			<div
				className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
				style={{
					background: isDark
						? "linear-gradient(135deg, rgba(103,80,164,0.4) 0%, rgba(149,128,255,0.2) 50%, rgba(103,80,164,0.4) 100%)"
						: "linear-gradient(135deg, rgba(132,95,220,0.3) 0%, rgba(180,160,255,0.15) 50%, rgba(132,95,220,0.3) 100%)",
					mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
					maskComposite: "xor",
					padding: "1px",
					borderRadius: "24px",
				}}></div>

			{/* Enhanced Smooth Light Beam Effect */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out overflow-hidden rounded-3xl">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out blur-sm"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1800 ease-out delay-100"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-100/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1600 ease-out delay-200 blur-xs"></div>
			</div>

			{/* Enhanced inner glow with purple highlights */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-3xl"></div>
			<div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
			<div className="absolute inset-0 bg-gradient-to-br from-purple-300/5 via-transparent to-indigo-400/3 rounded-3xl"></div>

			{/* Spotlight effect */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out rounded-3xl"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${finalSpotlightColor}, transparent 70%)`,
				}}
			/>

			{/* Corner decorative elements */}
			<div className={`absolute top-4 right-4 w-2 h-2 rounded-full blur-sm transition-opacity duration-500 ${isHovered ? "opacity-70" : "opacity-30"}`}
				style={{ background: isDark ? "rgba(149,128,255,0.6)" : "rgba(132,95,220,0.4)" }}></div>
			<div className={`absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full blur-sm transition-opacity duration-500 ${isHovered ? "opacity-70" : "opacity-30"}`}
				style={{ background: isDark ? "rgba(149,128,255,0.6)" : "rgba(132,95,220,0.4)" }}></div>

			{/* Content container with padding */}
			<div className="relative z-10 p-8">
				{children}
			</div>
		</div>
	);
};

export default SpotlightCard;
