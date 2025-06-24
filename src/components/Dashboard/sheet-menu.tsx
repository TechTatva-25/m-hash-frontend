import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Menu } from "./menu";

export function SheetMenu(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button
					className="h-8 transition-all duration-300 backdrop-blur-md"
					style={{
						background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)",
						border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
						boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
					}}
					size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent
				className="flex h-full flex-col px-3 backdrop-blur-xl"
				style={{
					background: isDark
						? "linear-gradient(to bottom, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9))"
						: "linear-gradient(to bottom, rgba(245, 245, 252, 0.8), rgba(238, 238, 249, 0.85))",
					borderRight: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.7)"}`,
					boxShadow: `0 4px 20px ${isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.08)"}`,
				}}
				side="left">
				{/* Subtle background gradient effect */}
				<div
					className="absolute inset-0 -z-10"
					style={{
						background: isDark
							? "linear-gradient(to bottom, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
							: "linear-gradient(to bottom, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))",
					}}></div>

				{/* Enhanced inner glow with subtle highlights */}
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(135deg, ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.15)"}, transparent)`,
						mixBlendMode: "overlay",
					}}></div>

				<SheetHeader>
					<Button
						className="flex items-center justify-center pb-2 pt-1 transition-all duration-300"
						style={{
							background: "transparent",
							border: "none",
						}}
						variant="link"
						asChild>
						<Link href="/dashboard" className="flex items-center gap-2">
							<div className="relative">
								<Image
									src="/M-Hash-Logo.png"
									alt="Manipal Hackathon Logo"
									width={60}
									height={60}
									className="relative z-10"
								/>
								<div
									className="absolute inset-0 blur-sm opacity-50"
									style={{
										background: isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.15)",
									}}></div>
							</div>
							<h1
								className="text-lg font-bold"
								style={{
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? "white" : "#1e293b",
								}}>
								Hackathon 2024
							</h1>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
