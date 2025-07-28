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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export function UserNav(): React.JSX.Element {
	const session = useSession();
	const router = useRouter();
	const [disabled, setDisabled] = React.useState(false);
	const { theme } = useTheme();

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

	return (
		<div className="relative h-10 w-10">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 focus:scale-105 p-0 border-0 overflow-hidden"
						style={{
							background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)",
							border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 8px ${theme === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.03)"}`,
						}}>
						{/* ONLY BEAM VARIANT - No Avatar wrapper */}
						<div className="h-9 w-9 rounded-full overflow-hidden">
							<BoringAvatar
								name={session?.username ?? ""}
								variant="beam"
								size={36}
								colors={generateColorPalette(session?.userId ?? "")}
							/>
						</div>
						<span className="sr-only">Open user menu</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-56 overflow-hidden backdrop-blur-md border transition-all duration-300 z-[9999]"
					align="end"
					style={{
						background: theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
						borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(203, 213, 225, 0.5)",
						boxShadow: `0 4px 20px ${theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
						zIndex: 9999,
					}}>
					{/* Subtle purple accent overlay */}
					<div
						className="absolute inset-0"
						style={{
							background: theme === "dark"
								? "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
								: "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))",
						}}></div>

					<div className="relative">
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className={`text-sm font-medium leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
									{session?.username ?? ""}
								</p>
								<p className={`text-xs leading-none ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
									{session?.user?.email ?? ""}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className="hover:cursor-pointer my-1 transition-all duration-300 rounded-md group"
								style={{
									borderRadius: "6px",
									background: "transparent",
								}}
								asChild>
								<Link href="/dashboard" className="flex items-center">
									<LayoutGrid className={`mr-3 h-4 w-4 transition-colors duration-200 ${theme === "dark" ? "text-slate-400 group-hover:text-purple-400" : "text-slate-600 group-hover:text-purple-600"}`} />
									<span className={`transition-colors duration-200 ${theme === "dark" ? "text-slate-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}>
										Dashboard
									</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="hover:cursor-pointer my-1 disabled:cursor-not-allowed transition-all duration-300 rounded-md group"
							style={{
								borderRadius: "6px",
							}}
							onClick={signOut}
							disabled={disabled}>
							<LogOut className={`mr-3 h-4 w-4 transition-colors duration-200 ${theme === "dark" ? "text-slate-400 group-hover:text-red-400" : "text-slate-600 group-hover:text-red-600"}`} />
							<span className={`transition-colors duration-200 ${theme === "dark" ? "text-slate-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}>
								{disabled ? "Signing out..." : "Sign out"}
							</span>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
