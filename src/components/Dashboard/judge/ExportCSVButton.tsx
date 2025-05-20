import { format } from "date-fns";
import { FC } from "react";
import { CSVLink } from "react-csv";
import { FaFileUpload } from "react-icons/fa";

// import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { AdminSubmission } from "@/app/dashboard/admin/submissions/page";
interface ExportCSVButtonProps {
	submissions: AdminSubmission[];
}

export const ExportCSVButton: FC<ExportCSVButtonProps> = ({ submissions }) => {
	// export const ExportCSVButton: FC<ExportCSVButtonProps> = async ({ submissions }) => {
	const csvData =
		// const csvData = await Promise.all(
		submissions.map((submission) => ({
			// submissions.map(async (submission) => ({
			team_name: submission.team_id.name || "",
			// team_id: (await getFakeTeamId(submission.team_id)) || "",
			sdg_id: submission.problem_id.sdg_id || "",
			sdg_title: submission.problem_id.sdg_title || "",
			problem_statement_title: submission.problem_id.title || "",
			ppt_filename: submission.submission_file_name,
			video_url: submission.submission_video_url,
			status: submission.status,
			created_at: format(new Date(submission.createdAt), "yyyy-MM-dd HH:mm:ss"),
			ppt_url: submission.submission_url,
		}));

	const headers = [
		{ label: "Team Name", key: "team_name" },
		// { label: "Team ID", key: "team_id" },
		{ label: "SDG ID", key: "sdg_id" },
		{ label: "SDG Title", key: "sdg_title" },
		{ label: "Problem Statement", key: "problem_statement_title" },
		{ label: "PPT Filename", key: "ppt_filename" },
		{ label: "Video URL", key: "video_url" },
		{ label: "Status", key: "status" },
		{ label: "Created At", key: "created_at" },
		{ label: "PPT URL", key: "ppt_url" },
	];

	return (
		<CSVLink
			data={csvData}
			headers={headers}
			filename={"submissions.csv"}
			className="flex items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600">
			Export CSV
			<FaFileUpload className="ml-2 inline-block" />
		</CSVLink>
	);
};
