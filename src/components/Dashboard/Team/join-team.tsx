import axios, { AxiosError } from "axios";
import debounce from "lodash.debounce";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import AvatarCircles from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

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
}): React.JSX.Element => (
	<Card className="mb-4">
		<CardContent className="grid gap-2 p-3 sm:p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<AvatarCircles
						avatarOptions={team.members.map((member) => ({
							name: member.username,
							url: member._id,
						}))}
						numPeople={0}
						boringAvatars
					/>
					<div className="text-lg font-medium">{team.name}</div>
				</div>
				<Badge variant="secondary" className="hidden sm:flex">
					<FaUsers className="mr-2" />
					<span className="text-xs">{team.members.length}/5 members</span>
				</Badge>
			</div>
			<p className="text-sm tracking-tight text-muted-foreground">
				{team.members.map((member) => `${member.username}`).join(", ")}
			</p>
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={(): Promise<void> => handleJoinTeam(team._id)}
				disabled={disabled}
				variant="secondary"
				className="mt-2 disabled:cursor-not-allowed">
				Send Join Request
			</Button>
		</CardContent>
	</Card>
);

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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Join Team</CardTitle>
				<CardDescription>Join a team by entering the team name.</CardDescription>
			</CardHeader>
			<CardContent className="px-2 sm:px-6">
				<Input
					placeholder="Enter team name"
					value={fetchProps.search}
					onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
				/>
				<ScrollArea className="mt-4 h-[420px] overflow-auto overflow-x-hidden">
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
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
