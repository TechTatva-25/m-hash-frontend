import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { Team } from "./useTeam";

interface ApprovedTeam extends Team {
	problemTitle: string;
	sdg_id: number;
	problemId: string;
	showInPresentation?: boolean;
}

export default function useApprovedTeams(): {
	teams: ApprovedTeam[];
	teamsLoaded: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
} {
	const [teams, setTeams] = React.useState<ApprovedTeam[]>([]);
	const [reload, setReload] = React.useState(false);
	const [teamsLoaded, setTeamsLoaded] = React.useState(false);

	React.useEffect(() => {
		setTeamsLoaded(false);
		void axios
			.get<ApprovedTeam[]>(getEndpoint(Endpoints.APPROVED_TEAMS), {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setTeams(response.data);
				setTeamsLoaded(true);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					const e = error as AxiosError<{ message: string }>;
					toast.error(e.response?.data.message ?? error.message);
				} else {
					toast.error("Error deleting submission");
				}
			});
	}, [reload]);

	return { teams, teamsLoaded, setReload };
}
