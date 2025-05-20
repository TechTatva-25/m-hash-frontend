import axios from "axios";
import React from "react";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface Progress {
	_id: string;
	stage: string;
	team: string;
	completed: boolean;
	disqualified: boolean;
	createdAt: Date;
	updatedAt: Date;
	loading?: boolean;
}

export interface Stage {
	_id: string;
	name: string;
	stage: string;
	description: string;
	active: boolean;
	start_date: Date;
	end_date: Date;
	createdAt: Date;
	updatedAt: Date;
}

export const getStages = async (): Promise<Stage[]> => {
	try {
		const response = await axios.get<Stage[]>(getEndpoint(Endpoints.GET_STAGES), {
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

export const getProgress = async (): Promise<Progress> => {
	try {
		const response = await axios.get<Progress>(getEndpoint(Endpoints.GET_PROGRESS), {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return { ...response.data, loading: false };
	} catch (error) {
		return {
			_id: "",
			stage: "",
			team: "",
			completed: false,
			disqualified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			loading: false,
		};
	}
};

export const useProgress = (): Progress => {
	const [progress, setProgress] = React.useState<Progress>({
		_id: "",
		stage: "",
		team: "",
		completed: false,
		disqualified: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		loading: true,
	});

	React.useEffect(() => {
		setProgress((prev) => ({ ...prev, loading: true }));
		void getProgress().then((progress) => {
			setProgress(progress);
		});
	}, []);

	return progress;
};
