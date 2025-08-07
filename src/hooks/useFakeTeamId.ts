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

	// Check if we're on the client side and crypto.subtle is available
	if (typeof window === "undefined" || !window.crypto?.subtle) {
		return "";
	}

	try {
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
	} catch (error) {
		console.error("Error generating fake team ID:", error);
		return "";
	}
};

export const useFakeTeamId = (team: Team): string => {
	const [fakeTeamId, setFakeTeamId] = React.useState<string>("");

	React.useEffect(() => {
		// Only run on client side
		if (typeof window !== "undefined") {
			getFakeTeamId(team, setFakeTeamId);
		}
	}, [team]);

	return fakeTeamId;
};
