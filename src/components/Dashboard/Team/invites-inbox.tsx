import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { X } from "lucide-react";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/ThemeProvider";
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
	const { theme } = useTheme();
	const isDark = theme === "dark";

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
		<Card
			className="backdrop-blur-md relative overflow-hidden"
			style={{
				background: isDark ? "rgba(30, 41, 59, 0.3)" : "rgba(255, 255, 255, 0.2)",
				border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.5)"}`,
				boxShadow: `0 4px 20px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"}`,
				borderRadius: "16px",
			}}>
			{/* Subtle purple accent overlay */}
			<div
				className="absolute inset-0"
				style={{
					background: isDark
						? "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.02))"
						: "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))",
				}}></div>

			{/* Enhanced inner glow with subtle highlights */}
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(135deg, ${isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.1)"}, transparent)`,
					mixBlendMode: "overlay",
				}}></div>

			<CardHeader className="relative z-10">
				<CardTitle style={{ fontFamily: "var(--font-playfair-display)" }}>Invites Inbox</CardTitle>
				<CardDescription>Manage your invites here.</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10">
				{" "}
				<Tabs defaultValue="incoming">
					<TabsList
						className="flex w-fit flex-row items-center justify-center bg-transparent mb-4"
						style={{
							background: isDark ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.4)",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.5)"}`,
							backdropFilter: "blur(10px)",
						}}>
						<TabsTrigger
							value="incoming"
							className="data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300"
							style={{
								fontFamily: "var(--font-playfair-display)",
								fontWeight: 500,
								color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
							}}>
							Incoming Invites
						</TabsTrigger>
						<TabsTrigger
							value="outgoing"
							className="data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300"
							style={{
								fontFamily: "var(--font-playfair-display)",
								fontWeight: 500,
								color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
							}}>
							Outgoing Join Requests
						</TabsTrigger>
					</TabsList>{" "}
					<TabsContent value="incoming">
						<ScrollArea className="mt-4 h-[420px] overflow-auto overflow-x-hidden pr-2">
							{invites
								.filter((invite) => invite.type === "outgoing")
								.map((invite) => (
									<Card
										key={invite._id}
										className="mb-4 relative overflow-hidden backdrop-blur-sm"
										style={{
											background: isDark ? "rgba(30, 41, 59, 0.2)" : "rgba(255, 255, 255, 0.15)",
											border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.3)"}`,
											boxShadow: `0 2px 10px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
											borderRadius: "12px",
										}}>
										{/* Light glow effect */}
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(255, 255, 255, 0.07)"}, transparent)`,
												mixBlendMode: "overlay",
											}}></div>

										<CardContent className="flex flex-row items-center justify-between px-2 py-3 relative z-10">
											<div className="flex items-center gap-2">
												<div className="relative">
													<BoringAvatar
														variant="marble"
														size={44}
														name={invite.team.name}
														colors={generateColorPalette(invite.team._id)}
													/>
													<div
														className="absolute inset-0 rounded-full blur-sm opacity-50"
														style={{
															background: isDark
																? "rgba(139, 92, 246, 0.2)"
																: "rgba(139, 92, 246, 0.1)",
														}}></div>
												</div>
												<div className="flex flex-col">
													<div
														className="text-lg font-medium"
														style={{ fontFamily: "var(--font-playfair-display)" }}>
														{invite.team.name}
													</div>{" "}
													<p className="text-xs text-muted-foreground">
														Invited by{" "}
														<span className="font-medium">
															{invite.team.team_leader?.username || "team leader"}
														</span>
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button
													disabled={disabled}
													className="h-8 w-8 p-0 disabled:opacity-50 transition-all duration-300 backdrop-blur-sm"
													style={{
														background: isDark
															? "rgba(22, 163, 74, 0.2)"
															: "rgba(22, 163, 74, 0.1)",
														border: `1px solid ${isDark ? "rgba(22, 163, 74, 0.3)" : "rgba(22, 163, 74, 0.2)"}`,
														boxShadow: `0 2px 4px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
													}}
													onClick={(): void => {
														acceptInvite(invite._id);
													}}>
													<FaCheck
														className="h-4 w-4"
														color={isDark ? "#4ade80" : "#16a34a"}
													/>
												</Button>
												<Button
													className="h-8 w-8 p-0 disabled:opacity-50 transition-all duration-300 backdrop-blur-sm"
													style={{
														background: isDark
															? "rgba(220, 38, 38, 0.2)"
															: "rgba(220, 38, 38, 0.1)",
														border: `1px solid ${isDark ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0.2)"}`,
														boxShadow: `0 2px 4px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
													}}
													onClick={(): void => {
														rejectInvite(invite._id);
													}}
													disabled={disabled}>
													<X className="h-4 w-4" color={isDark ? "#f87171" : "#dc2626"} />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
						</ScrollArea>
					</TabsContent>{" "}
					<TabsContent value="outgoing">
						<ScrollArea className="mt-4 h-[420px] overflow-auto overflow-x-hidden pr-2">
							{invites
								.filter((invite) => invite.type === "incoming")
								.map((invite) => (
									<Card
										key={invite._id}
										className="mb-4 relative overflow-hidden backdrop-blur-sm"
										style={{
											background: isDark ? "rgba(30, 41, 59, 0.2)" : "rgba(255, 255, 255, 0.15)",
											border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.3)"}`,
											boxShadow: `0 2px 10px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
											borderRadius: "12px",
										}}>
										{/* Light glow effect */}
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(255, 255, 255, 0.07)"}, transparent)`,
												mixBlendMode: "overlay",
											}}></div>

										<CardContent className="flex flex-row items-center justify-between px-2 py-3 relative z-10">
											<div className="flex items-center gap-3">
												<div className="relative">
													<BoringAvatar
														variant="marble"
														size={44}
														name={invite.team.name}
														colors={generateColorPalette(invite.team._id)}
													/>
													<div
														className="absolute inset-0 rounded-full blur-sm opacity-50"
														style={{
															background: isDark
																? "rgba(139, 92, 246, 0.2)"
																: "rgba(139, 92, 246, 0.1)",
														}}></div>
												</div>
												<div className="flex flex-col">
													<div
														className="text-lg font-medium"
														style={{ fontFamily: "var(--font-playfair-display)" }}>
														{invite.team.name}
													</div>{" "}
													<p className="text-xs text-muted-foreground">
														Waiting for{" "}
														<span className="font-medium">
															{invite.team.team_leader?.username || "team leader"}
														</span>{" "}
														to accept your request.
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button
													className="h-8 w-8 p-0 disabled:opacity-50 transition-all duration-300 backdrop-blur-sm"
													style={{
														background: isDark
															? "rgba(220, 38, 38, 0.2)"
															: "rgba(220, 38, 38, 0.1)",
														border: `1px solid ${isDark ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0.2)"}`,
														boxShadow: `0 2px 4px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.03)"}`,
													}}
													disabled={disabled}
													onClick={(): void => {
														cancelJoinRequest(invite._id);
													}}>
													<X className="h-4 w-4" color={isDark ? "#f87171" : "#dc2626"} />
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
