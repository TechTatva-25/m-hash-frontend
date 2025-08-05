"use client";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { User } from "@/hooks/useSession";
import { getTeam, Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

interface Invite {
	_id: string;
	team: Team;
	user: User;
	type: "incoming" | "outgoing";
	createdAt: Date;
	updatedAt: Date;
}

export default function TeamInbox({
	reload,
	setReload,
	setTeam,
}: {
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}): React.ReactElement {
	const [invites, setInvites] = React.useState<Invite[]>([]);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const fetchInvites = async (): Promise<void> => {
		try {
			const invites = await axios.get<Invite[]>(getEndpoint(Endpoints.TEAM_INVITES), {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setInvites(invites.data);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		if (!reload) return;
		void fetchInvites();
		setReload(false);
	}, [reload]);

	React.useEffect(() => {
		void fetchInvites();
	}, []);

	const handleCancelInvite = async (inviteId: string): Promise<void> => {
		try {
			await axios.post(getEndpoint(Endpoints.CANCEL_INVITE), { inviteId }, { withCredentials: true });
			setReload(true);
			toast.success("Invite cancelled successfully.");
		} catch (error) {
			toast.error(
				(error as AxiosError<{ message?: string }>).response?.data.message ?? "Failed to cancel invite."
			);
		}
	};

	const handleAcceptJoinRequest = async (inviteId: string): Promise<void> => {
		try {
			await axios.post(getEndpoint(Endpoints.ACCEPT_JOIN_REQUEST), { inviteId }, { withCredentials: true });
			setReload(true);
			toast.success("Join request accepted successfully.");
			const team = await getTeam();
			setTeam(team);
		} catch (error) {
			toast.error(
				(error as AxiosError<{ message?: string }>).response?.data.message ?? "Failed to accept join request."
			);
		}
	};

	const handleRejectJoinRequest = async (inviteId: string): Promise<void> => {
		try {
			await axios.post(getEndpoint(Endpoints.REJECT_JOIN_REQUEST), { inviteId }, { withCredentials: true });
			setReload(true);
			toast.success("Join request rejected successfully.");
		} catch (error) {
			toast.error(
				(error as AxiosError<{ message?: string }>).response?.data.message ?? "Failed to reject join request."
			);
		}
	};

	return (
		<div className="my-10 flex w-full flex-col items-center justify-center gap-10">
			<Collapsible
				className="grid w-full gap-4 rounded-md"
				style={{
					background: `${isDark ? "rgba(15,25,15, 0.5)" : "rgba(240,255,245, 0.5)"}`,
					backdropFilter: "blur(10px)",
					border: `1px solid ${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
					boxShadow: `0 4px 24px ${isDark ? "rgba(34,102,68, 0.2)" : "rgba(16,109,32, 0.1)"}`,
				}}
				defaultOpen>
				<CollapsibleTrigger
					className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold [&[data-state=open]>svg]:rotate-90"
					style={{
						color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
						borderBottom: `1px solid ${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
					}}>
					Join Requests
					<ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<Card
						className="border-none"
						style={{
							background: "transparent",
						}}>
						<CardContent className="-mt-4 p-0">
							<div className="grid w-full gap-4">
								{invites.filter((invite) => invite.type === "incoming").length === 0 && (
									<p
										className="border-t py-6 text-center text-sm text-muted-foreground"
										style={{
											borderColor: `${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
										}}>
										No join requests found
									</p>
								)}
								{invites
									.filter((invite) => invite.type === "incoming")
									.map((invite) => (
										<div
											key={invite._id}
											className="flex w-full cursor-pointer flex-col items-center justify-between gap-4 px-4 py-3 transition-all duration-300 ease-in-out sm:px-7 md:flex-row hover:opacity-90"
											style={{
												borderTop: `1px solid ${isDark ? "rgba(46,204,113, 0.2)" : "rgba(52,168,83, 0.2)"}`,
												background: `${isDark ? "rgba(15,25,15, 0.3)" : "rgba(240,255,245, 0.3)"}`,
											}}>
											<div className="flex w-full items-center gap-4 md:w-auto">
												<div className="flex h-10 w-10">
													<BoringAvatar
														size={40}
														name={invite.user.username}
														variant="beam"
														colors={generateColorPalette(invite.user._id)}
													/>
												</div>
												<div className="flex flex-col">
													<p
														className="text-lg font-medium"
														style={{
															color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
														}}>
														{invite.user.username}
													</p>
													<p className="text-sm text-muted-foreground">{invite.user.email}</p>
												</div>
											</div>
											<div className="flex w-full items-center justify-center gap-4 md:w-auto">
												<Button
													size="sm"
													className="transition-all duration-300 hover:scale-105"
													style={{
														background: `${isDark ? "rgba(46,204,113, 0.2)" : "rgba(52,168,83, 0.2)"}`,
														border: `1px solid ${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
														color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
													}}
													onClick={(): void => {
														void handleAcceptJoinRequest(invite._id);
													}}>
													Accept
												</Button>
												<Button
													size="sm"
													variant="outline"
													className="transition-all duration-300 hover:scale-105"
													style={{
														background: `${isDark ? "rgba(220, 38, 38, 0.2)" : "rgba(220, 38, 38, 0.1)"}`,
														border: `1px solid ${isDark ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0.2)"}`,
													}}
													onClick={(): void => {
														void handleRejectJoinRequest(invite._id);
													}}>
													Reject
												</Button>
											</div>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				</CollapsibleContent>
			</Collapsible>

			<Collapsible
				className="grid w-full gap-4 rounded-md"
				style={{
					background: `${isDark ? "rgba(15,25,15, 0.5)" : "rgba(240,255,245, 0.5)"}`,
					backdropFilter: "blur(10px)",
					border: `1px solid ${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
					boxShadow: `0 4px 24px ${isDark ? "rgba(34,102,68, 0.2)" : "rgba(16,109,32, 0.1)"}`,
				}}
				defaultOpen>
				<CollapsibleTrigger
					className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold [&[data-state=open]>svg]:rotate-90"
					style={{
						color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
						borderBottom: `1px solid ${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
					}}>
					Sent Invites
					<ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<Card
						className="border-none"
						style={{
							background: "transparent",
						}}>
						<CardContent className="-mt-4 p-0">
							<div className="grid w-full">
								{invites.filter((invite) => invite.type === "outgoing").length === 0 && (
									<p
										className="border-t py-6 text-center text-sm text-muted-foreground"
										style={{
											borderColor: `${isDark ? "rgba(46,204,113, 0.3)" : "rgba(52,168,83, 0.3)"}`,
										}}>
										No invites found
									</p>
								)}
								{invites
									.filter((invite) => invite.type === "outgoing")
									.map((invite) => (
										<div
											key={invite._id}
											className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 transition-all duration-300 ease-in-out sm:px-7 hover:opacity-90"
											style={{
												borderTop: `1px solid ${isDark ? "rgba(46,204,113, 0.2)" : "rgba(52,168,83, 0.2)"}`,
												background: `${isDark ? "rgba(15,25,15, 0.3)" : "rgba(240,255,245, 0.3)"}`,
											}}>
											<div className="flex items-center gap-4">
												<div className="flex h-10 w-10">
													<BoringAvatar
														size={40}
														name={invite.user.username}
														variant="beam"
														colors={generateColorPalette(invite.user._id)}
													/>
												</div>
												<div>
													<p
														className="font-medium"
														style={{
															color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
														}}>
														{invite.team.name}
													</p>
													<p className="text-sm text-muted-foreground">
														Pending invite to{" "}
														<span
															className="font-medium"
															style={{
																color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
															}}>
															{invite.user.username}
														</span>
													</p>
												</div>
											</div>
											<div className="flex gap-2">
												<Button
													variant="outline"
													className="hover:opacity-80 transition-opacity cursor-pointer"
													style={{
														background: `transparent`,
														backdropFilter: "blur(10px)",
														border: `1px solid ${isDark ? "rgba(46,204,113, 0.5)" : "rgba(52,168,83, 0.5)"}`,
														color: `${isDark ? "rgba(144,238,144, 0.9)" : "rgba(22,78,51, 0.9)"}`,
													}}
													onClick={(): Promise<void> => handleCancelInvite(invite._id)}>
													Cancel
												</Button>
											</div>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
