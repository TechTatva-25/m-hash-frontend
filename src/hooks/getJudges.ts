import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

// Define the Judge interface
export interface Judge {
	_id: string;
	username: string;
	gender: string;
	problem_statement: string[];
}

// Fetch judges as an array
export const fetchJudges = async (): Promise<Judge[] | undefined> => {
	try {
		// Make a GET request to fetch the list of judges
		const response = await axios.get<Judge[]>(getEndpoint(Endpoints.GET_JUDGES), { withCredentials: true });
		return response.data;
	} catch (error) {
		const e = error as AxiosError<{ message: string }>;
		// Display error toast message
		toast.error(e.response?.data.message ?? "Failed to fetch judges.");
		return undefined; // Return undefined on error to handle it gracefully
	}
};
