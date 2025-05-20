import axios from "axios";
import * as React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface College {
	_id: string;
	name: string;
	state: string;
}

export const getColleges = async (): Promise<College[]> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const response = await axios.get<College[]>(getEndpoint(Endpoints.GET_COLLEGES), {});

		const Colleges = response.data;

		return Colleges;
	} catch (error) {
		return [];
	}
};

export const useCollege = (): College[] => {
	const [colleges, setColleges] = React.useState<College[]>([]);

	React.useEffect(() => {
		void getColleges().then((colleges) => {
			setColleges(colleges);
		});
	}, []);

	return colleges;
};
