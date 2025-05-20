"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BeatLoader, HashLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MultipleSelector, { MultipleSelectorRef, Option } from "@/components/ui/multi-select"; // Import Option type
import { User } from "@/hooks/useSession";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { cn, generateColorPalette } from "@/lib/utils";

export default function MultiSelectTeamList({
	className,
	team,
	onChange,
}: {
	className: string;
	team: Team;
	onChange: () => void;
}): React.ReactElement {
	const selectRef = React.useRef<MultipleSelectorRef>(null);
	const [disabled, setDisabled] = React.useState(team.members.length >= 5);
	const [usersMap, setUsersMap] = React.useState<Map<string, User>>(new Map());

	const fetchUsers = async (search: string): Promise<Option[]> => {
		try {
			const response = await axios.get<{
				users: User[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_USERS), {
				withCredentials: true,
				params: {
					username: search,
					email: search,
					offset: 0,
					limit: 100,
				},
			});
			const usersMap = new Map(response.data.users.map((user) => [user._id, user]));
			setUsersMap(usersMap);

			return response.data.users
				.filter((user) => !team.members.map((member) => member._id).includes(user._id))
				.map((user) => ({
					value: user._id,
					label: `${user.username}`,
					email: user.email,
				}));
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
			return [];
		}
	};

	const handleSendRequest = async (): Promise<void> => {
		setDisabled(true);
		for (const user of selectRef.current?.selectedValue ?? []) {
			try {
				await axios.post(
					getEndpoint(Endpoints.INVITE_USER),
					{ teamId: team._id, userId: user.value },
					{ withCredentials: true }
				);
				toast.success(`Invited ${user.label} to the team.`);
			} catch (error) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message);
			}
		}
		onChange();
		setDisabled(false);
		selectRef.current?.clear();
	};

	return (
		<Card className={cn("flex h-full flex-col", className)}>
			<CardHeader className="relative">
				<CardTitle>Select Team Members</CardTitle>
				<CardDescription>Select team members to invite to your team</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-grow flex-col items-center px-2 pb-2 sm:px-6 sm:pb-6">
				<MultipleSelector
					ref={selectRef}
					disabled={disabled}
					className="max-h-96"
					delay={250}
					maxSelected={5 - team.members.length}
					hidePlaceholderWhenSelected
					hideClearAllButton
					badgeClassName="rounded-md bg-background text-foreground border border-accent py-1.5"
					triggerSearchOnFocus
					optionNode={(option): React.JSX.Element => (
						<div
							key={option.value}
							data-fixed={option.fixed}
							data-disabled={option.disable ?? undefined}
							className="flex w-full flex-row items-center justify-between p-1">
							<Avatar className="h-10 w-10">
								<BoringAvatar
									name={usersMap.get(option.value)?.username ?? ""}
									variant="marble"
									size={40}
									colors={generateColorPalette(option.value)}
								/>
							</Avatar>
							<div className="ml-2 flex w-full flex-row items-center justify-between">
								<div className="flex flex-col items-start justify-center text-start">
									<p className="text-sm font-semibold">{usersMap.get(option.value)?.username}</p>
									<p className="text-xs text-muted-foreground">{usersMap.get(option.value)?.email}</p>
								</div>
								<Button disabled={disabled} variant={"ghost"} className="border-none p-0">
									<IoMdAdd className="h-5 w-5" />
								</Button>
							</div>
						</div>
					)}
					onSearch={(search: string): Promise<Option[]> => fetchUsers(search)}
					placeholder="Search for a user..."
					loadingIndicator={
						<div className="my-10 flex items-center justify-center text-center">
							<BeatLoader color="#a457f7" size={12} />
						</div>
					}
					emptyIndicator={
						<div className="my-5 flex w-full items-center justify-center">
							<FaUsers className="mr-2 h-5 w-5" />
							<p className="text-center font-semibold">No users found</p>
						</div>
					}
				/>
				<Button
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleSendRequest}
					disabled={disabled}
					className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60">
					{disabled ? <HashLoader color="#a457f7" size={20} /> : "Send Invites"}
				</Button>
			</CardContent>
		</Card>
	);
}
