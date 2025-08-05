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
	}, []); // Dashboard-specific gradient colors - Royal Green Theme
	const dashboardGradient = {
		lightFrom: "#f0fdf4", // Very light green
		lightVia: "#dcfce7", // Light green
		lightTo: "#bbf7d0", // Slightly deeper green
		darkFrom: "#021204", // Very dark green #021204
		darkVia: "#003221", // Royal dark green #003221
		darkTo: "#052e16", // Deep dark green
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
				backgroundSize: "cover",
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
