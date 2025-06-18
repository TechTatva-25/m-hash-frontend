"use client";
import axios, { AxiosError } from "axios";
import Avatar from "boring-avatars";
import { Eye, File, X } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
// import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Modal } from "@/components/Dashboard/admin/modal";
import { ContentLayout } from "@/components/Dashboard/content-layout";
import { ExportCSVButton } from "@/components/Dashboard/judge/ExportCSVButton";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { Problem } from "@/hooks/useProblem";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface AdminSubmission {
	_id: string;
	team_id: Team;
	problem_id: Problem;
	status: string;
	submission_file_name?: string;
	submission_url?: string;
	createdAt: string;
	submission_video_url?: string;
}

const SubmissionsTable: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
	const [selectedSubmission, setSelectedSubmission] = useState<AdminSubmission | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [showApprovedOnly, setShowApprovedOnly] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [value, setValue] = useState<string | null>(null);
	const sdg_problem_mappping = React.useMemo(() => {
		const mapping = new Map<string, string>();
		submissions.forEach((submission) => {
			mapping.set(submission.problem_id.title, submission.problem_id.title);
		});

		return new Map([...mapping.entries()].sort());
	}, [submissions]);

	const fetchSubmissions = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await axios.get<AdminSubmission[]>(getEndpoint(Endpoints.ADMIN_SUBMISSIONS), {
				withCredentials: true,
			});
			setSubmissions(response.data);
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void fetchSubmissions();
	}, []);

	const openViewModal = (submission: AdminSubmission): void => {
		setSelectedSubmission(submission);
		setIsModalOpen(true);
	};

	// const openVideoModal = (submission: Submission): void => {
	//  setSelectedSubmission(submission);
	//  setVideoModalOpen(true);
	// };

	const closeModal = (): void => {
		setIsModalOpen(false);
		setSelectedSubmission(null);
	};

	const closeVModal = (): void => {
		setVideoModalOpen(false);
		setSelectedSubmission(null);
	};

	const openApproveModal = (submission: AdminSubmission): void => {
		setSelectedSubmission(submission);
		setIsApproveModalOpen(true);
	};

	const closeApproveModal = (): void => {
		setIsApproveModalOpen(false);
		setSelectedSubmission(null);
	};

	const approveSubmission = async (submission: AdminSubmission): Promise<void> => {
		if (!selectedSubmission) return;

		try {
			await axios.post(
				getEndpoint(Endpoints.ADMIN_APPROVE),
				{ submissionId: selectedSubmission._id },
				{ withCredentials: true }
			);
			toast.success("Submission approved successfully!");
			// void fetchSubmissions();

			setSubmissions(
				submissions.map((_submission: AdminSubmission) => {
					if (_submission._id === submission._id) {
						_submission.status = "admin-ap";
					}

					return _submission;
				})
			);
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			closeApproveModal();
		}
	};

	const rejectSubmission = async (submission: AdminSubmission): Promise<void> => {
		if (!selectedSubmission) return;

		try {
			await axios.post(
				getEndpoint(Endpoints.ADMIN_REJECT),
				{ submissionId: selectedSubmission._id },
				{ withCredentials: true }
			);
			toast.success("Submission rejected successfully!");
			// void fetchSubmissions();

			setSubmissions(
				submissions.map((_submission: AdminSubmission) => {
					if (_submission._id === submission._id) {
						_submission.status = "admin-rj";
					}

					return _submission;
				})
			);
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			closeApproveModal();
		}
	};

	const getStatusBadge = (status: string): JSX.Element => {
		const badgeColors: Record<string, string> = {
			"admin-ap": "bg-green-900/80 text-green-300",
			"admin-rj": "bg-red-900/80 text-red-300",
			pending: "bg-yellow-900/80 text-yellow-300",
			"judge-ap": "bg-blue-900/80 text-blue-300",
			"judge-rj": "bg-blue-900/80 text-blue-300",
		};

		const statusDisplay: Record<string, string> = {
			"admin-ap": "Admin Approved",
			"admin-rj": "Admin Rejected",
			pending: "Pending",
			"judge-ap": "Judge Approved",
			"judge-rj": "Judge Rejected",
		};

		return (
			<span className={`rounded px-2 py-1 ${badgeColors[status] || "bg-gray-400 text-white"}`}>
				{statusDisplay[status] || status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	return (
		<ContentLayout title="Judge">
			<div className="w-[100%] py-5">
				<Breadcrumb>
					<BreadcrumbList className="text-[15px]">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Dashboard</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Admin</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Submissions</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="p-6">
				<div className="mb-4 flex w-full justify-between">
					<p className="text-3xl font-semibold">Submissions</p>
					<div className="flex gap-3">
						{submissions.length > 0 && (
							<Popover open={filterOpen} onOpenChange={setFilterOpen}>
								<PopoverTrigger asChild className="min-w-48 lg:min-w-96">
									<Button variant="outline" role="combobox" className="w-[200px] justify-between">
										<span className="truncate">
											{value === null
												? "All Problem Statements"
												: (sdg_problem_mappping.get(value) ?? "All Problem Statements")}
										</span>
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="p-0">
									<Command>
										<CommandInput placeholder="Search Problem Statement" />
										<CommandList>
											<CommandEmpty>No SDG found.</CommandEmpty>
											<CommandGroup className="px-4">
												<CommandItem
													value="all"
													onSelect={(): void => {
														setValue(null);
														setFilterOpen(false);
													}}>
													{/* <Check
                                                        className={`mr-2 h-4 w-4 ${
                                                            value === null ? "text-green-500" : "text-transparent"
                                                        }`}
                                                    /> */}
													All Problem Statements
												</CommandItem>
												{Array.from(sdg_problem_mappping.keys()).map((sdg) => (
													<CommandItem
														key={sdg}
														value={sdg.toString()}
														onSelect={(): void => {
															setValue(sdg.toString());
															setFilterOpen(false);
														}}>
														{/* <Check
                                                            className={`mr-2 h-4 w-4 ${
                                                                value === sdg.toString()
                                                                    ? "text-green-500"
                                                                    : "text-transparent"
                                                            }`}
                                                        /> */}
														{sdg_problem_mappping.get(sdg)}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						)}
						<button
							onClick={(): void => setShowApprovedOnly((prev) => !prev)}
							className={`rounded-lg px-4 py-2 transition-all duration-300 ease-in-out ${
								showApprovedOnly
									? "bg-green-900 text-white hover:bg-green-600"
									: "bg-gray-800 text-white hover:bg-blue-600"
							}`}>
							{showApprovedOnly ? "All Submissions" : "Approved Submissions"}
						</button>
						<ExportCSVButton submissions={submissions} />
					</div>
				</div>

				{loading ? (
					<div className="flex justify-center">
						<BeatLoader />
					</div>
				) : submissions.length > 0 ? (
					<>
						<Table className="w-full table-auto border border-gray-700">
							<TableCaption>List of submissions</TableCaption>
							<TableHeader>
								<TableRow className="">
									<TableHead className="py-2 text-base">Team Name</TableHead>
									{/* <TableHead className="py-2 text-base">Team ID</TableHead> */}
									<TableHead className="py-2 text-base">SDG No</TableHead>
									<TableHead className="py-2 text-base">Problem Title</TableHead>
									<TableHead className="py-2 text-base">Status</TableHead>
									<TableHead className="py-2"></TableHead>
									<TableHead className="py-2"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{submissions
									.filter((submission) =>
										showApprovedOnly ? submission.status === "admin-ap" : true
									)
									.filter((submission) =>
										value === null
											? true
											: submission.problem_id.title.toString() === value.toString()
									)
									.map((submission) => (
										<TableRow key={submission._id} className="border-t">
											<TableCell className="py-2">
												<div className="flex items-center justify-start gap-5">
													<Avatar size={30} name={submission.team_id.name} variant="marble" />
													{submission.team_id.name}
												</div>
											</TableCell>
											{/* <TableCell className="py-2">
                                                {getFakeTeamId(submission.team_id)}
                                            </TableCell> */}
											<TableCell className="py-2">{submission.problem_id.sdg_id}</TableCell>
											<TableCell className="py-2">{submission.problem_id.title}</TableCell>
											<TableCell className="py-2">{getStatusBadge(submission.status)}</TableCell>
											<TableCell className="flex py-2">
												<button
													onClick={(): void => openViewModal(submission)}
													className="mr-2 flex items-center justify-center gap-3 rounded bg-blue-900 px-3 py-2 text-blue-200 hover:bg-blue-500 hover:text-white">
													<File size={18} />
													<p>View PPT</p>
												</button>
												<a
													href={submission.submission_video_url}
													target="_blank"
													rel="noopener noreferrer">
													<button
														// onClick={(): void => {
														//  if (submission.submission_video_url) {
														//      openVideoModal(submission);
														//  }
														// }}
														className={`flex items-center justify-center gap-3 rounded px-3 py-2 ${
															submission.submission_video_url
																? "bg-blue-900 text-blue-200 hover:bg-blue-500 hover:text-white"
																: "cursor-not-allowed bg-gray-400 text-gray-200"
														}`}
														disabled={!submission.submission_video_url}>
														<Eye size={18} />
														<p>View Video</p>
													</button>
												</a>
											</TableCell>
											<TableCell className="py-2">
												<button
													disabled={submission.status === "admin-ap"}
													onClick={(): void => openApproveModal(submission)}
													className={`flex w-[6rem] items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2 text-white transition duration-200 ease-in-out ${
														submission.status === "admin-ap" ? "" : "hover:bg-green-600"
													}`}>
													<span>Accept</span>
												</button>
											</TableCell>
											<TableCell className="py-2">
												<button
													disabled={submission.status === "admin-rj"}
													onClick={(): void => openApproveModal(submission)}
													className={`flex w-[6rem] items-center justify-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-white transition duration-200 ease-in-out ${
														submission.status === "admin-rj" ? "" : "hover:bg-red-600"
													}`}>
													<span>Reject</span>
												</button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>

						{isModalOpen && selectedSubmission && (
							<Modal isOpen={isModalOpen} onClose={closeModal}>
								<div className="mb-4 flex w-full items-center justify-between">
									<h2 className="text-xl font-bold text-white">
										Submission PPT for Team: {selectedSubmission.team_id.name}
									</h2>
									<div className="flex gap-4">
										{selectedSubmission.submission_url && (
											<a
												href={selectedSubmission.submission_url}
												target="_blank"
												rel="noopener noreferrer">
												<Button variant="default" className="font-bold">
													Download
												</Button>
											</a>
										)}
										<button
											onClick={closeModal}
											className="text-xl text-gray-400 hover:text-gray-600">
											<X className="h-9 w-9 text-red-500" />
										</button>
									</div>
								</div>
								{selectedSubmission.submission_url && (
									<iframe
										src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
											selectedSubmission.submission_url
										)}`}
										width="900px"
										height="600px"
										frameBorder="0"
									/>
								)}
							</Modal>
						)}

						{videoModalOpen && selectedSubmission && (
							<Modal isOpen={videoModalOpen} onClose={closeVModal}>
								<div className="mb-4 flex w-full items-center justify-between">
									<h2 className="text-xl font-bold text-white">
										Video for Team: {selectedSubmission.team_id.name}
									</h2>
									<button onClick={closeVModal} className="text-xl text-gray-400 hover:text-gray-600">
										<X className="h-9 w-9 text-red-500" />
									</button>
								</div>
								<video
									src={selectedSubmission.submission_video_url}
									width="100%"
									className="max-w-[900px]"
									controls={true}
								/>
							</Modal>
						)}

						{isApproveModalOpen && selectedSubmission && (
							<Modal isOpen={isApproveModalOpen} onClose={closeApproveModal}>
								<h2 className="mb-4 text-xl font-bold">
									{selectedSubmission.status === "admin-ap"
										? "Reject Submission?"
										: "Approve Submission?"}
								</h2>
								<p>
									Are you sure you want to{" "}
									{selectedSubmission.status === "admin-ap" ? "reject" : "approve"} this submission?
								</p>
								<div className="mt-4">
									<button
										onClick={(): void => {
											if (selectedSubmission.status === "admin-ap") {
												void rejectSubmission(selectedSubmission);
											} else {
												void approveSubmission(selectedSubmission);
											}
										}}
										className={`mr-4 rounded px-4 py-2  ${
											selectedSubmission.status === "admin-ap"
												? "bg-red-900 text-white hover:bg-red-600"
												: "bg-green-900 text-white hover:bg-green-600"
										}`}>
										{selectedSubmission.status === "admin-ap" ? "Reject" : "Approve"}
									</button>

									<button
										onClick={closeApproveModal}
										className="rounded bg-gray-500 px-4 py-2 text-white">
										Cancel
									</button>
								</div>
							</Modal>
						)}
					</>
				) : (
					<p>No submissions found.</p>
				)}
			</div>
		</ContentLayout>
	);
};

export default SubmissionsTable;
