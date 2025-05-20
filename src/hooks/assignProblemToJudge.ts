import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export const assignProblemToJudge = async (userId: string, problemId: string[]): Promise<boolean> => {
	try {
		await axios.post(
			getEndpoint(Endpoints.ASSIGN_PROBLEM),
			{ userId, problemId: problemId }, // Send the judge's userId and selected problemId
			{ withCredentials: true }
		);
		toast.success("Problem assigned successfully");
		window.location.reload();
		return true;
	} catch (error) {
		const e = error as AxiosError<{ message: string }>;

		toast.error(e.response?.data.message ?? "Failed to assign problem.");
		return false;
	}
};
