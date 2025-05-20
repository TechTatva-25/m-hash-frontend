"use client";

import React from "react";
import { useRecoilValue } from "recoil";

import { sidebarToggleState } from "@/atoms/sidebar-toggle";
import { cn } from "@/lib/utils";

import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }): React.JSX.Element | null {
	const sidebar = useRecoilValue(sidebarToggleState);
	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"flex min-h-[100vh] flex-col overflow-hidden transition-[margin-left] duration-300 ease-in-out",
					sidebar ? "lg:ml-72" : "lg:ml-[90px]"
				)}>
				{children}
			</main>
		</>
	);
}
