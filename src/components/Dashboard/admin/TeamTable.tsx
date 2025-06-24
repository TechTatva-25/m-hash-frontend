"use client";
import { ColumnDef, Table } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import type { JSX } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { LuSendHorizontal } from "react-icons/lu";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Modal, ModalBody, ModalHeader } from "@/components/Dashboard/admin/modal";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/header";
import DataTable from "@/components/ui/data-table/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { cn, generateColorPalette } from "@/lib/utils";

import ProgressBadge from "./ProgressBadge";

interface TeamFetchParams {
	offset: number;
	search: string;
	limit: number;
}

interface TeamWithActions extends Team {
	mobile_number?: string;
	actions?: string;
	progress?: string;
	fakeTeamId?: string;
}

const columns: ColumnDef<TeamWithActions>[] = [
	{
		accessorKey: "teamName",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: ({ row }) => (
			<div className="flex items-center justify-center gap-2">
				<div className="flex w-[80%] items-center justify-start gap-3">
					<BoringAvatar
						size={40}
						name={row.original.name}
						variant="marble"
						colors={generateColorPalette(row.original._id)}
					/>
					{row.original.name}
				</div>
			</div>
		),
	},
	{
		accessorKey: "fakeTeamId",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Team ID" />,
		cell: ({ row }) => <div>{row.original.fakeTeamId}</div>,
	},
	{
		accessorKey: "leaderName",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Team Leader" />,
		cell: ({ row }) => (
			<div>
				{row.original.team_leader ? (
					<a href={`tel:${row.original.team_leader.mobile_number || ""}`}>
						{row.original.team_leader.username || "Unknown"}
					</a>
				) : (
					<span>No leader assigned</span>
				)}
			</div>
		),
	},
	{
		accessorKey: "collegeOther",
		header: ({ column }) => <DataTableColumnHeader column={column} title="College" />,
		cell: ({ row }) => (
			<div>{row.original.team_leader ? row.original.team_leader.college || "Unknown" : "No leader assigned"}</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
		cell: ({ row }) => (
			<div>
				{row.original.team_leader ? (
					<a href={`mailto:${row.original.team_leader.email || ""}`}>
						{row.original.team_leader.email || "No email"}
					</a>
				) : (
					<span>No leader assigned</span>
				)}
			</div>
		),
	},
	{
		accessorKey: "progress",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Progress" />,
		cell: ({ row }) => <ProgressBadge status={row.original.progress ?? "Pending"} />,
	},
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }): React.JSX.Element => {
			const [isModalOpen, setIsModalOpen] = useState(false);
			const [mailContent, setMailContent] = useState("");
			const [deleteModal, setDeleteModal] = useState(false);

			const handleSendMail = async (teamId: string): Promise<void> => {
				if (!mailContent.trim()) {
					toast.error("Mail content cannot be empty.");
					return;
				}

				try {
					const response = await axios.post<{ message: string }>(
						getEndpoint(Endpoints.SEND_TEAM_MAIL),
						{ teamId, mail: mailContent },
						{ withCredentials: true }
					);
					toast.success(response.data.message);
					setIsModalOpen(false);
				} catch (error) {
					toast.error((error as AxiosError<{ message: string }>).response?.data.message);
				}
			};

			const handleDeleteTeam = async (teamId: string): Promise<void> => {
				try {
					const response = await fetch(getEndpoint(Endpoints.DTEAM), {
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ teamId }),
					});

					const contentType = response.headers.get("Content-Type");

					if (!response.ok) {
						// If the response is not ok, parse the error message accordingly
						if (contentType?.includes("application/json")) {
							const errorData: { message: string } = await response.json();
							toast.error(errorData.message);
						} else {
							const errorText = await response.text();
							toast.error(errorText);
						}
					} else {
						// Handle success case
						if (contentType?.includes("application/json")) {
							const rrr: { message: string } = await response.json();
							toast.success(rrr.message);
						} else {
							const successText = await response.text();
							toast.success(successText);
							window.location.reload();
						}
						setDeleteModal(false);
					}
				} catch (error) {
					toast.error("An error occurred while deleting the team.");
					console.log(error);
				}
			};

			const handleOpenModal = (): void => {
				setIsModalOpen(true);
			};

			const handleDeleteModal = (): void => {
				setDeleteModal(true);
			};

			const { theme } = useTheme();
			const isDark = theme === "dark";

			return (
				<div className="flex items-center gap-3">
					<Button
						onClick={handleDeleteModal}
						className={`rounded-md cursor-pointer px-4 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98]`}
						style={{
							background: isDark ? "rgba(255, 87, 87, 0.15)" : "rgba(255, 87, 87, 0.2)",
							border: `1px solid ${isDark ? "rgba(255, 87, 87, 0.3)" : "rgba(255, 87, 87, 0.4)"}`,
							color: isDark ? "white" : "#1e293b",
							boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 87, 87, 0.1)"}`,
						}}>
						Delete
					</Button>
					<Button
						onClick={handleOpenModal}
						className={`rounded-md cursor-pointer p-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98]`}
						style={{
							background: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.2)",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
							color: isDark ? "white" : "#1e293b",
							boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(139, 92, 246, 0.1)"}`,
						}}>
						<FaEllipsisVertical />
					</Button>

					{isModalOpen && (
						<Modal
							isOpen={isModalOpen}
							classNames={`backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
								isDark
									? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
									: "bg-gradient-to-br from-white/90 to-slate-50/90 border border-slate-200/50"
							}`}
							onClose={(): void => setIsModalOpen(false)}>
							<ModalHeader>
								<div className="flex w-full items-center justify-between p-4">
									<p className={`text-lg font-medium ${isDark ? "text-white" : "text-slate-800"}`}>
										{row.original.name}
									</p>
									<button
										onClick={(): void => setIsModalOpen(false)}
										className={`rounded-full p-1.5 transition-all duration-200 ${
											isDark
												? "hover:bg-slate-700/70 text-slate-400 hover:text-white"
												: "hover:bg-slate-200/70 text-slate-500 hover:text-slate-800"
										}`}>
										<X className="h-4 w-4" />
									</button>
								</div>
								{/* Accent line */}
								<div
									className="mx-4 h-[1px]"
									style={{
										background: `linear-gradient(to right, transparent, ${
											isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"
										}, transparent)`,
									}}></div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col items-start justify-start gap-5 p-4">
									{/* Textarea for typing the email */}
									<div
										className={`flex w-full items-stretch justify-center gap-3 rounded-xl p-2 ${
											isDark ? "bg-slate-800/50" : "bg-white/50"
										} backdrop-blur-sm border ${
											isDark ? "border-slate-700/50" : "border-slate-200/50"
										}`}>
										<textarea
											value={mailContent}
											onChange={(e): void => setMailContent(e.target.value)}
											className={`w-full resize-none rounded-md border-none p-2 outline-none ${
												isDark
													? "bg-slate-800/50 text-white placeholder:text-slate-400"
													: "bg-white/50 text-slate-900 placeholder:text-slate-500"
											}`}
											placeholder="Type your email here..."
											rows={2}
										/>

										<Button
											onClick={() => handleSendMail(row.original._id)}
											className={`rounded-md cursor-pointer px-4 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98]`}
											style={{
												background: isDark
													? "rgba(139, 92, 246, 0.15)"
													: "rgba(139, 92, 246, 0.2)",
												border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
												color: isDark ? "white" : "#1e293b",
												boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(139, 92, 246, 0.1)"}`,
											}}>
											<LuSendHorizontal />
										</Button>
									</div>

									{/* Team members list */}
									<ScrollArea
										className={`mt-4 flex max-h-[12rem] w-full flex-col items-start justify-start rounded-lg ${
											isDark
												? "bg-slate-800/40 border border-slate-700/50"
												: "bg-white/40 border border-slate-200/50"
										} backdrop-blur-sm`}>
										{row.original.members.map((member, index) => (
											<div
												key={member._id}
												className={`flex w-[100%] items-center justify-start gap-5 p-4 ${
													isDark ? "text-white" : "text-slate-800"
												} ${
													index === row.original.members.length - 1
														? ""
														: isDark
															? "border-b border-slate-700/50"
															: "border-b border-slate-200/50"
												}`}>
												<BoringAvatar
													size={40}
													name={member.username}
													variant="beam"
													colors={generateColorPalette(member._id)}
												/>
												<div className="flex flex-col items-start justify-start">
													<span
														className={`text-lg ${isDark ? "text-white" : "text-slate-800"}`}>
														{member.username}
													</span>
													<span
														className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
														{member.email}
													</span>
												</div>
											</div>
										))}
									</ScrollArea>
								</div>
							</ModalBody>
						</Modal>
					)}
					{deleteModal && (
						<Modal
							isOpen={deleteModal}
							classNames={`backdrop-blur-xl rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
								isDark
									? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
									: "bg-gradient-to-br from-white/90 to-slate-50/90 border border-slate-200/50"
							}`}
							onClose={(): void => setDeleteModal(false)}>
							<ModalHeader>
								<div className="flex w-full items-center justify-between p-4">
									<p className={`text-lg font-medium ${isDark ? "text-white" : "text-slate-800"}`}>
										Confirm DELETION of Team: {row.original.name}
									</p>
									<button
										onClick={(): void => setDeleteModal(false)}
										className={`rounded-full p-1.5 transition-all duration-200 ${
											isDark
												? "hover:bg-slate-700/70 text-slate-400 hover:text-white"
												: "hover:bg-slate-200/70 text-slate-500 hover:text-slate-800"
										}`}>
										<X className="h-4 w-4" />
									</button>
								</div>
								{/* Accent line */}
								<div
									className="mx-4 h-[1px]"
									style={{
										background: `linear-gradient(to right, transparent, ${
											isDark ? "rgba(255, 87, 87, 0.3)" : "rgba(255, 87, 87, 0.5)"
										}, transparent)`,
									}}></div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col items-start justify-start gap-5 p-4">
									<p className={`text-left ${isDark ? "text-slate-300" : "text-slate-700"}`}>
										Are you sure you want to exercise your admin authority and delete the team? This
										action cannot be undone. If the team has already made a submission it will also
										be permanently deleted.
									</p>
									<div className="flex w-full items-center justify-between gap-5 mt-2">
										<Button
											onClick={(): void => setDeleteModal(false)}
											className={`rounded-md cursor-pointer px-6 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98] w-full`}
											style={{
												background: isDark
													? "rgba(255, 87, 87, 0.15)"
													: "rgba(255, 87, 87, 0.2)",
												border: `1px solid ${isDark ? "rgba(255, 87, 87, 0.3)" : "rgba(255, 87, 87, 0.4)"}`,
												color: isDark ? "white" : "#1e293b",
												boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 87, 87, 0.1)"}`,
											}}>
											Cancel
										</Button>
										<Button
											onClick={() => handleDeleteTeam(row.original._id)}
											className={`rounded-md cursor-pointer px-6 py-2 font-medium backdrop-blur-md transition-all duration-300 hover:opacity-90 active:scale-[0.98] w-full`}
											style={{
												background: isDark
													? "rgba(139, 92, 246, 0.15)"
													: "rgba(139, 92, 246, 0.2)",
												border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
												color: isDark ? "white" : "#1e293b",
												boxShadow: `0 2px 8px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(139, 92, 246, 0.1)"}`,
											}}>
											Confirm
										</Button>
									</div>
								</div>
							</ModalBody>
						</Modal>
					)}
				</div>
			);
		},
	},
];

