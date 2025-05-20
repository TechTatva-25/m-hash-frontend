import React from "react";

import { Team } from "@/hooks/useTeam";

const FAKE_TEAM_ID_LENGTH = 6;

export const getFakeTeamId = async (
	team: Team,
	setFakeTeamId?: React.Dispatch<React.SetStateAction<string>>
): Promise<string> => {
	if (!team._id) {
		return "";
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(team._id);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	const fakeTeamId = hashHex.slice(64 - FAKE_TEAM_ID_LENGTH).toLocaleUpperCase();

	if (setFakeTeamId) {
		setFakeTeamId(fakeTeamId);
	}

	return fakeTeamId;
};

export const useFakeTeamId = (team: Team): string => {
	const [fakeTeamId, setFakeTeamId] = React.useState<string>("");

	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getFakeTeamId(team, setFakeTeamId);
	}, [team]);

	return fakeTeamId;
};
