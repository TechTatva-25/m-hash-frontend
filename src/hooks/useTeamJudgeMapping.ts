import axios from "axios";
import * as React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export const getTeamJudgeMapping = async (): Promise<Record<string, string[]>> => {
	const response = await axios.get<{ teamJudges: Record<string, string[]> }>(
		getEndpoint(Endpoints.GET_TEAM_JUDGE_MAPPING),
		{
			withCredentials: true,
		}
	);

	return response.data.teamJudges;
};

export default function useTeamJudgeMapping(
	teamJudgeMapping: Record<string, string[]>,
	setTeamJudgeMapping: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
): Record<string, string[]> {
	React.useEffect(() => {
		void getTeamJudgeMapping().then((mapping) => {
			setTeamJudgeMapping(mapping);
		});
	}, []);

	return teamJudgeMapping;
}
