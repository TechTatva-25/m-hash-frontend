"use client";

import axios, { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaMap } from "react-icons/fa";
import { FaChartSimple, FaRegEnvelope, FaStackOverflow, FaTimeline, FaUser } from "react-icons/fa6";
// import { FaChartSimple, FaGavel, FaRegEnvelope, FaStackOverflow, FaTimeline, FaUser } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";
import { MdDriveFolderUpload } from "react-icons/md";
import { toast } from "react-toastify";

import { useSession } from "@/hooks/useSession";
import { useTeam } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";

interface MenuProps {
	isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps): React.JSX.Element {
	const pathname = usePathname();
	const router = useRouter();
	const menuList = getMenuList(pathname);
	const session = useSession();
	const team = useTeam();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	// Replacing Recoil state with local state
	const [teamPresent, setTeamPresent] = useState(false);

	// Initialize team presence state based on team data
	useEffect(() => {
		if (team && team._id) {
			setTeamPresent(true);
		} else {
			setTeamPresent(false);
		}
	}, [team]);

	if (teamPresent && team._id && (session?.user?.role === "user" || session?.user?.role === "admin")) {
		menuList
			.find((menu) => menu.groupLabel === "Team")
			?.menus.push({
				href: "/dashboard/progress",
				label: "Progress",
				active: pathname.includes("/dashboard/progress"),
				icon: FaTimeline,
				submenus: [],
			});

		menuList
			.find((menu) => menu.groupLabel === "Team")
			?.menus.push({
				href: "/dashboard/submit",
				label: "Submit",
				active: pathname.includes("/dashboard/submit"),
				icon: MdDriveFolderUpload,
				submenus: [],
			});
	}

	if (session?.user?.role === "admin") {
		menuList.push({
			groupLabel: "Admin",
			menus: [
				{
					href: "/dashboard/admin",
					label: "Teams & Users",
					active: pathname === "/dashboard/admin",
					icon: FaUser,
					submenus: [],
				},
				{
					href: "/dashboard/admin/statistics",
					label: "Statistics",
					active: pathname === "/dashboard/admin/statistics",
					icon: FaChartSimple,
					submenus: [],
				},
				{
					href: "/dashboard/admin/submissions",
					label: "Submissions",
					active: pathname === "/dashboard/admin/submissions",
					icon: FaStackOverflow,
					submenus: [],
				},
				{
					href: "/dashboard/admin/tickets",
					label: "Tickets",
					active: pathname === "/dashboard/admin/tickets",
					icon: FaRegEnvelope,
					submenus: [],
				},
				// {
				//  href: "/dashboard/admin/leaderboard",
				//  label: "Bug Round Leaderboard",
				//  active: pathname === "/dashboard/admin/leaderboard",
				//  icon: FaRankingStar,
				//  submenus: [],
				// },
				{
					href: "/dashboard/admin/judgeMapping",
					label: "Judge Mapping",
					active: pathname === "/dashboard/admin/judgeMapping",
					icon: FaMap,
					submenus: [],
				},
				{
					href: "/dashboard/admin/judgeTotal",
					label: "Total Scoreboard",
					active: pathname === "/dashboard/admin/judgeTotal",
					icon: GoNumber,
					submenus: [],
				},
			],
		});
	}

	// if (session?.user?.role === "judge" || session?.user?.role === "admin") {
	if (session?.user?.role === "judge") {
		menuList.push({
			groupLabel: "Judge",
			menus: [
				// {
				//  href: "/dashboard/judge",
				//  label: "Judge Portal",
				//  active: pathname.includes("/dashboard/judge"),
				//  icon: FaGavel,
				//  submenus: [],
				// },
				// {
				//  href: "/dashboard/judge",
				//  label: "Rounds Scoreboard",
				//  active: pathname === "/dashboard/judge",
				//  icon: GoNumber,
				//  submenus: [],
				// },
				{
					href: "/dashboard/judgePresentation",
					label: "Presentation Round Scoreboard",
					active: pathname === "/dashboard/judgePresentation",
					icon: GoNumber,
					submenus: [],
				},
				{
					href: "/dashboard/admin/leaderboard",
					label: "Bug Round Leaderboard",
					active: pathname === "/dashboard/admin/leaderboard",
					icon: FaRankingStar,
					submenus: [],
				},
			],
		});
	}

	if (session?.user?.role === "judge") {
		menuList.splice(
			menuList.findIndex((menu) => menu.groupLabel === "Team"),
			1
		);
	}

	const [disabled, setDisabled] = useState(false);

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
		<ScrollArea className="[&>div>div[style]]:!block scrollbar-hide" hidden>
			<nav className="mt-4 h-full w-full">
				<ul className="flex flex-col items-start space-y-1 px-2">
					{menuList.map(({ groupLabel, menus }, index) => (
						<li className={cn("w-full", groupLabel ? "pt-2" : "")} key={index}>
							{" "}
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p
									className="max-w-[248px] truncate px-4 pb-1 text-sm font-medium text-muted-foreground"
									style={{ fontFamily: "var(--font-playfair-display)" }}>
									{groupLabel}
								</p>
							) : !isOpen && isOpen !== undefined && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="flex w-full items-center justify-center">
												<Separator orientation="horizontal" className="w-full" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className="pb-2"></p>
							)}
							{menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
								submenus.length === 0 ? (
									<div className="w-full" key={index}>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={active ? "secondary" : "ghost"}
														className={cn(
															"mb-1 h-10 w-full justify-start backdrop-blur-sm transition-all duration-300",
															active
																? isDark
																	? "hover:bg-purple-500/15"
																	: "hover:bg-purple-500/10"
																: isDark
																	? "hover:bg-slate-300/5"
																	: "hover:bg-slate-300/30"
														)}
														style={{
															background: active
																? isDark
																	? "rgba(139, 92, 246, 0.1)"
																	: "rgba(139, 92, 246, 0.05)"
																: "transparent",
															border: active
																? `1px solid ${isDark ? "rgba(168, 85, 247, 0.15)" : "rgba(168, 85, 247, 0.1)"}`
																: undefined,
															boxShadow: active
																? `0 2px 4px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`
																: undefined,
														}}
														asChild>
														<Link href={href}>
															<span className={cn(isOpen === false ? "" : "mr-4")}>
																<Icon size={18} />
															</span>
															<p
																className={cn(
																	"max-w-[200px] truncate",
																	isOpen === false
																		? "-translate-x-96 opacity-0"
																		: "translate-x-0 opacity-100"
																)}>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{isOpen === false && (
													<TooltipContent side="right">{label}</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									<div className="w-full" key={index}>
										<CollapseMenuButton
											icon={Icon}
											label={label}
											active={active}
											submenus={submenus}
											isOpen={isOpen}
										/>
									</div>
								)
							)}
						</li>
					))}{" "}
					<li className="flex w-full grow items-end">
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button
										className={`h-10 w-full justify-center backdrop-blur-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${isDark ? "hover:bg-red-500/10" : "hover:bg-red-500/5"}`}
										style={{
											border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(203, 213, 225, 0.5)"}`,
											boxShadow: `0 2px 4px ${isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.02)"}`,
										}}
										onClick={signOut}
										disabled={disabled}>
										<span className={cn(isOpen === false ? "" : "mr-4")}>
											<LogOut size={18} />
										</span>
										<p
											className={cn(
												"whitespace-nowrap",
												isOpen === false ? "hidden opacity-0" : "opacity-100"
											)}>
											Sign out
										</p>
									</Button>
								</TooltipTrigger>
								{isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	);
}
