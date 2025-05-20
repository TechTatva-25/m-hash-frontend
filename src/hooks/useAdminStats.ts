import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface Stats {
	loading: boolean;
	users: {
		total: number;
		male: number;
		female: number;
		other: number;
	};
	teams: number;
	submissions: number;
	colleges: number;
	teamsByDate: { key: string; count: number }[];
	usersByDate: { key: string; count: number }[];
	teamCountByCollege: { key: string; count: number }[];
	userCountByCollege: { key: string; count: number }[];
	teamCountByState: { key: string; count: number }[];
	userCountByState: { key: string; count: number }[];
	teamCollegeCountByState: { key: string; count: number }[];
	userCollegeCountByState: { key: string; count: number }[];
}

const initStats = {
	loading: true,
	users: { total: 0, male: 0, female: 0, other: 0 },
	teams: 0,
	submissions: 0,
	colleges: 0,
	teamsByDate: [],
	usersByDate: [],
	teamCountByCollege: [],
	userCountByCollege: [],
	teamCountByState: [],
	userCountByState: [],
	teamCollegeCountByState: [],
	userCollegeCountByState: [],
};

const fetchStats = async (): Promise<Stats> => {
	try {
		const response = await axios.get<Stats>(getEndpoint(Endpoints.GET_ADMIN_STATS), { withCredentials: true });
		return response.data;
	} catch (error) {
		const e = error as AxiosError<{ message: string }>;
		toast.error(e.response?.data.message);
		return { ...initStats };
	}
};

export const useAdminStats = (): Stats => {
	const [stats, setStats] = React.useState<Stats>({ ...initStats });

	React.useEffect(() => {
		void fetchStats().then((stats) => {
			stats.loading = false;
			setStats(stats);
		});
	}, []);

	return stats;
};
