import { useTheme } from "@/components/ThemeProvider";

import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";

interface NavbarProps {
	title: string;
}

export function Navbar({ title }: NavbarProps): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	return (
		<header 
			className="sticky top-0 z-10 w-full backdrop-blur-xl transition-all duration-200"
			style={{
				background: isDark 
					? 'linear-gradient(to right, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9))'
					: 'linear-gradient(to right, rgba(245, 245, 252, 0.8), rgba(238, 238, 249, 0.85))',
				boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.05)'}`,
				borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.5)'}`
			}}
		>
			{/* Enhanced inner glow with subtle highlights */}
			<div className="absolute inset-0" style={{
				background: `linear-gradient(135deg, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.15)'}, transparent)`,
				mixBlendMode: "overlay"
			}}></div>
			
			{/* Subtle purple accent overlay */}
			<div className="absolute inset-0" style={{
				background: isDark
					? 'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))'
					: 'linear-gradient(to right, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))'
			}}></div>
			
			<div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<h1 
						className="text-xl font-bold" 
						style={{ fontFamily: "var(--font-playfair-display)" }}
					>
						{title}
					</h1>
				</div>
				<div className="flex items-center justify-end">
					<UserNav />
				</div>
			</div>
		</header>
	);
}
