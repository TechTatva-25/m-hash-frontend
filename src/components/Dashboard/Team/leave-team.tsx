import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

import { teamPresentState } from "@/atoms/team-present";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

export default function LeaveTeamCard({
	team,
	setTeam,
}: {
	team: Team;
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}): React.ReactElement {
	const [disabled, setDisabled] = useState(false);
	const [, setRecoilTeamPresent] = useRecoilState(teamPresentState);

	const handleLeaveTeam = (): void => {
		setDisabled(true);
		void axios
			.post(getEndpoint(Endpoints.LEAVE_TEAM), { teamId: team._id }, { withCredentials: true })
			.then(() => {
				toast.success("You left the team successfully.");
				setTeam(null);
				setRecoilTeamPresent(false);
			})
			.catch((error: AxiosError<{ message: string }>) => {
				toast.error(error.response?.data.message ?? "Failed to leave team.");
			})
			.finally(() => {
				setDisabled(false);
			});
	};

	return (
		<Card className="mt-7 w-full rounded-md border border-red-500 bg-red-500/5 px-4 py-6 shadow-md dark:border-red-700/50 dark:bg-red-600/5">
			<CardTitle className="text-xl font-semibold">Leave Team</CardTitle>
			<CardDescription className="mb-4 mt-1">Leave the team by clicking the button below.</CardDescription>
			<CardContent className="flex w-full flex-col gap-4 p-0 pt-4">
				<div className="flex w-full flex-col items-center gap-4 sm:flex-row">
					<div className="flex w-full flex-grow flex-row gap-4">
						<div className="h-16 w-16">
							<BoringAvatar
								size={64}
								name={team.name}
								variant="marble"
								colors={generateColorPalette(team._id)}
							/>
						</div>
						<div className="flex flex-col">
							<p className="text-lg font-medium">{team.name}</p>
							<p className="text-sm text-muted-foreground">
								<span className="font-semibold">Leader:</span> {team.team_leader.username}
							</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span className="font-semibold">Members:</span>
								<FaUsers className="h-4 w-4" />
								<span>{team.members.length}/5</span>
							</div>
						</div>
					</div>
					<AlertDialog>
						<AlertDialogTrigger className="flex w-full items-center justify-end">
							<Button className="w-full sm:w-20" variant={"destructive"} disabled={disabled}>
								Leave
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogDescription>
								This action will permanently remove you from your team.
							</AlertDialogDescription>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleLeaveTeam}>Leave</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}
