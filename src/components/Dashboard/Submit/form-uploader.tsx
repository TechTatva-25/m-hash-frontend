"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { useTheme } from "@/components/ThemeProvider";
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
	const { theme } = useTheme();
	const isDark = theme === "dark";

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
			// Add cloud_name parameter to ensure Cloudinary upload works correctly
			formData.append("cloud_name", "auto");
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
		<Card 
			className="relative shadow-md dark:shadow-none"
			style={{
				background: `${isDark ? 'rgba(30, 30, 40, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`,
				backdropFilter: "blur(10px)",
				border: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.3)' : 'rgba(132, 95, 220, 0.3)'}`,
				boxShadow: `0 4px 24px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(103, 80, 164, 0.1)'}`
			}}>
			<CardHeader 
				className="space-y-1 px-4 sm:px-6"
				style={{
					borderBottom: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.2)' : 'rgba(132, 95, 220, 0.2)'}`
				}}>
				<CardTitle 
					className="text-2xl"
					style={{ color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}` }}>
					Make a submission
				</CardTitle>
				<CardDescription
					style={{ color: `${isDark ? 'rgba(200, 180, 240, 0.7)' : 'rgba(103, 80, 164, 0.7)'}` }}>
					Submit your problem statement, presentation and video below. ProblemStatementID is the
					two-character-long code before the problem statement.
				</CardDescription>
				{fakeTeamId && 
					<CardDescription
						style={{ color: `${isDark ? 'rgba(200, 180, 240, 0.7)' : 'rgba(103, 80, 164, 0.7)'}` }}>
						Team ID: {fakeTeamId}
					</CardDescription>
				}
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
												<SelectTrigger 
													className="h-14 py-6 text-start cursor-pointer"
													style={{
														background: `${isDark ? 'rgba(40, 40, 50, 0.3)' : 'rgba(250, 250, 255, 0.3)'}`,
														backdropFilter: "blur(8px)",
														border: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.3)' : 'rgba(132, 95, 220, 0.3)'}`,
														boxShadow: `0 2px 10px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(103, 80, 164, 0.1)'}`,
														color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}`
													}}>
													<SelectValue placeholder="Select your problem statement" />
												</SelectTrigger>
												<SelectContent 
													className="max-h-[320px] w-[--radix-select-trigger-width]"
													style={{
														background: `${isDark ? 'rgba(40, 40, 50, 0.7)' : 'rgba(250, 250, 255, 0.7)'}`,
														backdropFilter: "blur(10px)",
														border: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.3)' : 'rgba(132, 95, 220, 0.3)'}`,
														boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(103, 80, 164, 0.2)'}`
													}}>
													{Object.entries(statementGroups).map(([type, statements]) => (
														<SelectGroup key={type}>
															{statements.map((statement) => (
																<SelectItem
																	showCheck={false}
																	className={`
																		cursor-pointer px-4 
																		focus:bg-transparent focus:ring-0 
																		data-[highlighted]:bg-transparent data-[highlighted]:ring-0 
																		transition-all duration-200
																		hover:${isDark ? 'bg-purple-800/20' : 'bg-purple-300/20'}
																	`}
																	style={{
																		background: "transparent",
																		marginBottom: "2px",
																	}}
																	key={statement._id}
																	value={statement._id.toString()}>
																	<SelectLabel 
																		className="flex flex-row items-center overflow-hidden truncate text-ellipsis p-0 py-1.5">
																		{statement.icon ? (
																			<div
																				className="flex items-center justify-center rounded-full p-1"
																				style={{
																					background: `${isDark ? 'rgba(103, 80, 164, 0.2)' : 'rgba(132, 95, 220, 0.1)'}`,
																				}}>
																				<statement.icon 
																					className="h-4 w-4" 
																					style={{
																						color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}`
																					}}
																				/>
																			</div>
																		) : (
																			<div className="h-4 w-4" />
																		)}
																		<div className="ml-4 flex max-w-[95%] flex-col">
																			<span style={{
																				color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}`
																			}}>
																				{statement.title}
																			</span>
																			<span 
																				className="line-clamp-1 text-xs"
																				style={{
																					color: `${isDark ? 'rgba(200, 180, 240, 0.7)' : 'rgba(103, 80, 164, 0.7)'}`
																				}}>
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
												className="h-11 py-6"
												style={{
													background: `${isDark ? 'rgba(40, 40, 50, 0.3)' : 'rgba(250, 250, 255, 0.3)'}`,
													backdropFilter: "blur(8px)",
													border: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.3)' : 'rgba(132, 95, 220, 0.3)'}`,
													boxShadow: `0 2px 10px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(103, 80, 164, 0.1)'}`,
													color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}`
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							)}
						/>
						<Button 
							className="w-full cursor-pointer transition-opacity hover:opacity-90" 
							disabled={loading} 
							type="submit"
							style={{
								background: `${isDark ? 'rgba(103, 80, 164, 0.8)' : 'rgba(132, 95, 220, 0.8)'}`,
								color: `${isDark ? 'rgba(240, 240, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)'}`,
								border: `1px solid ${isDark ? 'rgba(140, 110, 200, 0.5)' : 'rgba(150, 120, 230, 0.5)'}`,
								boxShadow: `0 4px 12px ${isDark ? 'rgba(40, 40, 50, 0.4)' : 'rgba(103, 80, 164, 0.3)'}`
							}}>
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
