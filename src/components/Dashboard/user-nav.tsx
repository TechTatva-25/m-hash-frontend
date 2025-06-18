"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
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
	const { resolvedTheme, setTheme } = useTheme();
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
				toast.error("An error occurred while resending the email");
			}
		} finally {
			setDisabled(false);
		}
	};

	return (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="relative h-10 w-10 rounded-full">
								<Avatar className="h-10 w-10">
									<BoringAvatar
										name={session?.username ?? ""}
										variant="marble"
										size={40}
										colors={generateColorPalette(session?.userId ?? "")}
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
						<p className="text-sm font-medium leading-none">{session?.username ?? ""}</p>
						<p className="text-xs leading-none text-muted-foreground">{session?.user?.email ?? ""}</p>
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
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={(): void => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
						{resolvedTheme === "dark" ? (
							<RiSunFill className="mr-3 h-4 w-4 text-muted-foreground" />
						) : (
							<RiMoonClearFill className="mr-3 h-4 w-4 text-muted-foreground" />
						)}
						{resolvedTheme === "dark" ? "Light" : "Dark"} Mode
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
	);
}
