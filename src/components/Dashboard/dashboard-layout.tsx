"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

import { Sidebar } from "./sidebar";

// Temporary state solution until Recoil is fixed
export default function DashboardLayout({ children }: { children: React.ReactNode }): React.JSX.Element | null {
	// Replace Recoil with local state as a quick fix
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	// Handle sidebar toggle through a custom event
	useEffect(() => {
		const handleToggle = () => setSidebarOpen((prev) => !prev);
		window.addEventListener("toggle-sidebar", handleToggle);
		return () => window.removeEventListener("toggle-sidebar", handleToggle);
	}, []); // Dashboard-specific gradient colors
	const dashboardGradient = {
		lightFrom: "#f5f5fc", // Very light lavender
		lightVia: "#eeeef9", // Light lavender
		lightTo: "#e6e6f5", // Slightly deeper lavender
		darkFrom: "#2d3748", // Dark slate blue-gray
		darkVia: "#1e2a3b", // Darker blue-gray
		darkTo: "#171e29", // Very dark blue-gray
	};
	return (
		<div
			className="min-h-screen w-full transition-colors duration-500"
			style={{
				background: `linear-gradient(to bottom, 
					${isDark ? dashboardGradient.darkFrom : dashboardGradient.lightFrom}, 
					${isDark ? dashboardGradient.darkVia : dashboardGradient.lightVia}, 
					${isDark ? dashboardGradient.darkTo : dashboardGradient.lightTo})`,
				backgroundAttachment: "fixed",
				backgroundSize: "cover"
			}}>
			<Sidebar />
			<main
				className={cn(
					"flex min-h-[100vh] flex-col overflow-hidden transition-[margin-left] duration-300 ease-in-out",
					sidebarOpen ? "lg:ml-72" : "lg:ml-[90px]"
				)}>
				{children}
			</main>
		</div>
	);
}
