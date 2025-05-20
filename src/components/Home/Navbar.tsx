"use client";
import Image from "next/image";
import React from "react";

import { NavbarSheet } from "@/components/Home/NavbarSheet";

import { UserNav } from "../Home/user-nav";

export default function Navbar(): React.JSX.Element {
	return (
		<nav className="fixed start-0 top-0 z-20 w-full bg-[hsl(var(--background))]/75 backdrop-blur-md">
			<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2">
				<div className="flex flex-wrap items-center justify-between xs:pl-4 lg:max-w-screen-xl">
					<a href="/" className="flex items-center">
						<Image
							unoptimized
							className="w-12 xs:w-16"
							src="/M-Hash-Logo.png"
							alt="Manipal Hackathon Logo"
							width={64}
							height={64}
						/>
					</a>
					<a
						href="https://manipal.edu/mit.html"
						target="_blank"
						className="ml-2 mr-1 hidden items-center sm:flex md:ml-4 md:mr-2">
						<Image
							unoptimized
							className="w-full sm:w-72 md:w-80"
							src="/logo_mit.jpeg"
							alt="MIT Logo"
							width={64}
							height={64}
						/>
					</a>
					<a
						href="https://manipal.edu/mit.html"
						target="_blank"
						className="ml-2 mr-1 items-center xs:ml-4 xs:mr-2 sm:hidden">
						<Image
							unoptimized
							className="w-8 xs:w-12"
							src="/logo_mit_2.png"
							alt="MIT Logo"
							width={64}
							height={64}
						/>
					</a>
					<a href="https://iic.mic.gov.in/" target="_blank" rel="noopener noreferrer">
						<Image
							unoptimized
							className="w-20 xs:w-32 sm:w-24 md:w-32"
							src="/logo_iic.png"
							alt="IIC Logo"
							width={64}
							height={64}
						/>
					</a>
					<Image
						unoptimized
						className="w-20 xs:w-24 sm:w-20 md:w-24 lg:mr-2"
						src="/logo_viskit_bharath.png"
						alt="Viksit Bharat Logo"
						width={64}
						height={64}
					/>
				</div>
				<div className="flex items-center justify-between xl:hidden">
					<NavbarSheet />
				</div>
				<div className="hidden items-center space-x-3 xl:order-2 xl:flex xl:gap-3 xl:space-x-0 rtl:space-x-reverse">
					<UserNav />
				</div>
				<div
					className="hidden w-full items-center justify-between xl:order-1 xl:flex xl:w-auto"
					id="navbar-sticky">
					<ul className="mt-4 flex flex-col rounded-lg border border-[hsl(var(--border))] p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse">
						{/* <li>
                            <a
                                href="#"
                                className="block rounded bg-[hsl(var(--card))] px-3 py-2 text-[hsl(var(--foreground))] dark:text-[hsl(var(--primary-foreground))] md:bg-transparent md:p-0 md:text-[hsl(var(--primary))]"
                                aria-current="page">
                                Home
                            </a>
                        </li> */}
						<li>
							<a
								href="/#about"
								className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))]"
								aria-current="page">
								About
							</a>
						</li>
						<li>
							<a
								href="/#timeline"
								className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))]"
								aria-current="page">
								Timeline
							</a>
						</li>
						<li>
							<a
								href="/#problem-statements"
								className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))]"
								aria-current="page">
								Problem Statements
							</a>
						</li>
						<li>
							<a
								href="/#contact-us"
								className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))]"
								aria-current="page">
								Contact Us
							</a>
						</li>
						{/* <li>
                            <a
                                href="/leaderboard"
                                className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))] md:p-0 md:hover:bg-transparent md:hover:text-[hsl(var(--primary))]"
                                aria-current="page">
                                Leaderboard
                            </a>
                        </li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
}
