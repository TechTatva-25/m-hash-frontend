import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

import { useTheme } from "@/components/ThemeProvider";
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

export default function DeleteTeamCard({
	team,
	setTeam,
}: {
	team: Team;
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}): React.ReactElement {
	const [disabled, setDisabled] = useState(false);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const handleDeleteTeam = (): void => {
		setDisabled(true);
		void axios
			.delete(getEndpoint(Endpoints.DELETE_TEAM), { withCredentials: true })
			.then(() => {
				toast.success("Team deleted successfully.");
				setTeam(null);
			})
			.catch((error: AxiosError<{ message: string }>) => {
				toast.error(error.response?.data.message ?? "Failed to delete team.");
			})
			.finally(() => {
				setDisabled(false);
			});
	};

	return (
		<Card
			className="w-full rounded-md px-4 py-6"
			style={{
				background: `${isDark ? "rgba(60, 20, 20, 0.5)" : "rgba(255, 240, 240, 0.5)"}`,
				backdropFilter: "blur(10px)",
				border: `1px solid ${isDark ? "rgba(180, 30, 30, 0.4)" : "rgba(220, 50, 50, 0.4)"}`,
				boxShadow: `0 4px 24px ${isDark ? "rgba(180, 30, 30, 0.2)" : "rgba(220, 50, 50, 0.1)"}`,
			}}>
			<CardTitle
				className="text-xl font-semibold"
				style={{ color: `${isDark ? "rgba(255, 200, 200, 0.9)" : "rgba(180, 30, 30, 0.9)"}` }}>
				Delete Team
			</CardTitle>
			<CardDescription className="mb-4 mt-1">
				The team will be permanently deleted. This action is irreversible and cannot be undone.
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
							<p
								className="text-lg font-medium"
								style={{ color: `${isDark ? "rgba(255, 200, 200, 0.9)" : "rgba(180, 30, 30, 0.9)"}` }}>
								{team.name}
							</p>
							<p className="text-sm text-muted-foreground">
								<span
									className="font-semibold"
									style={{
										color: `${isDark ? "rgba(255, 200, 200, 0.8)" : "rgba(180, 30, 30, 0.8)"}`,
									}}>
									Leader:
								</span>{" "}
								{team.team_leader.username}
							</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span
									className="font-semibold"
									style={{
										color: `${isDark ? "rgba(255, 200, 200, 0.8)" : "rgba(180, 30, 30, 0.8)"}`,
									}}>
									Members:
								</span>
								<FaUsers
									className="h-4 w-4"
									style={{
										color: `${isDark ? "rgba(255, 200, 200, 0.7)" : "rgba(180, 30, 30, 0.7)"}`,
									}}
								/>
								<span>{team.members.length}/5</span>
							</div>
						</div>
					</div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<div className="flex w-full items-center justify-end">
								<Button
									className="w-full cursor-pointer transition-opacity hover:opacity-80 sm:w-20"
									style={{
										background: `${isDark ? "rgba(180, 30, 30, 0.9)" : "rgba(220, 50, 50, 0.9)"}`,
										border: `1px solid ${isDark ? "rgba(180, 30, 30, 0.3)" : "rgba(220, 50, 50, 0.3)"}`,
									}}
									variant="destructive"
									disabled={disabled}>
									Delete
								</Button>
							</div>
						</AlertDialogTrigger>
						<AlertDialogContent
							style={{
								background: `${isDark ? "rgba(30, 30, 40, 0.9)" : "rgba(255, 255, 255, 0.9)"}`,
								backdropFilter: "blur(10px)",
								border: `1px solid ${isDark ? "rgba(180, 30, 30, 0.4)" : "rgba(220, 50, 50, 0.4)"}`,
								boxShadow: `0 4px 24px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(180, 30, 30, 0.1)"}`,
							}}>
							<AlertDialogHeader>
								<AlertDialogTitle
									style={{
										color: `${isDark ? "rgba(255, 200, 200, 0.9)" : "rgba(180, 30, 30, 0.9)"}`,
									}}>
									Are you absolutely sure?
								</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your team and remove your
								data from our servers. Submitted PPT, if any, will also be erased.
							</AlertDialogDescription>
							<AlertDialogFooter>
								<AlertDialogCancel
									className="cursor-pointer transition-opacity hover:opacity-80"
									style={{
										background: `${isDark ? "rgba(30, 30, 40, 0.5)" : "rgba(240, 240, 240, 0.5)"}`,
										border: `1px solid ${isDark ? "rgba(180, 30, 30, 0.3)" : "rgba(220, 50, 50, 0.3)"}`,
									}}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="cursor-pointer transition-opacity hover:opacity-80"
									style={{
										background: `${isDark ? "rgba(180, 30, 30, 0.9)" : "rgba(220, 50, 50, 0.9)"}`,
										border: `1px solid ${isDark ? "rgba(180, 30, 30, 0.3)" : "rgba(220, 50, 50, 0.3)"}`,
									}}
									onClick={handleDeleteTeam}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}
