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
						className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 focus:scale-105 p-0"
						style={{
							background: theme === "dark" 
								? 'rgba(255, 255, 255, 0.05)' 
								: 'rgba(255, 255, 255, 0.3)',
							border: `1px solid ${theme === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}`,
							boxShadow: `0 2px 8px ${theme === "dark" ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)'}`
						}}
					>
						<div className="relative h-9 w-9 rounded-full overflow-hidden cursor-pointer">							<Avatar className="h-9 w-9">
								<BoringAvatar
									name={session?.username ?? ""}
									variant="beam"
									size={36}
									colors={generateColorPalette(session?.userId ?? "")}
								/>
							</Avatar>
							<div className="absolute inset-0 backdrop-blur-sm" style={{
								background: theme === "dark" ? 'rgba(139, 92, 246, 0.05)' : 'rgba(139, 92, 246, 0.03)',
								mixBlendMode: "overlay"
							}}></div>
						</div>
						<span className="sr-only">Open user menu</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent 
					className="w-56 overflow-hidden backdrop-blur-md border transition-all duration-300" 
					align="end"
					style={{
						background: theme === "dark" 
							? 'rgba(30, 41, 59, 0.8)' 
							: 'rgba(255, 255, 255, 0.8)',
						borderColor: theme === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.5)',
						boxShadow: `0 4px 20px ${theme === "dark" ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
					}}
				>
					{/* Subtle purple accent overlay */}
					<div className="absolute inset-0" style={{
						background: theme === "dark"
							? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))'
							: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))'
					}}></div>
					
					<div className="relative">
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{session?.username ?? ""}</p>
								<p className="text-xs leading-none text-muted-foreground">{session?.user?.email ?? ""}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>							<DropdownMenuItem 
								className={`hover:cursor-pointer my-1 transition-all duration-300 rounded-md hover:bg-opacity-10 ${
									theme === "dark" 
										? "hover:bg-purple-500" 
										: "hover:bg-purple-500"
								}`}
								style={{
									borderRadius: '6px',
									background: 'transparent'
								}}
								asChild
							>
								<Link href="/dashboard" className="flex items-center">
									<LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
									Dashboard
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />						<DropdownMenuItem
							className={`hover:cursor-pointer my-1 disabled:cursor-not-allowed transition-all duration-300 rounded-md hover:bg-opacity-10 ${
								theme === "dark" 
									? "hover:bg-red-500" 
									: "hover:bg-red-500"
							}`}
							style={{
								borderRadius: '6px'
							}}
							onClick={signOut}
							disabled={disabled}>
							<LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
							Sign out
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