const TeamTable = (): JSX.Element => {
	const [fetchProps, setFetchProps] = useState<TeamFetchParams>({
		offset: 0,
		search: "",
		limit: 500,
	});
	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState<TeamWithActions[]>([]);
	const [, setTable] = useState<Table<TeamWithActions> | undefined>(undefined);
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchTeams = async (reset = false): Promise<void> => {
		try {
			setLoading(true);
			setIsLoading(true);
			const teamsResponse = await axios.get<{
				teams: Team[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_TEAMS), {
				withCredentials: true,
				params: {
					team_name: fetchProps.search,
					limit: fetchProps.limit,
					offset: reset ? 0 : fetchProps.offset,
				},
			});
			const teams = teamsResponse.data.teams;
			const teamsWithActions = await Promise.all(
				teams.map(async (team) => ({
					...team,
					fakeTeamId: await getFakeTeamId(team),
					actions: "",
				}))
			);
			reset ? setTeams(teamsWithActions) : setTeams((prev) => [...prev, ...teamsWithActions]);
			setFetchProps({ ...fetchProps, offset: teamsResponse.data.offset + teamsResponse.data.limit });
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			setLoading(false);
			setIsLoading(false);
		}
	};

	const debouncedFetchTeams = useCallback(
		debounce(async () => {
			setTeams([]);
			await fetchTeams(true);
		}, 500),
		[fetchProps.search]
	);

	useEffect(() => {
		if (loading) return;
		void debouncedFetchTeams();
		return (): void => {
			debouncedFetchTeams.cancel();
		};
	}, [fetchProps.search, debouncedFetchTeams]);

	return (
		<div className="relative">
			{/* Glass panel container */}
			<div
				className={cn(
					"p-6 rounded-xl overflow-hidden",
					"bg-opacity-80 backdrop-blur-lg shadow-md",
					isDark ? "bg-slate-900/60 border border-slate-800" : "bg-white/70 border border-slate-200"
				)}>
				{/* Purple gradient overlay */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))"
							: "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.05))",
					}}></div>

				<div className="relative flex w-[100%] items-end justify-between mb-6">
					<div>
						<p
							className={cn("text-2xl font-semibold", isDark ? "text-white" : "text-slate-800")}
							style={{ fontFamily: "var(--font-playfair-display)" }}>
							Teams
						</p>
					</div>
					<Input
						placeholder="Enter team name"
						value={fetchProps.search}
						onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
						className={cn(
							"w-[20%] min-w-[10rem]",
							"backdrop-blur-sm border",
							isDark
								? "bg-slate-800/40 border-slate-700 text-white placeholder:text-slate-400"
								: "bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-500"
						)}
					/>
				</div>
				<div className="relative">
					<DataTable
						columns={columns}
						data={teams}
						setTable={setTable}
						pagination
						classNames={cn(
							"overflow-auto",
							isDark
								? "border border-slate-700 bg-slate-900/30 backdrop-blur-sm"
								: "border border-slate-200 bg-white/40 backdrop-blur-sm"
						)}
					/>
					{loading && (
						<div
							className={`my-6 flex items-center justify-center rounded-xl p-4 ${
								isDark
									? "bg-slate-800/40 border border-slate-700/50"
									: "bg-white/40 border border-slate-200/50"
							} backdrop-blur-sm`}>
							<div className="flex flex-col items-center gap-2">
								<BeatLoader color={isDark ? "#a457f7" : "#8b5cf6"} size={12} />
								<p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
									Loading teams...
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeamTable;
