"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Sidebar } from "./sidebar";

// Temporary state solution until Recoil is fixed
export default function DashboardLayout({ children }: { children: React.ReactNode }): React.JSX.Element | null {
	// Replace Recoil with local state as a quick fix
	const [sidebarOpen, setSidebarOpen] = useState(true);

	// Handle sidebar toggle through a custom event
	useEffect(() => {
		const handleToggle = () => setSidebarOpen(prev => !prev);
		window.addEventListener('toggle-sidebar', handleToggle);
		return () => window.removeEventListener('toggle-sidebar', handleToggle);
	}, []);

	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"flex min-h-[100vh] flex-col overflow-hidden transition-[margin-left] duration-300 ease-in-out",
					sidebarOpen ? "lg:ml-72" : "lg:ml-[90px]"
				)}>
				{children}
			</main>
		</>
	);
}
