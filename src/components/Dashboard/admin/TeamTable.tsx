"use client";
import { ColumnDef, Table } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Modal, ModalBody, ModalHeader } from "@/components/Dashboard/admin/modal";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/header";
import DataTable from "@/components/ui/data-table/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

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
				<a href={`tel:${row.original.team_leader.mobile_number}`}>{row.original.team_leader.username}</a>
			</div>
		),
	},
	{
		accessorKey: "collegeOther",
		header: ({ column }) => <DataTableColumnHeader column={column} title="College" />,
		cell: ({ row }) => <div>{row.original.team_leader.college}</div>,
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
		cell: ({ row }) => (
			<div>
				<a href={`mailto:${row.original.team_leader.email}`}>{row.original.team_leader.email}</a>
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
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							const errorData: { message: string } = await response.json();
							toast.error(errorData.message);
						} else {
							const errorText = await response.text();
							toast.error(errorText);
						}
					} else {
						// Handle success case
						if (contentType?.includes("application/json")) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

			return (
				<div className="flex items-center gap-3">
					<Button onClick={handleDeleteModal}>Delete</Button>
					<Button onClick={handleOpenModal} variant="ghost" className="mt-2">
						<FaEllipsisVertical />
					</Button>

					{isModalOpen && (
						<Modal
							isOpen={isModalOpen}
							classNames="bg-gray-800  border-2 border-gray-500"
							onClose={(): void => setIsModalOpen(false)}>
							<ModalHeader>
								<div className="flex w-full items-center justify-between p-3">
									<p className="text-gray-300">{row.original.name}</p>
									<button
										onClick={(): void => setIsModalOpen(false)}
										className="text-red-500 hover:bg-none hover:text-white">
										<X />
									</button>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col items-start justify-start gap-5">
									{/* Textarea for typing the email */}
									<div className="flex w-full items-stretch justify-center gap-3 rounded-xl bg-zinc-900 p-2">
										<textarea
											value={mailContent}
											onChange={(e): void => setMailContent(e.target.value)}
											className="w-full resize-none rounded-md border-none bg-zinc-900 p-2 text-white outline-none"
											placeholder="Type your email here..."
											rows={1} // Set the number of rows for the textarea
										/>

										<Button
											// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
											onClick={() => handleSendMail(row.original._id)} // Send email when clicked
											className="bg-zinc-800 text-white hover:bg-zinc-600">
											<LuSendHorizonal />
										</Button>
									</div>

									{/* Add the ScrollArea for team members */}
									<ScrollArea className="mt-4 flex max-h-[12rem] w-full flex-col items-start justify-start rounded-lg border-2 bg-[#0B1739]">
										{row.original.members.map((member, index) => (
											<div
												key={member._id}
												className={`flex w-[100%] items-center justify-start gap-5 p-4 text-white ${
													index === row.original.members.length - 1 ? "" : "border-b-2"
												}`}>
												<BoringAvatar
													size={40}
													name={row.original.name}
													variant="marble"
													colors={generateColorPalette(row.original._id)}
												/>
												<div className="flex flex-col items-start justify-start">
													<span className="text-lg">{member.username}</span>
													<span className="text-sm text-gray-500">{member.email}</span>
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
							classNames="bg-gray-800 border-2 border-gray-500"
							onClose={(): void => setDeleteModal(false)}>
							<ModalHeader>
								<div className="flex w-full items-center justify-between p-3">
									<p className="text-gray-300">Confirm DELETION of Team name: {row.original.name}</p>
									<button
										onClick={(): void => setDeleteModal(false)}
										className="text-red-500 hover:bg-none hover:text-white">
										<X />
									</button>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col items-start justify-start gap-5">
									<p className="text-left text-gray-300">
										Are you sure you want to exercise your admin authority and delete the team? This
										action cannot be undone. If the team has already made a submission it will also
										be permanently deleted.
									</p>
									<div className="flex w-full items-center justify-between gap-5">
										<Button
											onClick={(): void => setDeleteModal(false)}
											variant="ghost"
											className="bg-red-500 text-white">
											Cancel
										</Button>
										<Button
											// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
											onClick={() => handleDeleteTeam(row.original._id)}
											variant="ghost"
											className="bg-green-500 text-white">
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

const TeamsTable: React.FC = () => {
	const [fetchProps, setFetchProps] = useState<TeamFetchParams>({
		offset: 0,
		search: "",
		limit: 500,
	});
	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState<TeamWithActions[]>([]);
	const [, setTable] = useState<Table<TeamWithActions> | undefined>(undefined);

	const fetchTeams = async (reset = false): Promise<void> => {
		try {
			setLoading(true);
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
		<>
			<div className="flex w-[100%] items-end justify-between">
				<div>
					<p className="text-2xl font-semibold">Teams</p>
				</div>
				<Input
					placeholder="Enter team name"
					value={fetchProps.search}
					onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
					className="w-[20%] min-w-[10rem] text-black dark:bg-[#27264E] dark:text-white"
				/>
			</div>
			<div className="mt-4">
				<DataTable
					columns={columns}
					data={teams}
					setTable={setTable}
					pagination
					classNames="border-2 overflow-auto"
				/>
				{loading && (
					<div className="my-10 flex items-center justify-center text-center">
						<BeatLoader color="#a457f7" size={12} />
					</div>
				)}
			</div>
		</>
	);
};

export default TeamsTable;
