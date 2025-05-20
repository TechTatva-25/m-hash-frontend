import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

interface LeaderboardRecord {
	name: string;
	score: number;
	bugs: number;
}

interface Leaderboard {
	teams: LeaderboardRecord[];
}

const initLeaderboard: Leaderboard = { teams: [] };

const fetchLeaderboard = async (): Promise<Leaderboard> => {
	try {
		const response = await axios.get<Leaderboard>(getEndpoint(Endpoints.GET_HOMEPAGE_LEADERBOARD));
		return response.data;
	} catch (error) {
		const e = error as AxiosError<{ message: string }>;
		toast.error(e.response?.data.message);
		return initLeaderboard;
	}
};

export const useHomepageLeaderboard = (): Leaderboard => {
	const [leaderboard, setLeaderboard] = React.useState<Leaderboard>(initLeaderboard);

	React.useEffect(() => {
		void fetchLeaderboard().then((res: Leaderboard) => {
			setLeaderboard(res);
		});
	}, []);

	return leaderboard;
};
