"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export function UserNav(): React.JSX.Element {
	const { theme } = useTheme();
	const session = useSession();
	const router = useRouter();
	const [disabled, setDisabled] = React.useState(false);

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
	const userId = user?._id ?? "";
	const username = user?.username ?? "";
	const userEmail = user?.email ?? "";

	let content;

	if (isLoading) {
		content = (
			<div className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-500 ease-out cursor-wait">
				{/* Glassmorphic background for loading state */}
				<div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
				<div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-lg border border-white/20"></div>
				<span className="relative z-10" style={{ fontFamily: "var(--font-playfair-display)" }}>
					Loading...
				</span>
			</div>
		);
	} else if (!user) {
		content = (
			<Link href="/login">
				<div className="group relative inline-flex items-center justify-center px-8 py-4 font-medium transition-all duration-500 ease-out hover:scale-105 active:scale-95 cursor-pointer">
					{/* Outer border ring with royal green */}
					<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

					{/* Royal Green glow effect */}
					<div
						className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style={{
							background:
								theme === "dark"
<<<<<<< HEAD
									? "linear-gradient(to right, rgba(46, 204, 113, 0.2), rgba(34, 197, 94, 0.2))"
									: "linear-gradient(to right, rgba(16, 109, 32, 0.2), rgba(34, 139, 34, 0.2))",
=======
									? "linear-gradient(to right, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.2))"
									: "linear-gradient(to right, rgba(16, 109, 32, 0.25), rgba(34, 139, 34, 0.2))",
>>>>>>> bd0f9c6d599f84e5442ecf5adf12674c01a5c38a
						}}></div>

					{/* Enhanced glassmorphic background with royal green tint */}
					<div
						className="absolute inset-1 rounded-full backdrop-blur-lg border shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
						style={{
							background: theme === "dark" ? "rgba(15, 25, 15, 0.8)" : "rgba(240, 255, 245, 0.85)",
							borderColor: theme === "dark" ? "rgba(46, 204, 113, 0.4)" : "rgba(16, 109, 32, 0.3)",
							boxShadow:
								theme === "dark"
									? "0 8px 32px rgba(46, 204, 113, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
									: "0 8px 32px rgba(16, 109, 32, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
						}}></div>

					{/* Inner highlight with royal green accent */}
					<div
						className="absolute inset-2 rounded-full opacity-60"
						style={{
							background:
								theme === "dark"
									? "linear-gradient(to bottom, rgba(46, 204, 113, 0.15) 0%, transparent 100%)"
									: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(16, 109, 32, 0.05) 100%)",
						}}></div>

					{/* Button text with enhanced styling */}
					<span
						className="relative z-10 tracking-wider font-medium"
						style={{
							fontFamily: "var(--font-playfair-display)",
							color: theme === "dark" ? "rgba(144, 238, 144, 0.95)" : "rgba(16, 109, 32, 0.9)",
							textShadow:
								theme === "dark"
									? "0 2px 8px rgba(46, 204, 113, 0.3)"
									: "0 2px 8px rgba(16, 109, 32, 0.2)",
						}}>
						Login
					</span>

					{/* Animated arrow with royal green styling */}
					<svg
						className="relative z-10 ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						style={{
							color: theme === "dark" ? "rgba(144, 238, 144, 0.95)" : "rgba(16, 109, 32, 0.9)",
							filter:
								theme === "dark"
									? "drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))"
									: "drop-shadow(0 0 4px rgba(16, 109, 32, 0.2))",
						}}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>

					{/* Ripple effect on click */}
					<div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 group-active:animate-ping bg-white/30 pointer-events-none"></div>
				</div>
			</Link>
		);
	} else {
		content = (
			<div className="">
				<DropdownMenu>
					<TooltipProvider disableHoverableContent>
						<Tooltip delayDuration={100}>
							<TooltipTrigger asChild>
								<DropdownMenuTrigger asChild>
									<div className="group relative">
										<Button
											variant="outline"
											className="relative h-12 w-12 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 border-0 p-0 overflow-hidden">
											{/* Outer border ring */}
											<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

											{/* Glassmorphic background */}
											<div className="absolute inset-1 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40"></div>

											{/* Glow effect with royal green */}
											<div
												className="absolute inset-0 rounded-full transition-all duration-300 blur-lg"
												style={{
													background:
														theme === "dark"
															? "linear-gradient(to right, rgba(46, 204, 113, 0), rgba(34, 197, 94, 0)) group-hover:linear-gradient(to right, rgba(46, 204, 113, 0.2), rgba(34, 197, 94, 0.2))"
															: "linear-gradient(to right, rgba(16, 109, 32, 0), rgba(34, 139, 34, 0)) group-hover:linear-gradient(to right, rgba(16, 109, 32, 0.2), rgba(34, 139, 34, 0.2))",
												}}></div>

											{/* Avatar with enhanced styling - ONLY BEAM VARIANT */}
											<div className="h-10 w-10 relative z-10 transition-all duration-300 group-hover:scale-105 rounded-full overflow-hidden">
												<BoringAvatar
													name={username}
													variant="beam"
													size={40}
													colors={generateColorPalette(userId)}
												/>
											</div>
										</Button>
									</div>
								</DropdownMenuTrigger>
							</TooltipTrigger>
							<TooltipContent className="mr-6" side="bottom">
								<span style={{ fontFamily: "var(--font-playfair-display)" }}>Profile</span>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<DropdownMenuContent
						className="w-56 border-0 shadow-xl backdrop-blur-xl rounded-xl overflow-hidden z-[9999]"
						style={{
							background: theme === "dark" ? "rgba(0, 40, 25, 0.9)" : "rgba(255, 255, 255, 0.9)",
						}}
						align="end"
						forceMount>
						{/* Enhanced header with glassmorphic effect */}
						<DropdownMenuLabel
							className="font-normal p-4"
							style={{
								borderBottom:
									theme === "dark"
										? "1px solid rgba(46, 204, 113, 0.2)"
										: "1px solid rgba(16, 109, 32, 0.2)",
							}}>
							<div className="flex flex-col space-y-2">
								<p
									className="text-sm font-semibold leading-none transition-colors duration-200"
									style={{
										fontFamily: "var(--font-playfair-display)",
										color:
											theme === "dark" ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
									}}>
									{username}
								</p>
								<p
									className="text-xs leading-none font-mono"
									style={{
										color: theme === "dark" ? "rgba(200, 240, 200, 0.7)" : "rgba(16, 109, 32, 0.7)",
									}}>
									{userEmail}
								</p>
							</div>
						</DropdownMenuLabel>

						<div className="p-1">
							<DropdownMenuGroup>
								<DropdownMenuItem
									className="hover:cursor-pointer transition-all duration-200 rounded-lg m-1 group"
									style={{
										backgroundColor: "transparent",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											theme === "dark" ? "rgba(46, 204, 113, 0.1)" : "rgba(16, 109, 32, 0.1)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "transparent";
									}}
									asChild>
									<Link href="/dashboard" className="flex items-center p-2">
										<LayoutGrid
											className="mr-3 h-4 w-4 transition-all duration-200 group-hover:scale-110"
											style={{
												color:
													theme === "dark"
														? "rgba(46, 204, 113, 0.8)"
														: "rgba(16, 109, 32, 0.8)",
											}}
										/>
										<span
											className="font-medium transition-colors duration-200"
											style={{
												fontFamily: "var(--font-playfair-display)",
												color:
													theme === "dark"
														? "rgba(200, 240, 200, 0.9)"
														: "rgba(16, 109, 32, 0.9)",
											}}>
											Dashboard
										</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<div
								className="my-1 h-px"
								style={{
									background:
										theme === "dark"
											? "linear-gradient(to right, transparent, rgba(46, 204, 113, 0.3), transparent)"
											: "linear-gradient(to right, transparent, rgba(16, 109, 32, 0.3), transparent)",
								}}></div>

							<DropdownMenuItem
								className="hover:cursor-pointer disabled:cursor-not-allowed transition-all duration-200 rounded-lg m-1 group"
								style={{
									backgroundColor: "transparent",
								}}
								onMouseEnter={(e) => {
									if (!disabled) {
										e.currentTarget.style.backgroundColor =
											theme === "dark" ? "rgba(220, 38, 38, 0.1)" : "rgba(239, 68, 68, 0.1)";
									}
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = "transparent";
								}}
								onClick={signOut}
								disabled={disabled}>
								<LogOut
									className="mr-3 h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12"
									style={{
										color: theme === "dark" ? "rgba(220, 38, 38, 0.8)" : "rgba(239, 68, 68, 0.8)",
									}}
								/>
								<span
									className="font-medium transition-colors duration-200"
									style={{
										fontFamily: "var(--font-playfair-display)",
										color: theme === "dark" ? "rgba(200, 240, 200, 0.9)" : "rgba(16, 109, 32, 0.9)",
									}}>
									{disabled ? "Signing out..." : "Sign out"}
								</span>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return <div className="flex items-center space-x-3 md:order-2">{content}</div>;
}
