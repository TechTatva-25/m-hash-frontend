import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import * as React from "react";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

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

export const LeaveTeamCard: React.FC<{
	team: Team;
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}> = ({ team, setTeam }) => {
	const [disabled, setDisabled] = React.useState(false);
	const setRecoilTeamPresent = useSetRecoilState(teamPresentState);

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
		<Card
			className="w-full rounded-md px-4 py-6 shadow-md"
			style={{
				background: `rgba(20, 40, 20, 0.5)`,
				backdropFilter: "blur(10px)",
				border: `1px solid rgba(46,204,113, 0.3)`,
				boxShadow: `0 4px 24px rgba(34,102,68, 0.2)`,
			}}>
			<CardTitle className="text-xl font-semibold">Leave Team</CardTitle>
			<CardDescription className="mb-4 mt-1">
				You can leave this team, but remember, if you are the team leader, you will need to transfer leadership
				first.
			</CardDescription>
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
						<AlertDialogTrigger asChild>
							<div className="flex w-full items-center justify-end">
								<Button className="w-full sm:w-20" variant={"destructive"} disabled={disabled}>
									Leave
								</Button>
							</div>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogDescription>
								You are about to leave the team. This will remove you from the team roster.
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
};

export default LeaveTeamCard;
