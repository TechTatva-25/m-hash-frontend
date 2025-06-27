"use client";

import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoWarning } from "react-icons/io5";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import { SubmitForm } from "@/components/Dashboard/Submit/form-uploader";
import { Spinner } from "@/components/Dashboard/Submit/loader";
import { useTheme } from "@/components/ThemeProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useFakeTeamId } from "@/hooks/useFakeTeamId";
import { getProblem, Problem } from "@/hooks/useProblem";
import { useSession } from "@/hooks/useSession";
import useSubmission from "@/hooks/useSubmission";
import { useTeam } from "@/hooks/useTeam";

export default function SubmitPage(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();
	const team = useTeam();
	const fakeTeamId = useFakeTeamId(team);
	const { submission, submissionLoaded, deleteSubmission, setSubmission, setSubmissionLoaded } = useSubmission();
	const [problemStatement, setProblemStatement] = React.useState<Problem>();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	React.useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}
	}, [session]);

	React.useEffect(() => {
		if (!team.loading && !team._id) {
			router.push("/dashboard");
			return;
		}
	}, [team]);

	React.useEffect(() => {
		if (submission?.problem_id) {
			getProblem(submission.problem_id)
				.then((problem) => {
					setProblemStatement(problem);
				})
				.catch((error) => {
					console.error("Error fetching problem statement:", error);
				});
		}
	}, [submission]);

	return (
		<ContentLayout title="Dashboard">
			<section className="flex flex-1 flex-col py-4 sm:py-8">
				<Breadcrumb>
					<BreadcrumbList
						className="text-[15px] p-2 rounded-md backdrop-blur-sm"
						style={{
							background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.2)",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 6px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.02)"}`,
						}}>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/" className="transition-colors hover:text-purple-500">
									Home
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/dashboard" className="transition-colors hover:text-purple-500">
									Dashboard
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage
								className="font-semibold"
								style={{
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(79, 70, 229, 0.8)",
								}}>
								Submit
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{team.team_leader._id === session?.user?._id && team.members.length === 1 && (
					<Alert variant="warning" className="mt-10 bg-yellow-500/10">
						<IoWarning className="h-6 w-6" color="#eab308" />
						<AlertTitle className="ml-2">Members Required</AlertTitle>
						<AlertDescription className="ml-2">
							You are the only member of this team. Please invite at least one more member to be able to
							make a submission and be eligible for Round 1.
						</AlertDescription>
					</Alert>
				)}
				{!submissionLoaded ? (
					<div className="flex h-[70vh] items-center justify-center">
						{" "}
						<Spinner className="text-white" size="large" />
					</div>
				) : (
					<div className="my-10 flex h-full w-full flex-col">
						{submission ? (
							<div className="flex flex-col space-y-4">
								<div className="flex flex-col space-y-2">
									<div className="flex flex-row items-center justify-between">
										<h2 className="text-xl font-semibold">Submission Details</h2>
										{/* <Button
                                            variant="danger"
                                            className="font-bold"
                                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                            onClick={async (): Promise<void> => {
                                                setSubmissionLoaded(false);
                                                await deleteSubmission(submission._id);
                                                setSubmissionLoaded(true);
                                            }}>
                                            Delete
                                        </Button> */}
									</div>
									<div className="flex flex-col space-y-2">
										<div>
											<span className="font-semibold">Problem Statement:</span>{" "}
											{problemStatement ? problemStatement.title : ""}
										</div>
										<div>
											<span className="font-semibold">Team Name:</span> {team.name}
										</div>
										<div>
											<span className="font-semibold">Team ID:</span> {fakeTeamId}
										</div>
										{submission.status && (
											<div className="font-semibold">
												<span>Status:</span> {submission.status}
											</div>
										)}
										<div>
											<span className="font-semibold">Submitted At:</span>{" "}
											{moment(submission.createdAt).format("LLL")}
										</div>
										<div>
											<span className="font-semibold">PPT:</span>{" "}
											<a
												href={submission.submission_url}
												target="_blank"
												rel="noopener noreferrer">
												<span className="underline">Click to download</span>
											</a>
										</div>
										<div>
											<span className="font-semibold">Video:</span>{" "}
											<a
												href={submission.submission_video_url}
												target="_blank"
												rel="noopener noreferrer">
												<span className="underline">{submission.submission_video_url}</span>
											</a>
										</div>
									</div>
								</div>
								<div className="flex flex-col space-y-2">
									<h2 className="text-lg font-semibold">Submission PPT Preview:</h2>
									<iframe
										src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
											submission.submission_url
										)}`}
										width="100%"
										height="600px"
										frameBorder="0"
									/>
									{/* {submission.submission_video_url ? (
                                        <video src={submission.submission_video_url} width="100%" controls={true} />
                                    ) : (
                                        <></>
                                    )} */}
								</div>
								<Button
									variant="danger"
									className="mt-16 font-bold"
									onClick={async (): Promise<void> => {
										setSubmissionLoaded(false);
										await deleteSubmission(submission._id);
										setSubmissionLoaded(true);
									}}>
									Delete Submission
								</Button>
							</div>
						) : (
							<SubmitForm setSubmission={setSubmission} fakeTeamId={fakeTeamId} />
						)}
					</div>
				)}
			</section>
		</ContentLayout>
	);
}