"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "@/components/ThemeProvider";

import { NavbarSheet } from "@/components/Home/NavbarSheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "../Home/user-nav";

export default function Navbar(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<nav className="fixed start-0 top-0 z-100 w-full">
			{/* Enhanced Glassmorphism Background with micro-animations */}
			<div
				className="absolute inset-0 backdrop-blur-xl border-b transition-all duration-500"
				style={{
					background: isDark
						? "linear-gradient(to right, rgba(34,102,68,0.2), rgba(52,168,83,0.15), rgba(34,102,68,0.2))"
						: "linear-gradient(to right, rgba(72,187,120,0.2), rgba(134,239,172,0.15), rgba(72,187,120,0.2))",
					borderBottomColor: isDark ? "rgba(34,102,68,0.2)" : "rgba(52,168,83,0.2)",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.borderBottomColor = isDark ? "rgba(34,102,68,0.3)" : "rgba(52,168,83,0.3)";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.borderBottomColor = isDark ? "rgba(34,102,68,0.2)" : "rgba(52,168,83,0.2)";
				}}
			/>

			<div className="relative mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between px-8 py-2">
				<div className="flex flex-wrap items-center justify-between xs:pl-4 lg:max-w-screen-xl">
					{/* Enhanced logo with micro-interaction */}
					<a href="/" className="flex items-center group">
						<div className="relative overflow-hidden rounded-xl">
							<Image
								unoptimized
								className="w-14 xs:w-16 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
								src="/M-Hash-Logo.png"
								alt="Manipal Hackathon Logo"
								width={74}
								height={74}
							/>
							{/* Subtle glow effect on hover */}
							<div
								className="absolute inset-0 transition-all duration-300 rounded-xl opacity-0 group-hover:opacity-100"
								style={{
									background: isDark
										? "linear-gradient(to right, rgba(34,102,68,0.2), rgba(72,187,120,0.2))"
										: "linear-gradient(to right, rgba(52,168,83,0.2), rgba(134,239,172,0.2))",
								}}></div>
						</div>
					</a>

					{/* Enhanced MIT logo with micro-interaction */}
					<a
						href="https://manipal.edu/mit.html"
						target="_blank"
						className="ml-2 mr-1 hidden items-center sm:flex md:ml-4 md:mr-2 group">
						<div className="relative overflow-hidden rounded-lg">
							<Image
								unoptimized
								className="w-full sm:w-72 md:w-80 transition-all duration-300 group-hover:scale-105"
								src="/logo_mit.jpeg"
								alt="MIT Logo"
								width={64}
								height={64}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg"></div>
						</div>
					</a>

					{/* Mobile MIT logo with micro-interaction */}
					<a
						href="https://manipal.edu/mit.html"
						target="_blank"
						className="ml-2 mr-1 items-center xs:ml-4 xs:mr-2 sm:hidden group">
						<div className="relative overflow-hidden rounded-lg">
							<Image
								unoptimized
								className="w-8 xs:w-12 transition-all duration-300 group-hover:scale-110"
								src="/logo_mit_2.png"
								alt="MIT Logo"
								width={64}
								height={64}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg"></div>
						</div>
					</a>

					{/* Enhanced IIC logo with micro-interaction */}
					<a href="https://iic.mic.gov.in/" target="_blank" rel="noopener noreferrer" className="group">
						<div className="relative overflow-hidden rounded-lg">
							<Image
								unoptimized
								className="w-20 xs:w-32 sm:w-24 md:w-32 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1"
								src="/logo_iic.png"
								alt="IIC Logo"
								width={64}
								height={64}
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-red-400/0 transition-all duration-300 group-hover:from-orange-400/15 group-hover:to-red-400/15 rounded-lg"></div>
						</div>
					</a>

					{/* Enhanced Viksit Bharat logo with micro-interaction */}
					<div className="group">
						<div className="relative overflow-hidden rounded-lg">
							<Image
								unoptimized
								className="w-20 xs:w-24 sm:w-20 md:w-24 lg:mr-2 transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
								src="/logo_viskit_bharath.png"
								alt="Viksit Bharat Logo"
								width={64}
								height={64}
							/>
							<div
								className="absolute inset-0 transition-all duration-300 rounded-lg opacity-0 group-hover:opacity-100"
								style={{
									background: isDark
										? "linear-gradient(to top right, rgba(34,102,68,0.15), rgba(72,187,120,0.15))"
										: "linear-gradient(to top right, rgba(52,168,83,0.15), rgba(134,239,172,0.15))",
								}}></div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between xl:hidden">
					<NavbarSheet />
				</div>

				<div className="hidden items-center space-x-3 xl:order-2 xl:flex xl:gap-3 xl:space-x-0 rtl:space-x-reverse">
					<div className="flex items-center gap-4">
						<UserNav />
						<div className="group">
							<div className="p-2 rounded-full transition-all duration-300 group-hover:bg-white/10 group-hover:backdrop-blur-lg">
								<ThemeToggle />
							</div>
						</div>
					</div>
				</div>

				<div
					className="hidden w-full items-center justify-between xl:order-1 xl:flex xl:w-auto"
					id="navbar-sticky">
					<ul className="mt-4 flex flex-col rounded-lg border border-[hsl(var(--border))] p-4 font-medium md:mt-0 md:flex-row md:space-x-6 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse">
						{/* Enhanced nav links with clean green underline animation */}
						<li>
							<a
								href="/#about"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] md:p-0 md:hover:bg-transparent transition-all duration-300"
								style={{
									color: isDark ? "rgba(240,255,240,0.9)" : "rgba(34,102,68,0.9)",
								}}
								aria-current="page">
								{/* Text with enhanced styling */}
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105"
									style={{
										fontFamily: "var(--font-playfair-display)",
										letterSpacing: "0.16em",
										color: isDark ? "rgba(240,255,240,1)" : "rgba(34,102,68,1)",
									}}>
									About
								</span>

								{/* Clean green underline animation */}
								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{
										background: isDark ? "rgba(72,187,120,0.8)" : "rgba(34,102,68,0.8)",
									}}></div>
							</a>
						</li>

						<li>
							<a
								href="/#timeline"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] md:p-0 md:hover:bg-transparent transition-all duration-300"
								style={{
									color: isDark ? "rgba(240,255,240,0.9)" : "rgba(34,102,68,0.9)",
								}}
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105"
									style={{
										fontFamily: "var(--font-playfair-display)",
										letterSpacing: "0.16em",
										color: isDark ? "rgba(240,255,240,1)" : "rgba(34,102,68,1)",
									}}>
									Timeline
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{
										background: isDark ? "rgba(72,187,120,0.8)" : "rgba(34,102,68,0.8)",
									}}></div>
							</a>
						</li>

						<li>
							<a
								href="/#problem-statements"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] md:p-0 md:hover:bg-transparent transition-all duration-300"
								style={{
									color: isDark ? "rgba(240,255,240,0.9)" : "rgba(34,102,68,0.9)",
								}}
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105"
									style={{
										fontFamily: "var(--font-playfair-display)",
										letterSpacing: "0.16em",
										color: isDark ? "rgba(240,255,240,1)" : "rgba(34,102,68,1)",
									}}>
									Problem Statements
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{
										background: isDark ? "rgba(72,187,120,0.8)" : "rgba(34,102,68,0.8)",
									}}></div>
							</a>
						</li>

						<li>
							<a
								href="/#contact-us"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] md:p-0 md:hover:bg-transparent transition-all duration-300"
								style={{
									color: isDark ? "rgba(240,255,240,0.9)" : "rgba(34,102,68,0.9)",
								}}
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105"
									style={{
										fontFamily: "var(--font-playfair-display)",
										letterSpacing: "0.16em",
										color: isDark ? "rgba(240,255,240,1)" : "rgba(34,102,68,1)",
									}}>
									Contact Us
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{
										background: isDark ? "rgba(72,187,120,0.8)" : "rgba(34,102,68,0.8)",
									}}></div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
