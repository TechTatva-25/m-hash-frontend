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
					className="h-8 transition-all duration-300 backdrop-blur-md hover:scale-110"
					style={{
						background: isDark ? "rgba(34,102,68,0.15)" : "rgba(240,255,245,0.6)",
						border: `1px solid ${isDark ? "rgba(46,204,113,0.3)" : "rgba(52,168,83,0.4)"}`,
						boxShadow: `0 2px 8px ${isDark ? "rgba(34,102,68,0.2)" : "rgba(16,109,32,0.1)"}`,
					}}
					size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent
				className="flex h-full flex-col px-3 backdrop-blur-xl"
				style={{
					background: isDark
						? "linear-gradient(to bottom, rgba(15,25,15,0.85), rgba(10,26,15,0.9))"
						: "linear-gradient(to bottom, rgba(240,255,245,0.8), rgba(220,252,231,0.85))",
					borderRight: `1px solid ${isDark ? "rgba(46,204,113,0.2)" : "rgba(52,168,83,0.3)"}`,
					boxShadow: `0 4px 20px ${isDark ? "rgba(34,102,68,0.3)" : "rgba(16,109,32,0.1)"}`,
				}}
				side="left">
				{/* Subtle green gradient effect */}
				<div
					className="absolute inset-0 -z-10"
					style={{
						background: isDark
							? "linear-gradient(to bottom, rgba(34,102,68,0.1), rgba(22,78,51,0.05))"
							: "linear-gradient(to bottom, rgba(52,168,83,0.15), rgba(72,187,120,0.08))",
					}}></div>

				{/* Enhanced inner glow with green highlights */}
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(135deg, ${isDark ? "rgba(46,204,113,0.05)" : "rgba(52,168,83,0.12)"}, transparent)`,
						mixBlendMode: "overlay",
					}}></div>

				<SheetHeader className="flex flex-row items-center justify-center p-0">
					<Button
						className="flex h-fit w-fit items-center justify-center rounded-md p-0 transition-all duration-300 hover:scale-105"
						style={{
							background: isDark ? "rgba(34,102,68,0.15)" : "rgba(240,255,245,0.6)",
							border: `1px solid ${isDark ? "rgba(46,204,113,0.3)" : "rgba(52,168,83,0.4)"}`,
							boxShadow: `0 2px 8px ${isDark ? "rgba(34,102,68,0.2)" : "rgba(16,109,32,0.1)"}`,
						}}
						asChild>
						<Link href="/dashboard" className="flex items-center gap-2 px-3 py-2">
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
										background: isDark ? "rgba(46,204,113,0.4)" : "rgba(52,168,83,0.3)",
									}}></div>
							</div>
							<h1
								className="text-lg font-bold"
								style={{
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? "rgba(144,238,144,0.95)" : "rgba(22,78,51,0.9)",
								}}>
								Hackathon 2025
							</h1>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
