import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { X } from "lucide-react";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

import { teamPresentState } from "@/atoms/team-present";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export const InvitesInbox: React.FC<{
	setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}> = ({ setTeam }) => {
	const [reload, setReload] = React.useState(false);
	const [disabled, setDisabled] = React.useState(false);
	const [invites, setInvites] = React.useState<Invite[]>([]);
	const [, setRecoilTeamPresent] = useRecoilState(teamPresentState);

	const fetchInvites = async (): Promise<void> => {
		try {
			const invites = await axios.get<Invite[]>(getEndpoint(Endpoints.LIST_INVITES), {
				withCredentials: true,
			});
			setInvites(invites.data);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		fetchInvites();
		return () => {
			// Cleanup function if needed
		};
	}, [reload]);

	const acceptInvite = async (inviteId: string): Promise<void> => {
		try {
			setDisabled(true);
			await axios.post(getEndpoint(Endpoints.ACCEPT_INVITE), { inviteId }, { withCredentials: true });
			toast.success("Invite accepted successfully.");
			const team = await getTeam();
			setTeam(team);
			setRecoilTeamPresent(true);
			setReload((prev) => !prev);
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
		} finally {
			setDisabled(false);
		}
	};

	const rejectInvite = async (inviteId: string): Promise<void> => {
		try {
			setDisabled(true);
			await axios.post(getEndpoint(Endpoints.REJECT_INVITE), { inviteId }, { withCredentials: true });
			toast.success("Invite rejected successfully.");
			setReload((prev) => !prev);
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
		} finally {
			setDisabled(false);
		}
	};

	const cancelJoinRequest = async (inviteId: string): Promise<void> => {
		try {
			setDisabled(true);
			await axios.post(getEndpoint(Endpoints.CANCEL_JOIN_REQUEST), { inviteId }, { withCredentials: true });
			toast.success("Join request cancelled successfully.");
			setReload((prev) => !prev);
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
		} finally {
			setDisabled(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Invites Inbox</CardTitle>
				<CardDescription>Manage your invites here.</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="incoming">
					<TabsList className="flex w-fit flex-row items-center justify-center bg-secondary">
						<TabsTrigger value="incoming">Incoming Invites</TabsTrigger>
						<TabsTrigger value="outgoing">Outgoing Join Requests</TabsTrigger>
					</TabsList>
					<TabsContent value="incoming">
						<ScrollArea className="mt-4 h-[420px] overflow-auto overflow-x-hidden">
							{invites
								.filter((invite) => invite.type === "outgoing")
								.map((invite) => (
									<Card key={invite._id} className="mb-4">
										<CardContent className="flex flex-row items-center justify-between px-2 py-3">
											<div className="flex items-center gap-2">
												<BoringAvatar
													variant="marble"
													size={44}
													name={invite.team.name}
													colors={generateColorPalette(invite.team._id)}
												/>
												<div className="flex flex-col">
													<div className="text-lg font-medium">{invite.team.name}</div>
													<p className="text-xs text-muted-foreground">
														Invited by{" "}
														<span className="font-medium">
															{invite.team.team_leader.username}
														</span>
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button
													disabled={disabled}
													variant="success"
													className="h-8 w-8 p-0 disabled:opacity-50"
													onClick={(): void => {
														acceptInvite(invite._id);
													}}>
													<FaCheck className="h-4 w-4" />
												</Button>
												<Button
													variant="danger"
													onClick={(): void => {
														rejectInvite(invite._id);
													}}
													className="h-8 w-8 p-0 disabled:opacity-50"
													disabled={disabled}>
													<X className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
						</ScrollArea>
					</TabsContent>
					<TabsContent value="outgoing">
						<ScrollArea className="mt-4 h-[420px] overflow-auto overflow-x-hidden">
							{invites
								.filter((invite) => invite.type === "incoming")
								.map((invite) => (
									<Card key={invite._id} className="mb-4">
										<CardContent className="flex flex-row items-center justify-between px-2 py-3">
											<div className="flex items-center gap-3">
												<BoringAvatar
													variant="marble"
													size={44}
													name={invite.team.name}
													colors={generateColorPalette(invite.team._id)}
												/>
												<div className="flex flex-col">
													<div className="text-lg font-medium">{invite.team.name}</div>
													<p className="text-xs text-muted-foreground">
														Waiting for{" "}
														<span className="font-medium">
															{invite.team.team_leader.username}
														</span>{" "}
														to accept your request.
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button
													variant="danger"
													className="h-8 w-8 p-0 disabled:opacity-50"
													disabled={disabled}
													onClick={(): void => {
														cancelJoinRequest(invite._id);
													}}>
													<X className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
						</ScrollArea>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default InvitesInbox;
