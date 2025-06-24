"use client";

import { useTheme } from "@/components/ThemeProvider";

import { Navbar } from "./navbar";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	return (
		<div className="h-screen overflow-hidden">
			<Navbar title={title} />
			<div 
				className="h-[calc(100vh-64px)] overflow-auto overflow-x-hidden px-4 sm:px-8 relative"
				style={{
					background: isDark 
						? 'linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(23, 33, 52, 1))' 
						: 'linear-gradient(to bottom, rgba(245, 245, 252, 1), rgba(234, 234, 247, 1))'
				}}
			>
				{/* Subtle purple gradient overlay */}
				<div className="absolute inset-0 pointer-events-none" style={{
					background: isDark
						? 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(79, 70, 229, 0.02))'
						: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))'
				}}></div>
				
				<div className="relative">{children}</div>
			</div>
		</div>
	);
}
