import axios, { AxiosError } from "axios";
import debounce from "lodash.debounce";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import AvatarCircles from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { useTheme } from "@/components/ThemeProvider";

interface TeamFetchParams {
	offset: number;
	search: string;
	limit: number;
}

const TeamCard = ({
	team,
	disabled,
	handleJoinTeam,
}: {
	team: Team;
	disabled: boolean;
	handleJoinTeam: (teamId: string) => Promise<void>;
}): React.JSX.Element => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Card
			className="mb-4 group relative backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
			style={{
				background: isDark
					? "linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))"
					: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(241, 245, 249, 0.9))",
				boxShadow: `
					0 10px 30px ${isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.08)"}, 
					0 0 0 1px ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)"}
				`,
				border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)"}`,
			}}>
			{/* Subtle background gradient effect */}
			<div
				className="absolute inset-0 rounded-xl -z-10"
				style={{
					background: isDark
						? "linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
						: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))",
				}}></div>

			{/* Accent edge */}
			<div className="absolute inset-0 rounded-xl overflow-hidden">
				<div
					className="absolute top-0 left-0 right-0 h-[1px]"
					style={{
						background: `linear-gradient(to right, transparent, ${isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"}, transparent)`,
					}}></div>
				<div
					className="absolute bottom-0 left-0 right-0 h-[1px]"
					style={{
						background: `linear-gradient(to right, transparent, ${isDark ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.4)"}, transparent)`,
					}}></div>
			</div>

			{/* Enhanced inner glow with subtle highlights */}
			<div
				className="absolute inset-0 rounded-xl"
				style={{
					background: `linear-gradient(to bottom right, ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.15)"}, transparent)`,
					mixBlendMode: "overlay",
				}}></div>

			<CardContent className="grid gap-2 p-3 sm:p-6 relative z-10">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<AvatarCircles
							avatarOptions={team.members.map((member) => ({
								name: member.username,
								url: member._id,
							}))}
							numPeople={0}
							boringAvatars
							isUser={true} // This indicates these are user avatars
						/>
						<div className="text-lg font-medium">{team.name}</div>
					</div>
					<Badge
						className="hidden sm:flex backdrop-blur-xl"
						variant="secondary"
						style={{
							background: isDark
								? "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(79, 70, 229, 0.15))"
								: "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(79, 70, 229, 0.2))",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 10px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"}`,
						}}>
						<FaUsers className="mr-2 h-4 w-4" />
						<span className="text-xs">{team.members.length}/5 members</span>
					</Badge>
				</div>
				<p className="text-sm tracking-tight text-muted-foreground">
					{team.members.map((member) => `${member.username}`).join(", ")}
				</p>

				{/* Simple glassmorphic button */}
				<button
					onClick={(): Promise<void> => handleJoinTeam(team._id)}
					disabled={disabled}
					className="mt-2 w-full rounded-md cursor-pointer px-4 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
					style={{
						background: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.2)",
						border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
						color: isDark ? "white" : "#1e293b",
						boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(139, 92, 246, 0.1)"}`,
					}}>
					Send Join Request
				</button>
			</CardContent>
		</Card>
	);
};

