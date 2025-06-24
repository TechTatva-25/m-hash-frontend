"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
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
						? "linear-gradient(to bottom, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9))"
						: "linear-gradient(to bottom, rgba(245, 245, 252, 0.8), rgba(238, 238, 249, 0.85))",
				borderRight: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.7)"}`,
				boxShadow: `0 4px 20px ${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.08)"}`,
			}}>
			{" "}
			<SidebarToggle />
			<div className="relative flex h-full flex-col overflow-hidden px-3 py-4 scrollbar-hide">
				{/* Subtle background gradient effect */}
				<div
					className="absolute inset-0 -z-10"
					style={{
						background:
							theme === "dark"
								? "linear-gradient(to bottom, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
								: "linear-gradient(to bottom, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))",
					}}></div>
				{/* Accent edge */}
				<div
					className="absolute right-0 top-0 bottom-0 w-[1px]"
					style={{
						background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"}, transparent)`,
					}}></div>
				{/* Enhanced inner glow with subtle highlights */}
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(135deg, ${theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.15)"}, transparent)`,
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
							background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)",
							border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 8px ${theme === "dark" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
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
									background:
										theme === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.15)",
								}}></div>
						</div>
						<h1
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								sidebarOpen ? "translate-x-0 opacity-100" : "hidden -translate-x-96 opacity-0"
							)}
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: theme === "dark" ? "white" : "#1e293b",
							}}>
							Hackathon 2024
						</h1>
					</Link>
					{/* Theme toggle button */}
					<button
						onClick={toggleTheme}
						className={cn(
							"rounded-full p-2 transition-all duration-300 backdrop-blur-md hover:opacity-90 active:scale-95",
							sidebarOpen ? "" : "absolute right-1/2 transform translate-x-1/2 top-16"
						)}
						style={{
							background: theme === "dark" ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.2)",
							border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 8px ${theme === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(139, 92, 246, 0.1)"}`,
						}}>
						{theme === "dark" ? (
							<RiSunFill className="h-5 w-5 text-white" />
						) : (
							<RiMoonClearFill className="h-5 w-5 text-gray-800" />
						)}
					</button>
				</div>
				<div className={cn(sidebarOpen ? "" : "mt-16")}>
					<Menu isOpen={sidebarOpen} />
				</div>
			</div>
		</aside>
	);
}
