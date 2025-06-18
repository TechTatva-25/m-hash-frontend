"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/ui/file-uploader";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getProblems, Problem } from "@/hooks/useProblem";
import { SubmissionRecord } from "@/hooks/useSubmission";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

const schema = z.object({
	statement: z.string({ required_error: "Please select a statement" }),
	pptx: z.array(z.instanceof(File)).nonempty("Please upload a PPT"),
	// video: z.array(z.instanceof(File)).optional(),
	video_url: z
		.string()
		.trim()
		.regex(/^https:\/\/[^\s$.?#].[^\s]*$/, {
			message: "Invalid link",
		}),
});

type Schema = z.infer<typeof schema>;

export function SubmitForm({
	setSubmission,
	fakeTeamId,
}: {
	setSubmission: (submission: SubmissionRecord | null) => void;
	fakeTeamId?: string;
}): React.JSX.Element {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			statement: undefined,
			pptx: [],
			// video: [],
			video_url: undefined,
		},
	});

	const [loading, setLoading] = React.useState(false);
	const [isUploading, setIsUploading] = React.useState(false);
	const [progresses, setProgresses] = React.useState<Record<string, number>>({});
	const [statements, setProblems] = React.useState<Problem[]>([]);

	React.useEffect(() => {
		void getProblems().then((problems) => {
			setProblems(problems);
		});
	}, []);

	const statementGroups = React.useMemo(() => {
		const groups: Record<string, typeof statements> = {};

		statements.forEach((statement) => {
			if (!groups[statement.sdg_id]) {
				groups[statement.sdg_id] = [];
			}

			groups[statement.sdg_id].push(statement);
		});

		return groups;
	}, [statements]);

	const fetchSubmission = async (): Promise<void> => {
		try {
			const submission = await axios.get<SubmissionRecord>(getEndpoint(Endpoints.GET_SUBMISSION), {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			setSubmission(submission.data);
		} catch (error) {
			setSubmission(null);
		}
	};

	const onSubmit = (input: Schema): void => {
		setLoading(true);

		// const onUpload = async (file: File, video: File[]): Promise<void> => {
		const onUpload = async (file: File): Promise<void> => {
			setIsUploading(true);
			setProgresses({});
			const formData = new FormData();
			formData.append("file", file);
			// if (video.length) {
			//  formData.append("video", video[0]);
			// }
			formData.append("video_url", input.video_url.trim());
			formData.append("problem_id", input.statement);
			try {
				await axios.post(getEndpoint(Endpoints.MAKE_SUBMISSION), formData, {
					withCredentials: true,
					onUploadProgress: (e) => {
						setProgresses((prev) => {
							return {
								...prev,
								[file.name]: Math.round((e.loaded * 100) / (e.total ?? 1)),
							};
							// return video.length
							//  ? {
							//          ...prev,
							//          [file.name]: Math.round((e.loaded * 100) / (e.total ?? 1)),
							//          [video[0].name]: Math.round((e.loaded * 100) / (e.total ?? 1)),
							//    }
							//  : {
							//          ...prev,
							//          [file.name]: Math.round((e.loaded * 100) / (e.total ?? 1)),
							//    };
						});
					},
				});
				toast.success("Submission uploaded");
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const e = error as AxiosError<{ message: string }>;
					toast.error(e.response?.data.message ?? error.message);
				} else {
					toast.error("Error creating submission");
				}
				form.reset();
			}
		};

		void toast
			// .promise(onUpload(input.pptx[0], input.video?.length ? input.video : []), {
			.promise(onUpload(input.pptx[0]), {
				pending: "Uploading submission...",
				error: "Failed to upload submission",
			})
			.then(() => {
				form.reset();
				setLoading(false);
				setIsUploading(false);
				setProgresses({});
			})
			.catch(() => {
				setLoading(false);
				setIsUploading(false);
				setProgresses({});
			})
			.finally(() => void fetchSubmission());
	};

	return (
		<Card className="relative shadow-md dark:shadow-none">
			<CardHeader className="space-y-1 px-4 sm:px-6">
				<CardTitle className="text-2xl">Make a submission</CardTitle>
				<CardDescription>
					Submit your problem statement, presentation and video below. ProblemStatementID is the
					two-character-long code before the problem statement.
				</CardDescription>
				{fakeTeamId && <CardDescription>Team ID: {fakeTeamId}</CardDescription>}
			</CardHeader>
			<CardContent className="grid gap-4 px-4 pb-6 sm:px-6">
				<Form {...form}>
					{}
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
						<FormField
							control={form.control}
							name="statement"
							render={({ field }): React.JSX.Element => (
								<div className="space-y-6">
									<FormItem className="w-full">
										<FormLabel>Problem Statement</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}>
												<SelectTrigger className="h-14 py-6 text-start">
													<SelectValue placeholder="Select your problem statement" />
												</SelectTrigger>
												<SelectContent className="max-h-[320px] w-[--radix-select-trigger-width]">
													{Object.entries(statementGroups).map(([type, statements]) => (
														<SelectGroup key={type}>
															{statements.map((statement) => (
																<SelectItem
																	showCheck={false}
																	className="cursor-pointer px-4"
																	key={statement._id}
																	value={statement._id.toString()}>
																	<SelectLabel className="flex flex-row items-center overflow-hidden truncate text-ellipsis p-0 py-1.5">
																		<statement.icon className="h-4 w-4" />
																		<div className="ml-4 flex max-w-[95%] flex-col">
																			{statement.title}
																			<span className="line-clamp-1 text-xs text-muted-foreground">
																				{statement.description}
																			</span>
																		</div>
																	</SelectLabel>
																</SelectItem>
															))}
														</SelectGroup>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							)}
						/>
						{/* <div className="flex flex-col justify-start gap-8 md:flex-row"> */}
						<FormField
							control={form.control}
							name="pptx"
							render={({ field }): React.JSX.Element => (
								<div className="flex-grow space-y-6">
									<FormItem className="w-full">
										<FormLabel>PPT</FormLabel>
										<FormControl>
											<FileUploader
												value={field.value}
												onValueChange={field.onChange}
												maxFileCount={1}
												maxSize={10 * 1024 * 1024}
												progresses={progresses}
												accept={{
													"application/vnd.openxmlformats-officedocument.presentationml.presentation":
														[],
													"application/vnd.ms-powerpoint": [],
												}}
												// pass the onUpload function here for direct upload
												// onUpload={uploadFiles}
												disabled={isUploading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							)}
						/>
						{/* <FormField
                                control={form.control}
                                name="video"
                                render={({ field }): React.JSX.Element => (
                                    <div className="flex-grow space-y-6">
                                        <FormItem className="w-full">
                                            <FormLabel>Video (Optional)</FormLabel>
                                            <FormControl>
                                                <FileUploader
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    maxFileCount={1}
                                                    maxSize={10 * 1024 * 1024}
                                                    progresses={progresses}
                                                    accept={{
                                                        "video/mp4": [],
                                                        "video/x-matroska": [],
                                                        "video/avi": [],
                                                        "video/mpeg": [],
                                                        "video/quicktime": [],
                                                    }}
                                                    disabled={isUploading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            /> */}
						<FormField
							control={form.control}
							name="video_url"
							render={({ field }): React.JSX.Element => (
								<div className="flex-grow space-y-6">
									<FormItem className="w-full">
										<FormLabel>Video</FormLabel>
										<FormDescription className="font-bold">
											Upload your video to youtube as UNLISTED or google drive as PUBLIC and enter
											the link here
										</FormDescription>
										<FormControl>
											<Input
												placeholder="Enter youtube or google drive link"
												onChange={field.onChange}
												value={field.value}
												disabled={isUploading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							)}
						/>
						<Button className="w-full" disabled={loading} type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
