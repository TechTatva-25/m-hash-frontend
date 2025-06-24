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
				"fixed left-0 top-0 z-20 h-screen -translate-x-full backdrop-blur transition-[width] duration-300 ease-in-out supports-[backdrop-filter]:bg-secondary/25 lg:translate-x-0",
				sidebarOpen ? "w-72" : "w-[90px]"
			)}>
			<SidebarToggle />
			<div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:border-r dark:border-secondary/75">
				<div className="flex justify-between items-center mb-1">
					<Button
						className={cn(
							"transition-transform duration-300 ease-in-out",
							sidebarOpen ? "translate-x-0" : "translate-x-1"
						)}
						variant="link"
						asChild>
						<Link href="/dashboard" className="flex items-center gap-2">
							<Image src="/M-Hash-Logo.png" alt="Manipal Hackathon Logo" width={30} height={30} />
							<h1
								className={cn(
									"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
									sidebarOpen
										? "translate-x-0 opacity-100 dark:text-white"
										: "hidden -translate-x-96 opacity-0 dark:text-white"
								)}>
								Hackathon 2024
							</h1>
						</Link>
					</Button>
					{/* Theme toggle button */}
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className={cn(
							"rounded-full",
							!sidebarOpen && "absolute right-3 top-4"
						)}>
						{theme === "dark" ? (
							<RiSunFill className="h-5 w-5" />
						) : (
							<RiMoonClearFill className="h-5 w-5" />
						)}
					</Button>
				</div>
				<Menu isOpen={sidebarOpen} />
			</div>
		</aside>
	);
}
