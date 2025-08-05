"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar(): React.JSX.Element {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const { theme, toggleTheme } = useTheme();

	// Listen for sidebar toggle events
	useEffect(() => {
		const handleToggle = () => setSidebarOpen((prev) => !prev);
		window.addEventListener("toggle-sidebar", handleToggle);
		return () => window.removeEventListener("toggle-sidebar", handleToggle);
	}, []);
	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out backdrop-blur-xl lg:translate-x-0",
				sidebarOpen ? "w-72" : "w-[90px]"
			)}
			style={{
				background:
					theme === "dark"
						? "linear-gradient(to bottom, rgba(15,25,15,0.85), rgba(10,26,15,0.9))"
						: "linear-gradient(to bottom, rgba(240,255,245,0.8), rgba(220,252,231,0.85))",
				borderRight: `1px solid ${theme === "dark" ? "rgba(46,204,113,0.2)" : "rgba(52,168,83,0.3)"}`,
				boxShadow: `0 4px 20px ${theme === "dark" ? "rgba(34,102,68,0.3)" : "rgba(16,109,32,0.1)"}`,
			}}>
			{" "}
			<SidebarToggle />
			<div className="relative flex h-full flex-col overflow-hidden px-3 py-4 scrollbar-hide">
				{/* Subtle green gradient effect */}
				<div
					className="absolute inset-0 -z-10"
					style={{
						background:
							theme === "dark"
								? "linear-gradient(to bottom, rgba(34,102,68,0.1), rgba(22,78,51,0.05))"
								: "linear-gradient(to bottom, rgba(52,168,83,0.15), rgba(72,187,120,0.08))",
					}}></div>
				{/* Green accent edge */}
				<div
					className="absolute right-0 top-0 bottom-0 w-[1px]"
					style={{
						background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(46,204,113,0.4)" : "rgba(52,168,83,0.6)"}, transparent)`,
					}}></div>
				{/* Enhanced inner glow with green highlights */}
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(135deg, ${theme === "dark" ? "rgba(46,204,113,0.05)" : "rgba(52,168,83,0.12)"}, transparent)`,
						mixBlendMode: "overlay",
					}}></div>{" "}
				<div className="flex justify-between items-center mb-4 relative z-10">
					<Link
						href="/dashboard"
						className={cn(
							"flex items-center gap-2 px-3 py-2 rounded-md backdrop-blur-md transition-all duration-300",
							sidebarOpen ? "translate-x-0" : "justify-center"
						)}
						style={{
							background: theme === "dark" ? "rgba(34,102,68,0.15)" : "rgba(240,255,245,0.6)",
							border: `1px solid ${theme === "dark" ? "rgba(46,204,113,0.3)" : "rgba(52,168,83,0.4)"}`,
							boxShadow: `0 2px 8px ${theme === "dark" ? "rgba(34,102,68,0.2)" : "rgba(16,109,32,0.1)"}`,
						}}>
						<div className="relative">
							<Image
								src="/M-Hash-Logo.png"
								alt="Manipal Hackathon Logo"
								width={30}
								height={30}
								className="relative z-10"
							/>
							<div
								className="absolute inset-0 blur-sm opacity-50"
								style={{
									background: theme === "dark" ? "rgba(46,204,113,0.4)" : "rgba(52,168,83,0.3)",
								}}></div>
						</div>
						<h1
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								sidebarOpen ? "translate-x-0 opacity-100" : "hidden -translate-x-96 opacity-0"
							)}
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: theme === "dark" ? "rgba(144,238,144,0.95)" : "rgba(22,78,51,0.9)",
							}}>
							Hackathon 2025
						</h1>
					</Link>
					{/* Theme toggle button */}
					<button
						onClick={toggleTheme}
						className={cn(
							"flex h-[38px] w-[38px] items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 group",
							sidebarOpen ? "translate-x-0" : "hidden"
						)}
						style={{
							background:
								theme === "dark"
									? "linear-gradient(135deg, rgba(15,25,15,0.8), rgba(10,26,15,0.9))"
									: "linear-gradient(135deg, rgba(240,255,245,0.8), rgba(220,252,231,0.9))",
							border:
								theme === "dark" ? "1px solid rgba(46,204,113,0.3)" : "1px solid rgba(52,168,83,0.4)",
							backdropFilter: "blur(8px)",
							boxShadow:
								theme === "dark"
									? "0 4px 12px rgba(46,204,113,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
									: "0 4px 12px rgba(16,109,32,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
						}}>
						{theme === "dark" ? (
							<RiSunFill
								size={16}
								className="transition-all duration-300 group-hover:rotate-180"
								style={{
									color: "rgba(144,238,144,0.95)",
									filter: "drop-shadow(0 0 4px rgba(46,204,113,0.3))",
								}}
							/>
						) : (
							<RiMoonClearFill
								size={16}
								className="transition-all duration-300 group-hover:-rotate-12"
								style={{
									color: "rgba(22,78,51,0.9)",
									filter: "drop-shadow(0 0 4px rgba(16,109,32,0.2))",
								}}
							/>
						)}
					</button>
				</div>
				<div className="flex-1 overflow-auto">
					<Menu isOpen={sidebarOpen} />
				</div>
			</div>
		</aside>
	);
}
