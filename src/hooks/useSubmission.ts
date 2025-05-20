import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface SubmissionRecord {
	_id: string;
	problem_id: string;
	team_id: string;
	submission_url: string;
	submission_video_url?: string;
	status: "PENDING" | "ACCEPTED" | "REJECTED";
	createdAt: Date;
	updatedAt: Date;
	teamName?: string;
}

export default function useSubmission(): {
	submission: SubmissionRecord | null;
	submissionLoaded: boolean;
	deleteSubmission: (submissionId: string) => Promise<void>;
	setSubmission: (submission: SubmissionRecord | null) => void;
	setSubmissionLoaded: (value: boolean) => void;
} {
	const [submission, setSubmission] = React.useState<SubmissionRecord | null>(null);
	const [submissionLoaded, setSubmissionLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		void getSubmission().then((submission) => {
			setSubmission(submission);
			setSubmissionLoaded(true);
		});
	}, []);

	const getSubmission = async (): Promise<SubmissionRecord | null> => {
		try {
			const response = await axios.get<SubmissionRecord>(getEndpoint(Endpoints.GET_SUBMISSION), {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			return null;
		}
	};

	const deleteSubmission = async (submissionId: string): Promise<void> => {
		try {
			await axios.delete(getEndpoint(Endpoints.DELETE_SUBMISSION), {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					submission_id: submissionId,
				},
			});
			toast.success("Submission deletion successful");
			setSubmission(null);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const e = error as AxiosError<{ message: string }>;
				toast.error(e.response?.data.message ?? error.message);
			} else {
				toast.error("Error deleting submission");
			}
		}
	};

	return { submission, submissionLoaded, deleteSubmission, setSubmission, setSubmissionLoaded };
}
