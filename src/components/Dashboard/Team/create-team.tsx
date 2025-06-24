"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BeatLoader, HashLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Input } from "@/components/ui/input";
import { User } from "@/hooks/useSession";
import { getTeam, Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

import { useTheme } from "@/components/ThemeProvider";

interface UserFetchParams {
	offset: number;
	search: string;
	limit: number;
}

export default function CreateTeam({
	currentUser,
	setTeam,
}: {
	currentUser: User;
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}): React.ReactElement {
	const [fetchParams, setFetchParams] = React.useState<UserFetchParams>({ offset: 0, search: "", limit: 200 });
	const [hasMore, setHasMore] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [teamName, setTeamName] = React.useState("");
	const [disabled, setDisabled] = React.useState(false);
	const [selectedUsers, setSelectedUsers] = React.useState<User[]>([currentUser]);
	const [usersMap, setUsersMap] = React.useState<Map<string, User>>(new Map());

	const fetchUsers = async (reset = false): Promise<void> => {
		try {
			setLoading(true);
			const users = await axios.get<{
				users: User[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_USERS), {
				withCredentials: true,
				params: {
					username: fetchParams.search,
					email: fetchParams.search,
					offset: reset ? 0 : fetchParams.offset,
					limit: fetchParams.limit,
				},
			});
			const usersMap = new Map(users.data.users.map((user) => [user._id, user]));
			reset ? setUsersMap(usersMap) : setUsersMap((prev) => new Map([...prev, ...usersMap]));
			setFetchParams({ ...fetchParams, offset: users.data.offset + users.data.limit });
			setHasMore(users.data.hasMore);
		} catch (error) {
			// const e = error as AxiosError<{ message: string }>;
			// toast.error(e.response?.data.message);
			const e = error as AxiosError<{ message: string; data: { errors: { msg: string }[] } }>;
			toast.error(e.response?.data.data.errors[0].msg);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchUsers = React.useCallback(
		debounce(async () => {
			await fetchUsers(true);
		}, 500),
		[fetchParams.search]
	);

	const handleCreateTeam = async (): Promise<void> => {
		let team: Team | undefined;

		// Validate team name before proceeding
		if (!teamName || teamName.trim() === "") {
			toast.error("Please enter a team name");
			return;
		}

		try {
			setDisabled(true);
			let response;
			try {
				response = await axios.post<{ message: string }>(
					getEndpoint(Endpoints.CREATE_TEAM),
					{ name: teamName.trim() },
					{ withCredentials: true }
				);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
				} else {
					toast.error("An error occurred while creating the team");
				}
				return;
			}
			toast.success(response.data.message);
			team = await getTeam();
			if (team._id) {
				await Promise.all(
					selectedUsers
						.filter((user) => user._id !== currentUser._id)
						.map((user) =>
							axios
								.post(
									getEndpoint(Endpoints.INVITE_USER),
									{ teamId: team?._id, userId: user._id },
									{ withCredentials: true }
								)
								.then(() => {
									toast.success(`Invited ${user.username} to the team.`);
								})
								.catch((error) => {
									// toast.error((error as AxiosError<{ message: string }>).response?.data.message);
									const e = error as AxiosError<{
										message: string;
										data: { errors: { msg: string }[] };
									}>;
									toast.error(e.response?.data.message ?? e.response?.data.data.errors[0].msg);
								})
						)
				);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while inviting a team member");
			}
		} finally {
			setDisabled(false);

			if (team) {
				setTeam(team);
			}
		}
	};

	React.useEffect(() => {
		if (loading) return;
		void debouncedFetchUsers();
		return (): void => {
			debouncedFetchUsers.cancel();
		};	}, [fetchParams.search, debouncedFetchUsers]);
	
	// Access theme context to adapt component to light/dark mode
	const { theme } = useTheme();
	const isDark = theme === "dark";
		return (		<Card className="group relative backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
			style={{
				background: isDark 
					? 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))'
					: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(241, 245, 249, 0.9))',
				boxShadow: `
					0 10px 30px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'}, 
					0 0 0 1px ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'}
				`,
				border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)'}`,
			}}>
			{/* Subtle background gradient effect similar to HighwayTimeline */}
			<div className="absolute inset-0 rounded-xl -z-10" style={{
				background: isDark
					? 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))'
					: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))'
			}}></div>
			
			{/* Accent edge */}
			<div className="absolute inset-0 rounded-xl overflow-hidden">
				<div className="absolute top-0 left-0 right-0 h-[1px]" style={{
					background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.5)'}, transparent)`
				}}></div>
				<div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
					background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.4)'}, transparent)`
				}}></div>
			</div>
			
			{/* Enhanced inner glow with subtle highlights */}
			<div className="absolute inset-0 rounded-xl" style={{
				background: `linear-gradient(to bottom right, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.15)'}, transparent)`,
				mixBlendMode: "overlay"
			}}></div>
			
			{/* Light beam effect on hover - similar to HighwayTimeline */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out rounded-xl overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
			</div>

			<CardHeader className="relative z-10">
				<div className="relative inline-block mb-4">
					<CardTitle className="text-3xl font-bold text-[hsl(var(--foreground))]" style={{ fontFamily: "var(--font-playfair-display)" }}>Create Team</CardTitle>
					
					{/* Clean underlines */}
					<div className="absolute -bottom-2 left-0 h-1 w-[100%] bg-[hsl(var(--foreground))] rounded-full"></div>
					<div className="absolute -bottom-4 left-0 h-[0.5px] w-[100%] bg-[hsl(var(--foreground))]/60 rounded-full"></div>
				</div>
						<CardDescription className="text-[hsl(var(--foreground))]/80">Create a new team and invite your friends to join.</CardDescription>
				{selectedUsers.length > 0 && (					<Badge className="absolute right-6 top-5 z-10 flex flex-row backdrop-blur-xl" variant="secondary" style={{
						background: isDark
							? 'linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(79, 70, 229, 0.15))'
							: 'linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(79, 70, 229, 0.2))',
						border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}`,
						boxShadow: `0 2px 10px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`
					}}>
						<FaUsers className="h-4 w-4" />
						<p className="ml-2 text-sm font-semibold">{selectedUsers.length}/5 Members</p>
					</Badge>
				)}
			</CardHeader>
			<CardContent className="relative z-10 px-2 pb-2 sm:px-6 sm:pb-6">				<Input
					disabled={disabled}
					placeholder="Enter team name"
					className="mb-4 backdrop-blur-lg"
					style={{
						background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
						border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}`,
					}}
					value={teamName}
					onChange={(e): void => setTeamName(e.target.value)}
				/><div className="mb-4 flex flex-col rounded-md border-0 p-2" style={{
					background: isDark 
						? 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))'
						: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					boxShadow: `inset 0 0 0 1px ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'}`,
					borderRadius: '0.5rem'
				}}>					<Input
						disabled={disabled}
						placeholder="Search for a user"
						className="mb-2 backdrop-blur-lg"
						style={{
							background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
							border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'}`,
						}}
						value={fetchParams.search}
						onChange={(e): void => setFetchParams({ ...fetchParams, search: e.target.value, offset: 0 })}
					/>
					<ScrollArea className="h-64 overflow-auto overflow-x-hidden">
						{Array.from(usersMap.values())
							.filter((user) => !selectedUsers.map((u) => u._id).includes(user._id))
							.map((user, index) => (
								<div
									key={index}
									className="flex cursor-pointer flex-row items-center rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-accent">
									<Avatar className="h-10 w-10">										<BoringAvatar
											name={user.username}
											variant="beam"
											size={40}
											colors={generateColorPalette(user._id)}
										/>
									</Avatar>
									<div className="ml-2 flex w-full flex-row items-center justify-between">
										<div className="flex flex-col items-start justify-center text-start">
											<p className="text-sm font-semibold">{user.username}</p>
											<p className="text-xs text-muted-foreground">{user.email}</p>
										</div>
										<Button
											disabled={disabled}
											variant={"ghost"}
											className="border-none p-0"
											onClick={(): void => {
												if (selectedUsers.length === 5) {
													return;
												}

												setSelectedUsers((prev) => [...prev, user]);
											}}>
											<IoMdAdd className="h-5 w-5" />
										</Button>
									</div>
								</div>
							))}
						<InfiniteScroll hasMore={hasMore} isLoading={loading} next={fetchUsers}>
							{hasMore && (
								<div className="my-10 flex items-center justify-center text-center">
									<BeatLoader color="#a457f7" size={12} />
								</div>
							)}
						</InfiniteScroll>
					</ScrollArea>
				</div>				<div className="mb-4 flex min-h-16 flex-row flex-wrap items-center gap-2 rounded-md border-0 p-2" style={{
					background: isDark 
						? 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))'
						: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))',
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					boxShadow: `inset 0 0 0 1px ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'}`,
					borderRadius: '0.5rem'
				}}>
					{selectedUsers.length === 0 && (
						<div className="flex h-full w-full flex-row items-center justify-center text-muted-foreground">
							<FaUsers className="h-6 w-6" />
							<p className="ml-2 text-sm font-semibold">No users selected</p>
						</div>
					)}
					{selectedUsers.map((user) => (
						<div key={user._id} className="flex flex-row items-center rounded-md border-0 bg-transparent p-2">
							<Avatar className="h-8 w-8">								<BoringAvatar
									name={user.username}
									variant="beam"
									size={32}
									colors={generateColorPalette(user._id)}
								/>
							</Avatar>
							<p className="mx-2 text-sm font-semibold">{user.username}</p>
							{user._id !== currentUser._id && (
								<Button
									variant={"ghost"}
									className="h-5 w-5 border-none p-0.5"
									onClick={(): void => {
										setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));
									}}>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					))}
				</div>				{/* Glassmorphic Button inspired by Send Message button */}
				<div className="mt-2 relative group">
					<button
						onClick={handleCreateTeam}
						disabled={disabled}
						className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">						{/* Outer border ring */}
						<div className="absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:border-white/40"
							style={{
								borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(167, 139, 250, 0.3)'
							}}></div>						{/* Glow effect */}
						<div className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							style={{
								background: isDark 
									? 'linear-gradient(to right, rgba(129, 140, 248, 0.2), rgba(167, 139, 250, 0.2))' 
									: 'linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.15))'
							}}></div>{/* Enhanced glassmorphic background */}
						<div className="absolute inset-1 rounded-full shadow-2xl transition-all duration-300 group-hover:bg-white/20"
							style={{
								background: isDark 
									? 'rgba(255, 255, 255, 0.15)' 
									: 'linear-gradient(to right, rgba(233, 213, 255, 0.8), rgba(243, 232, 255, 0.8))',
								backdropFilter: "blur(12px)"
							}}></div>{/* Inner highlight */}
						<div className="absolute inset-2 rounded-full opacity-60"
							style={{
								background: isDark 
									? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)'
									: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4))'
							}}></div>{/* Button content */}
						<div className="relative z-10 flex items-center justify-center">
							{disabled ? (
								<HashLoader color="#ffffff" size={20} />
							) : (
								<>
									<FaUsers className={`mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`} />
									<span
										className={`tracking-wider font-medium text-center cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}
										style={{
											fontFamily: "var(--font-playfair-display)",
											textShadow: isDark ? "0 2px 8px rgba(0,0,0,0.5)" : "0 1px 2px rgba(0,0,0,0.1)",
										}}>
										Create Team
									</span>
								</>
							)}
						</div>
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