export default function JoinTeam(): React.JSX.Element {
	const [fetchProps, setFetchProps] = React.useState<TeamFetchParams>({
		offset: 0,
		search: "",
		limit: 200,
	});
	const [hasMore, setHasMore] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [disabled, setDisabled] = React.useState(false);
	const [teams, setTeams] = React.useState<Map<string, Team>>(new Map());

	const fetchTeams = async (reset = false): Promise<void> => {
		try {
			const teams = await axios.get<{
				teams: Team[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_TEAMS), {
				withCredentials: true,
				params: {
					team_name: fetchProps.search,
					limit: fetchProps.limit,
					offset: reset ? 0 : fetchProps.offset,
				},
			});
			const teamsMap = new Map(teams.data.teams.map((team) => [team._id, team]));
			reset ? setTeams(teamsMap) : setTeams((prev) => new Map([...prev, ...teamsMap]));
			setFetchProps({ ...fetchProps, offset: teams.data.offset + teams.data.limit });
			setHasMore(teams.data.hasMore);
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchTeams = React.useCallback(
		debounce(async () => {
			setTeams(new Map());
			await fetchTeams(true);
		}, 500),
		[fetchProps.search]
	);

	const handleJoinTeam = async (teamId: string): Promise<void> => {
		try {
			setDisabled(true);
			const response = await axios.post<{ message: string }>(
				getEndpoint(Endpoints.SEND_JOIN_REQUEST),
				{ teamId },
				{ withCredentials: true }
			);
			toast.success(response.data.message);
		} catch (error) {
			toast.error((error as AxiosError<{ message: string }>).response?.data.message);
		} finally {
			setDisabled(false);
		}
	};

	React.useEffect(() => {
		if (loading) return;
		void debouncedFetchTeams();
		return (): void => {
			debouncedFetchTeams.cancel();
		};
	}, [fetchProps.search, debouncedFetchTeams]);

	// Access theme context to adapt component to light/dark mode
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Card
			className="group relative backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
			style={{
				background: isDark
					? "linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))"
					: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(241, 245, 249, 0.9))",
				boxShadow: `
					0 10px 30px ${isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.08)"}, 
					0 0 0 1px ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)"}
				`,
				border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)"}`,
			}}>
			{/* Subtle background gradient effect */}
			<div
				className="absolute inset-0 rounded-xl -z-10"
				style={{
					background: isDark
						? "linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
						: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))",
				}}></div>

			{/* Accent edge */}
			<div className="absolute inset-0 rounded-xl overflow-hidden">
				<div
					className="absolute top-0 left-0 right-0 h-[1px]"
					style={{
						background: `linear-gradient(to right, transparent, ${isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"}, transparent)`,
					}}></div>
				<div
					className="absolute bottom-0 left-0 right-0 h-[1px]"
					style={{
						background: `linear-gradient(to right, transparent, ${isDark ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.4)"}, transparent)`,
					}}></div>
			</div>

			{/* Enhanced inner glow with subtle highlights */}
			<div
				className="absolute inset-0 rounded-xl"
				style={{
					background: `linear-gradient(to bottom right, ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.15)"}, transparent)`,
					mixBlendMode: "overlay",
				}}></div>

			{/* Light beam effect on hover */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out rounded-xl overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
			</div>

			<CardHeader className="relative z-10">
				<div className="relative inline-block mb-4">
					<CardTitle
						className="text-3xl font-bold text-[hsl(var(--foreground))]"
						style={{ fontFamily: "var(--font-playfair-display)" }}>
						Join Team
					</CardTitle>

					{/* Clean underlines */}
					<div className="absolute -bottom-2 left-0 h-1 w-[100%] bg-[hsl(var(--foreground))] rounded-full"></div>
					<div className="absolute -bottom-4 left-0 h-[0.5px] w-[100%] bg-[hsl(var(--foreground))]/60 rounded-full"></div>
				</div>
				<CardDescription className="text-[hsl(var(--foreground))]/80">
					Join a team by entering the team name.
				</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10 px-2 pb-2 sm:px-6 sm:pb-6">
				<Input
					placeholder="Enter team name"
					value={fetchProps.search}
					onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
					className="mb-4 backdrop-blur-lg"
					style={{
						background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.6)",
						border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
					}}
				/>
				<ScrollArea
					className="mt-2 h-[420px] overflow-auto overflow-x-hidden rounded-md"
					style={{
						background: isDark
							? "linear-gradient(to bottom right, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))"
							: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
						backdropFilter: "blur(12px)",
						WebkitBackdropFilter: "blur(12px)",
						boxShadow: `inset 0 0 0 1px ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)"}`,
					}}>
					<div className="p-4">
						{Array.from(teams.values()).map((team) => (
							<TeamCard key={team._id} team={team} disabled={disabled} handleJoinTeam={handleJoinTeam} />
						))}
						<InfiniteScroll hasMore={hasMore} isLoading={loading} next={fetchTeams}>
							{hasMore && (
								<div className="my-10 flex items-center justify-center text-center">
									<BeatLoader color="#a457f7" size={12} />
								</div>
							)}
						</InfiniteScroll>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
