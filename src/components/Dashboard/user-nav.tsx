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
						className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 focus:scale-105 p-0 border-2 hover:border-primary/50 focus:border-primary/50"
					>
						<Avatar className="h-9 w-9">
							<BoringAvatar
								name={session?.username ?? ""}
								variant="marble"
								size={36}
								colors={generateColorPalette(session?.userId ?? "")}
							/>
						</Avatar>
						<span className="sr-only">Open user menu</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="end">
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{session?.username ?? ""}</p>
							<p className="text-xs leading-none text-muted-foreground">{session?.user?.email ?? ""}</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className="hover:cursor-pointer hover:bg-accent/30 focus:bg-accent/30 rounded-md my-1" asChild>
							<Link href="/dashboard" className="flex items-center">
								<LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
								Dashboard
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="hover:cursor-pointer hover:bg-accent/30 focus:bg-accent/30 rounded-md my-1 disabled:cursor-not-allowed"
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
