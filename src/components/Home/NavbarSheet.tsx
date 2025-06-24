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
			<Sheet>
				<SheetTrigger className="px-1 xs:px-4 md:px-8" asChild>
					<Button variant="nav">
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
				<SheetContent>
					<div className="grid gap-3 py-4">
						<SheetClose asChild>
							<a
								href="/#"
								className="block rounded px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
								Home
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href="/#about"
								className="block rounded px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
								About Us
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href="/#timeline"
								className="block rounded px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
								Timeline
							</a>
						</SheetClose>
						<SheetClose asChild>
							<a
								href="/#problem-statements"
								className="block rounded px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
								Problem Statements
							</a>
						</SheetClose>
						{/* <SheetClose asChild>
                            <a
                                href="/leaderboard"
                                className="block rounded px-3 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] dark:text-[hsl(var(--primary-foreground))]">
                                Bug Round Leaderboard
                            </a>
                        </SheetClose> */}
						<SheetClose asChild>
							<Button
								onClick={(): void => {
									window.location.href = "/login";
								}}
								variant="outline"
								className="flex w-full items-center cursor-pointer space-x-2 text-gray-800 dark:text-gray-200 md:w-auto">
								Login
							</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button
								onClick={(): void => {
									window.location.href = "/register";
								}}
								variant="outline"
								className="flex w-full items-center space-x-2 text-gray-800 dark:text-gray-200 md:w-auto">
								Register
							</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button
								onClick={toggleTheme}
								variant="outline"
								className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
								{theme === "dark" ? (
									<RiSunFill className="mr-2" />
								) : (
									<RiMoonClearFill className="mr-2" />
								)}
								<span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
							</Button>
						</SheetClose>
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
									<Button variant="outline" className="relative h-10 w-10 rounded-full">
										<Avatar className="h-10 w-10">
											{" "}
											<BoringAvatar
												name={username}
												variant="beam"
												size={40}
												colors={generateColorPalette(username)}
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

					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{username}</p>
								<p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="hover:cursor-pointer" asChild>
								<Link href="/dashboard" className="flex items-center">
									<LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
									Dashboard
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:cursor-pointer" onClick={toggleTheme}>
								{theme === "dark" ? (
									<RiSunFill className="mr-3 h-4 w-4 text-muted-foreground" />
								) : (
									<RiMoonClearFill className="mr-3 h-4 w-4 text-muted-foreground" />
								)}
								{theme === "dark" ? "Light" : "Dark"} Mode
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="hover:cursor-pointer disabled:cursor-not-allowed"
							onClick={signOut}
							disabled={disabled}>
							<LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return <div className="flex items-center space-x-3 md:order-2">{content}</div>;
}
