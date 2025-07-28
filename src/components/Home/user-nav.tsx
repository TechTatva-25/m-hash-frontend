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
				<div className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 cursor-pointer">
					{/* Outer border ring for better definition */}
					<div className="absolute inset-0 rounded-full border-2 border-white/40 transition-all duration-300 group-hover:border-white/60"></div>

					{/* Glow effect */}
					<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

					{/* Enhanced glassmorphic background */}
					<div className="absolute inset-1 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-3xl"></div>

					{/* Inner highlight */}
					<div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>

					{/* Button text with enhanced styling */}
					<span
						className="relative z-10 tracking-wider font-medium transition-all duration-300 group-hover:scale-105"
						style={{
							fontFamily: "var(--font-playfair-display)",
							textShadow: "0 2px 8px rgba(0,0,0,0.5)",
						}}>
						Login
					</span>

					{/* Animated arrow with micro-interaction */}
					<svg
						className="relative z-10 ml-3 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
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

											{/* Glow effect */}
											<div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/0 to-blue-400/0 transition-all duration-300 group-hover:from-purple-400/20 group-hover:to-blue-400/20 blur-lg"></div>

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
						className="w-56 border-0 shadow-xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-xl overflow-hidden z-[9999]"
						align="end"
						forceMount>
						{/* Enhanced header with glassmorphic effect */}
						<DropdownMenuLabel className="font-normal p-4 border-b border-white/20 dark:border-slate-700/50">
							<div className="flex flex-col space-y-2">
								<p
									className={`text-sm font-semibold leading-none transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
									style={{ fontFamily: "var(--font-playfair-display)" }}>
									{username}
								</p>
								<p
									className={`text-xs leading-none font-mono ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
									{userEmail}
								</p>
							</div>
						</DropdownMenuLabel>

						<div className="p-1">
							<DropdownMenuGroup>
								<DropdownMenuItem
									className="hover:cursor-pointer transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg m-1 group"
									asChild>
									<Link href="/dashboard" className="flex items-center p-2">
										<LayoutGrid className="mr-3 h-4 w-4 text-purple-600 dark:text-purple-400 transition-all duration-200 group-hover:scale-110" />
										<span
											className={`font-medium transition-colors duration-200 ${theme === "dark" ? "text-slate-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}
											style={{ fontFamily: "var(--font-playfair-display)" }}>
											Dashboard
										</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<div className="my-1 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-600 to-transparent"></div>

							<DropdownMenuItem
								className="hover:cursor-pointer disabled:cursor-not-allowed transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg m-1 group"
								onClick={signOut}
								disabled={disabled}>
								<LogOut className="mr-3 h-4 w-4 text-red-600 dark:text-red-400 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
								<span
									className={`font-medium transition-colors duration-200 ${theme === "dark" ? "text-slate-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}
									style={{ fontFamily: "var(--font-playfair-display)" }}>
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
