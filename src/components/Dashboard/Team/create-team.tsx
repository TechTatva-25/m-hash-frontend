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
import { useRecoilState } from "recoil";

import { teamPresentState } from "@/atoms/team-present";
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
	const [, setRecoilTeamPresent] = useRecoilState(teamPresentState);

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

		try {
			setDisabled(true);
			let response;
			try {
				response = await axios.post<{ message: string }>(
					getEndpoint(Endpoints.CREATE_TEAM),
					{ name: teamName },
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
				setRecoilTeamPresent(true);
			}
		}
	};

	React.useEffect(() => {
		if (loading) return;
		void debouncedFetchUsers();
		return (): void => {
			debouncedFetchUsers.cancel();
		};
	}, [fetchParams.search, debouncedFetchUsers]);

	return (
		<Card>
			<CardHeader className="relative">
				<CardTitle>Create Team</CardTitle>
				<CardDescription>Create a new team and invite your friends to join.</CardDescription>
				{selectedUsers.length > 0 && (
					<Badge className="absolute right-6 top-5 z-10 flex flex-row" variant="secondary">
						<FaUsers className="h-4 w-4" />
						<p className="ml-2 text-sm font-semibold">{selectedUsers.length}/5 Members</p>
					</Badge>
				)}
			</CardHeader>
			<CardContent className="px-2 pb-2 sm:px-6 sm:pb-6">
				<Input
					disabled={disabled}
					placeholder="Enter team name"
					className="mb-4"
					value={teamName}
					onChange={(e): void => setTeamName(e.target.value)}
				/>
				<div className="mb-4 flex flex-col rounded-md border bg-background/50 p-2">
					<Input
						disabled={disabled}
						placeholder="Search for a user"
						className="mb-2"
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
									<Avatar className="h-10 w-10">
										<BoringAvatar
											name={user.username}
											variant="marble"
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
				</div>
				<div className="mb-4 flex min-h-16 flex-row flex-wrap items-center gap-2 rounded-md border bg-background/50 p-2">
					{selectedUsers.length === 0 && (
						<div className="flex h-full w-full flex-row items-center justify-center text-muted-foreground">
							<FaUsers className="h-6 w-6" />
							<p className="ml-2 text-sm font-semibold">No users selected</p>
						</div>
					)}
					{selectedUsers.map((user) => (
						<div key={user._id} className="flex flex-row items-center rounded-md border bg-transparent p-2">
							<Avatar className="h-8 w-8">
								<BoringAvatar
									name={user.username}
									variant="marble"
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
				</div>
				<Button
					onClick={handleCreateTeam}
					disabled={disabled}
					className="mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60">
					{disabled ? <HashLoader color="#a457f7" size={20} /> : "Create Team"}
				</Button>
			</CardContent>
		</Card>
	);
}
