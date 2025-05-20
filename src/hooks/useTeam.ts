import axios from "axios";
import React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { User } from "./useSession";

export interface BugRecord {
	score: number;
	bug_count: 0;
	updatedAt: string;
}

export interface CategoryScore {
	category_id: string;
	score: number;
}

export interface TeamRound {
	round_id: string;
	category_scores: CategoryScore[];
}

export interface JudgeScore {
	judge_id: string;
	scores: TeamRound[];
}

export interface Team {
	_id: string;
	name: string;
	members: User[];
	team_leader: User;
	college: string;
	judge_score: JudgeScore[];
	collegeOther?: string;
	createdAt: Date | string | number;
	updatedAt: Date;
	loading?: boolean;
	progress?: string;
	deployed: boolean;
	bugs?: BugRecord[];
}

export const getTeam = async (): Promise<Team> => {
	try {
		const response = await axios.get<Team>(getEndpoint(Endpoints.GET_TEAM), {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { ...response.data, loading: false };
	} catch (error) {
		return {
			_id: "",
			name: "",
			members: [],
			team_leader: {} as User,
			judge_score: [],
			college: "",
			createdAt: new Date(),
			updatedAt: new Date(),
			loading: false,
			deployed: false,
		};
	}
};

export const useTeam = (): Team => {
	const [team, setTeamState] = React.useState<Team>({
		_id: "",
		name: "",
		members: [],
		team_leader: {} as User,
		college: "",
		judge_score: [],
		createdAt: new Date(),
		updatedAt: new Date(),
		loading: true,
		deployed: false,
	});

	React.useEffect(() => {
		setTeamState((prev) => ({ ...prev, loading: true }));
		void getTeam().then((team) => {
			setTeamState(team);
		});
	}, []);

	return team;
};
