"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useTheme } from "@/components/ThemeProvider";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export function NavbarSheet(): React.JSX.Element {
	const { theme, toggleTheme } = useTheme();
	const session = useSession();
	const router = useRouter();
	const [disabled, setDisabled] = React.useState(false);
	const isDark = theme === "dark";

	const signOut = async (): Promise<void> => {
		setDisabled(true);
		try {
			await axios.post(getEndpoint(Endpoints.LOGOUT), {}, { withCredentials: true });
			toast.success("Successfully signed out");
			router.push("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while signing out");
			}
		} finally {
			setDisabled(false);
		}
	};
	const isLoading = session?.loading ?? false;
	const user = session?.user ?? null;
	const username = user?.username ?? "";
	const userEmail = user?.email ?? "";
	let content;

	if (isLoading) {
		content = (
			<Button variant="outline" className="invisible w-full sm:visible md:w-auto" disabled>
				Loading...
			</Button>
		);
	} else if (!user) {
		content = (
			<Sheet>
				<SheetTrigger className="px-1 xs:px-4 md:px-8" asChild>
					<Button
						variant="outline"
						className="relative overflow-hidden transition-all duration-300"
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(0, 30, 20, 0.7) 0%, rgba(0, 40, 25, 0.5) 100%)"
								: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
							backdropFilter: "blur(16px)",
							boxShadow: isDark
								? `0 4px 15px rgba(0, 0, 0, 0.3), 
								   0 0 0 1px rgba(46, 204, 113, 0.2),
								   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
								: `0 4px 15px rgba(16, 109, 32, 0.15), 
								   0 0 0 1px rgba(16, 109, 32, 0.2),
								   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
							border: isDark
								? "1px solid rgba(46, 204, 113, 0.3)"
								: "1px solid rgba(16, 109, 32, 0.25)",
							color: isDark ? "rgba(200, 240, 200, 0.9)" : "rgba(16, 109, 32, 0.9)",
						}}>
						<svg
							className="h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</Button>
				</SheetTrigger>
				<SheetContent
					className="z-[200]"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(0, 25, 15, 0.85) 0%, rgba(0, 35, 20, 0.85) 100%)"
							: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 255, 250, 0.95) 100%)",
						backdropFilter: "blur(20px)",
						boxShadow: isDark
							? `0 20px 60px -10px rgba(0, 0, 0, 0.5), 
							   0 0 0 1px rgba(46, 204, 113, 0.3),
							   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
							: `0 20px 60px -10px rgba(16, 109, 32, 0.2), 
							   0 0 0 1px rgba(16, 109, 32, 0.2),
							   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
						border: isDark
							? "1px solid rgba(46, 204, 113, 0.4)"
							: "1px solid rgba(16, 109, 32, 0.3)",
						zIndex: 200,
					}}>
					<div className="grid gap-3 py-4">
						{[
							{ href: "/#", label: "Home" },
							{ href: "/#about", label: "About Us" },
							{ href: "/#timeline", label: "Timeline" },
							{ href: "/#problem-statements", label: "Problem Statements" },
						].map((link) => (
							<SheetClose key={link.href} asChild>
								<a
									href={link.href}
									className="block rounded-xl px-4 py-3 transition-all duration-300 backdrop-blur-sm border border-transparent"
									style={{
										color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)",
										backdropFilter: "blur(8px)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = isDark
											? "rgba(46, 204, 113, 0.2)"
											: "rgba(16, 109, 32, 0.15)";
										e.currentTarget.style.borderColor = isDark
											? "rgba(46, 204, 113, 0.4)"
											: "rgba(16, 109, 32, 0.3)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = "transparent";
										e.currentTarget.style.borderColor = "transparent";
									}}>
									{link.label}
								</a>
							</SheetClose>
						))}

						<div className="mt-4 space-y-3">
							<SheetClose asChild>
								<Button
									onClick={(): void => {
										window.location.href = "/login";
									}}
									className="w-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(46, 204, 113, 0.8) 0%, rgba(34, 197, 94, 0.9) 100%)"
											: "linear-gradient(135deg, rgba(16, 109, 32, 0.8) 0%, rgba(34, 139, 34, 0.9) 100%)",
										boxShadow: isDark
											? `0 4px 15px rgba(46, 204, 113, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
											: `0 4px 15px rgba(16, 109, 32, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
										border: isDark
											? "1px solid rgba(46, 204, 113, 0.4)"
											: "1px solid rgba(16, 109, 32, 0.4)",
									}}>
									Login
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button
									onClick={(): void => {
										window.location.href = "/register";
									}}
									variant="outline"
									className="w-full transition-all duration-300"
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(0, 30, 20, 0.7) 0%, rgba(0, 40, 25, 0.5) 100%)"
											: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
										backdropFilter: "blur(16px)",
										boxShadow: isDark
											? `0 4px 15px rgba(0, 0, 0, 0.3), 
											   0 0 0 1px rgba(46, 204, 113, 0.2),
											   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
											: `0 4px 15px rgba(16, 109, 32, 0.15), 
											   0 0 0 1px rgba(16, 109, 32, 0.2),
											   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
										border: isDark
											? "1px solid rgba(46, 204, 113, 0.3)"
											: "1px solid rgba(16, 109, 32, 0.25)",
										color: isDark ? "rgba(200, 240, 200, 0.9)" : "rgba(16, 109, 32, 0.9)",
									}}>
									Register
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button
									onClick={toggleTheme}
									variant="outline"
									className="w-full transition-all duration-300"
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(0, 30, 20, 0.7) 0%, rgba(0, 40, 25, 0.5) 100%)"
											: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
										backdropFilter: "blur(16px)",
										boxShadow: isDark
											? `0 4px 15px rgba(0, 0, 0, 0.3), 
											   0 0 0 1px rgba(46, 204, 113, 0.2),
											   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
											: `0 4px 15px rgba(16, 109, 32, 0.15), 
											   0 0 0 1px rgba(16, 109, 32, 0.2),
											   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
										border: isDark
											? "1px solid rgba(46, 204, 113, 0.3)"
											: "1px solid rgba(16, 109, 32, 0.25)",
										color: isDark ? "rgba(200, 240, 200, 0.9)" : "rgba(16, 109, 32, 0.9)",
									}}>
									{theme === "dark" ? (
										<RiSunFill className="mr-2" />
									) : (
										<RiMoonClearFill className="mr-2" />
									)}
									<span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
								</Button>
							</SheetClose>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		);
	} else {
		content = (
			<div className="">
				<DropdownMenu>
					<TooltipProvider disableHoverableContent>
						<Tooltip delayDuration={100}>
							<TooltipTrigger asChild>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="relative h-10 w-10 rounded-full transition-all duration-300 group"
										style={{
											background: isDark
												? "linear-gradient(135deg, rgba(0, 30, 20, 0.7) 0%, rgba(0, 40, 25, 0.5) 100%)"
												: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
											backdropFilter: "blur(16px)",
											boxShadow: isDark
												? `0 4px 15px rgba(0, 0, 0, 0.3), 
												   0 0 0 1px rgba(46, 204, 113, 0.2),
												   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
												: `0 4px 15px rgba(16, 109, 32, 0.15), 
												   0 0 0 1px rgba(16, 109, 32, 0.2),
												   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
											border: isDark
												? "1px solid rgba(46, 204, 113, 0.3)"
												: "1px solid rgba(16, 109, 32, 0.25)",
										}}>
										<Avatar className="h-10 w-10 transition-transform duration-300 group-hover:scale-105">
											<BoringAvatar
												name={username}
												variant="beam"
												size={40}
												colors={generateColorPalette(username)}
											/>
										</Avatar>
										{/* Subtle glow effect */}
										<div
											className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"
											style={{
												background: isDark
													? "linear-gradient(135deg, rgba(46, 204, 113, 0.4) 0%, rgba(34, 197, 94, 0.4) 100%)"
													: "linear-gradient(135deg, rgba(16, 109, 32, 0.4) 0%, rgba(34, 139, 34, 0.4) 100%)",
											}}></div>
									</Button>
								</DropdownMenuTrigger>
							</TooltipTrigger>
							<TooltipContent
								className="mr-6"
								side="bottom"
								style={{
									background: isDark
										? "linear-gradient(135deg, rgba(0, 25, 15, 0.9) 0%, rgba(0, 35, 20, 0.9) 100%)"
										: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 255, 250, 0.95) 100%)",
									backdropFilter: "blur(16px)",
									boxShadow: isDark
										? `0 8px 25px rgba(0, 0, 0, 0.4), 
										   0 0 0 1px rgba(46, 204, 113, 0.3),
										   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
										: `0 8px 25px rgba(16, 109, 32, 0.15), 
										   0 0 0 1px rgba(16, 109, 32, 0.2),
										   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
									border: isDark
										? "1px solid rgba(46, 204, 113, 0.4)"
										: "1px solid rgba(16, 109, 32, 0.3)",
									color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)",
								}}>
								Profile
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<DropdownMenuContent
						className="w-56"
						align="end"
						forceMount
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(0, 25, 15, 0.9) 0%, rgba(0, 35, 20, 0.9) 100%)"
								: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 255, 250, 0.95) 100%)",
							backdropFilter: "blur(20px)",
							boxShadow: isDark
								? `0 20px 60px -10px rgba(0, 0, 0, 0.5), 
								   0 0 0 1px rgba(46, 204, 113, 0.3),
								   inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
								: `0 20px 60px -10px rgba(16, 109, 32, 0.2), 
								   0 0 0 1px rgba(16, 109, 32, 0.2),
								   inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
							border: isDark
								? "1px solid rgba(46, 204, 113, 0.4)"
								: "1px solid rgba(16, 109, 32, 0.3)",
						}}>
						<DropdownMenuLabel className="font-normal p-4">
							<div className="flex flex-col space-y-1">
								<p
									className="text-sm font-medium leading-none"
									style={{
										color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
									}}>
									{username}
								</p>
								<p
									className="text-xs leading-none"
									style={{
										color: isDark ? "rgba(200, 240, 200, 0.7)" : "rgba(16, 109, 32, 0.7)",
									}}>
									{userEmail}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator
							style={{
								background: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.2)",
							}}
						/>
						<DropdownMenuGroup className="p-1">
							<DropdownMenuItem
								className="hover:cursor-pointer rounded-lg transition-all duration-200 backdrop-blur-sm"
								style={{
									color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = isDark
										? "rgba(46, 204, 113, 0.2)"
										: "rgba(16, 109, 32, 0.15)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent";
								}}
								asChild>
								<Link href="/dashboard" className="flex items-center p-3">
									<LayoutGrid
										className="mr-3 h-4 w-4 transition-all duration-200"
										style={{
											color: isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)",
										}}
									/>
									<span>Dashboard</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:cursor-pointer rounded-lg transition-all duration-200 backdrop-blur-sm p-3"
								style={{
									color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = isDark
										? "rgba(46, 204, 113, 0.2)"
										: "rgba(16, 109, 32, 0.15)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent";
								}}
								onClick={toggleTheme}>
								{theme === "dark" ? (
									<RiSunFill
										className="mr-3 h-4 w-4"
										style={{ color: "rgba(251, 191, 36, 1)" }}
									/>
								) : (
									<RiMoonClearFill
										className="mr-3 h-4 w-4"
										style={{ color: isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)" }}
									/>
								)}
								<span>
									{theme === "dark" ? "Light" : "Dark"} Mode
								</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator
							style={{
								background: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.2)",
							}}
						/>
						<DropdownMenuItem
							className="hover:cursor-pointer disabled:cursor-not-allowed rounded-lg transition-all duration-200 backdrop-blur-sm p-3"
							style={{
								color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "rgba(239,68,68,0.1)";
								e.currentTarget.style.color = isDark ? "rgba(239, 68, 68, 0.9)" : "rgba(220, 38, 38, 0.9)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.95)";
							}}
							onClick={signOut}
							disabled={disabled}>
							<LogOut
								className="mr-3 h-4 w-4 transition-all duration-200"
								style={{
									color: isDark ? "rgba(239, 68, 68, 0.9)" : "rgba(220, 38, 38, 0.9)",
								}}
							/>
							<span>Sign out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return <div className="flex items-center space-x-3 md:order-2">{content}</div>;
}
