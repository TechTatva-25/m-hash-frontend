"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import { toast } from "react-toastify";

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export function UserNav(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
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
	// const userId = user?.userId ?? "";

	let content;

	if (isLoading) {
		content = (
			<Button variant="outline" className="invisible w-full sm:visible md:w-auto" disabled>
				Loading...
			</Button>
		);
	} else if (!user) {
		content = (
			<>
				<Link href="/login">
					<Button variant="outline" className="w-full md:w-auto cursor-pointer">
						Login
					</Button>
				</Link>
			</>
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
										className={
											`relative h-10 w-10 rounded-full cursor-pointer ` +
											(isDark
												? "bg-[rgba(30,30,40,0.5)] border-[rgba(103,80,164,0.3)]"
												: "bg-[rgba(255,255,255,0.7)] border-[rgba(132,95,220,0.3)]")
										}
										style={{
											backdropFilter: "blur(8px)",
											boxShadow: isDark
												? "0 2px 10px rgba(0,0,0,0.2)"
												: "0 2px 10px rgba(103,80,164,0.08)",
										}}>
										<Avatar className="h-10 w-10">
											<BoringAvatar
												name={username}
												variant="beam"
												size={40}
												colors={generateColorPalette(userId)}
											/>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
							</TooltipTrigger>
							<TooltipContent className="mr-6" side="bottom">
								Profile
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<DropdownMenuContent
						className={
							`w-56 border-0 shadow-lg ` +
							(isDark
								? "bg-[rgba(30,30,40,0.7)] backdrop-blur-md"
								: "bg-[rgba(255,255,255,0.95)] backdrop-blur-md")
						}
						align="end"
						forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p
									className={
										isDark
											? "text-[rgba(220,200,255,0.9)]"
											: "text-[rgba(103,80,164,0.9)]" + " text-sm font-medium leading-none"
									}>
									{username}
								</p>
								<p
									className={
										isDark
											? "text-[rgba(200,180,240,0.7)]"
											: "text-[rgba(103,80,164,0.7)]" + " text-xs leading-none"
									}>
									{userEmail}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className={`hover:cursor-pointer text-current ${
									isDark
										? "hover:bg-[rgba(103,80,164,0.15)] hover:text-[rgba(220,200,255,0.95)]"
										: "hover:bg-[rgba(132,95,220,0.08)] hover:text-[rgba(50,50,50,1)]"
								}`}
								asChild>
								<Link href="/dashboard" className="flex items-center">
									<LayoutGrid
										className={
											isDark
												? "mr-3 h-4 w-4 text-[rgba(220,200,255,0.7)]"
												: "mr-3 h-4 w-4 text-[rgba(103,80,164,0.7)]"
										}
									/>
									<span
										className={
											isDark ? "" : "text-[rgba(50,50,50,0.9)] hover:text-[rgba(50,50,50,1)]"
										}>
										Dashboard
									</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className={
								`hover:cursor-pointer disabled:cursor-not-allowed text-current ` +
								(isDark
									? "hover:bg-[rgba(103,80,164,0.15)] hover:text-[rgba(220,200,255,0.95)]"
									: "hover:bg-[rgba(132,95,220,0.08)] hover:text-[rgba(50,50,50,1)]")
							}
							onClick={signOut}
							disabled={disabled}>
							<LogOut
								className={
									isDark
										? "mr-3 h-4 w-4 text-[rgba(220,200,255,0.7)]"
										: "mr-3 h-4 w-4 text-[rgba(103,80,164,0.7)]"
								}
							/>
							<span className={isDark ? "" : "text-[rgba(50,50,50,0.9)] hover:text-[rgba(50,50,50,1)]"}>
								Sign out
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return <div className="flex items-center space-x-3 md:order-2">{content}</div>;
}
