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
					? "linear-gradient(to right, rgba(34,102,68,0.85), rgba(22,78,51,0.9))"
					: "linear-gradient(to right, rgba(240,255,245,0.8), rgba(220,252,231,0.85))",
				boxShadow: `0 4px 20px ${isDark ? "rgba(34,102,68,0.25)" : "rgba(16,109,32,0.1)"}`,
				borderBottom: `1px solid ${isDark ? "rgba(46,204,113,0.2)" : "rgba(52,168,83,0.3)"}`,
			}}>
			{/* Enhanced inner glow with green highlights */}
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(135deg, ${isDark ? "rgba(46,204,113,0.08)" : "rgba(52,168,83,0.15)"}, transparent)`,
					mixBlendMode: "overlay",
				}}></div>

			{/* Green accent overlay */}
			<div
				className="absolute inset-0"
				style={{
					background: isDark
						? "linear-gradient(to right, rgba(34,102,68,0.1), rgba(46,204,113,0.05))"
						: "linear-gradient(to right, rgba(52,168,83,0.12), rgba(72,187,120,0.08))",
				}}></div>

			<div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair-display)" }}>
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
