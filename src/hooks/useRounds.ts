import axios from "axios";
import * as React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

interface Category {
	category_id: string;
	name: string;
	description: string;
	max_score: number;
}

interface Round {
	_id: string;
	name: string;
	categories: Category[];
	visible: boolean;
	considerForFormula: boolean;
	visibleInPresentation: boolean;
}

export const getRounds = async (): Promise<Round[]> => {
	try {
		const response = await axios.get<Round[]>(getEndpoint(Endpoints.GET_ROUNDS), {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		return [];
	}
};

export const useRounds = (): Round[] => {
	const [rounds, setRounds] = React.useState<Round[]>([]);

	React.useEffect(() => {
		void getRounds().then((data) => setRounds(data));
	}, []);

	return rounds;
};
