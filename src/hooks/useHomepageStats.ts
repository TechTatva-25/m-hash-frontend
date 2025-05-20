import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface Stats {
	loading: boolean;
	users: number;
	teams: number;
	submissions?: number;
	colleges?: number;
}

const initStats = {
	loading: true,
	users: 0,
	teams: 0,
	submissions: 0,
	colleges: 0,
};

const fetchStats = async (): Promise<Stats> => {
	try {
		const response = await axios.get<Stats>(getEndpoint(Endpoints.GET_HOMEPAGE_STATS));
		return response.data;
	} catch (error) {
		const e = error as AxiosError<{ message: string }>;
		toast.error(e.response?.data.message);
		return { ...initStats };
	}
};

export const useHomepageStats = (): Stats => {
	const [stats, setStats] = React.useState<Stats>({ ...initStats });

	React.useEffect(() => {
		void fetchStats().then((stats) => {
			stats.loading = false;
			setStats(stats);
		});
	}, []);

	return stats;
};
