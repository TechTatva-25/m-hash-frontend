"use client";
import Image from "next/image";
import React from "react";

import { NavbarSheet } from "@/components/Home/NavbarSheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "../Home/user-nav";

export default function Navbar(): React.JSX.Element {
	return (
		<nav className="fixed start-0 top-0 z-100 w-full">
			{/* Enhanced Glassmorphism Background with micro-animations */}
			<div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-violet-800/15 to-purple-900/20 backdrop-blur-xl border-b border-purple-500/20 transition-all duration-500 hover:border-purple-500/30" />

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
							<div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-blue-400/0 transition-all duration-300 group-hover:from-purple-400/20 group-hover:to-blue-400/20 rounded-xl"></div>
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
							<div className="absolute inset-0 bg-gradient-to-tr from-green-400/0 to-blue-400/0 transition-all duration-300 group-hover:from-green-400/15 group-hover:to-blue-400/15 rounded-lg"></div>
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
						{/* Enhanced nav links with clean purple underline animation */}
						<li>
							<a
								href="/#about"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))] transition-all duration-300"
								aria-current="page">
								{/* Text with enhanced styling */}
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105 green-accent-hover"
									style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "0.16em" }}>
									About
								</span>

								{/* Clean purple underline animation */}
								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{ background: "rgb(103, 80, 164)" }}></div>
							</a>
						</li>

						<li>
							<a
								href="/#timeline"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))] transition-all duration-300"
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105 green-accent-hover"
									style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "0.16em" }}>
									Timeline
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{ background: "rgb(103, 80, 164)" }}></div>
							</a>
						</li>

						<li>
							<a
								href="/#problem-statements"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))] transition-all duration-300"
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105 green-accent-hover"
									style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "0.16em" }}>
									Problem Statements
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{ background: "rgb(103, 80, 164)" }}></div>
							</a>
						</li>

						<li>
							<a
								href="/#contact-us"
								className="group relative block rounded-xl px-4 py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))] transition-all duration-300"
								aria-current="page">
								<span
									className="relative font-bold transition-all duration-300 group-hover:scale-105 green-accent-hover"
									style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "0.16em" }}>
									Contact Us
								</span>

								<div
									className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full md:block hidden"
									style={{ background: "rgb(103, 80, 164)" }}></div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
