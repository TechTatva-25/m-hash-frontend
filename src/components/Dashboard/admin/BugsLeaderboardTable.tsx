"use client";
import { ColumnDef, Table } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { LuSave, LuUndo } from "react-icons/lu";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Modal, ModalBody, ModalHeader } from "@/components/Dashboard/admin/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/header";
import DataTable from "@/components/ui/data-table/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { BugRecord, Team } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

// import ProgressBadge from "./ProgressBadge";

interface TeamFetchParams {
	offset: number;
	search: string;
	limit: number;
}

interface handleUpdateProps {
	teamId: string;
	scoreIp?: string;
	restoreIdx?: number;
}

interface TeamWithActions extends Team {
	mobile_number?: string;
	actions?: string;
	progress?: string;
	fakeTeamId?: string;
	bugs: BugRecord[];
	deployed: boolean;
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
	// {
	//  accessorKey: "leaderName",
	//  header: ({ column }) => <DataTableColumnHeader column={column} title="Team Leader" />,
	//  cell: ({ row }) => (
	//      <div>
	//          <a href={`tel:${row.original.team_leader.mobile_number}`}>{row.original.team_leader.username}</a>
	//      </div>
	//  ),
	// },
	// {
	//  accessorKey: "collegeOther",
	//  header: ({ column }) => <DataTableColumnHeader column={column} title="College" />,
	//  cell: ({ row }) => <div>{row.original.team_leader.collegeOther}</div>,
	// },
	{
		accessorKey: "Deployed",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Deployed" />,
		cell: ({ row }) => (
			<div>
				<Checkbox
					checked={row.original.deployed}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={async (e): Promise<void> => {
						try {
							const response = await axios.post<{ message: string }>(
								getEndpoint(Endpoints.UPDATE_TEAM_DEPLOY_STATUS),
								{
									teamId: row.original._id,
									deployed: (e.target as HTMLInputElement).getAttribute("aria-checked") === "false",
								},
								{ withCredentials: true }
							);
							toast.success(response.data.message);

							window.location.reload();
						} catch (error) {
							toast.error((error as AxiosError<{ message: string }>).response?.data.message);
						}
					}}
				/>
			</div>
		),
	},
	{
		accessorKey: "Score",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
		cell: ({ row }) => <div>{row.original.bugs.length ? row.original.bugs[0]?.score : "0"}</div>,
	},
	// {
	//  accessorKey: "Bug Count",
	//  header: ({ column }) => <DataTableColumnHeader column={column} title="Bug Count" />,
	//  cell: ({ row }) => <div>{row.original.bugs.length ? row.original.bugs[0].bug_count : "0"}</div>,
	// },
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }): React.JSX.Element => {
			const [isModalOpen, setIsModalOpen] = useState(false);
			const [score, setScore] = useState("");

			const handleUpdate = async ({ teamId, scoreIp, restoreIdx }: handleUpdateProps): Promise<void> => {
				const _score = parseInt(scoreIp ? scoreIp : score);

				if (!restoreIdx && isNaN(_score)) {
					toast.error("Invalid score");
					return;
				}

				// if (isNaN(_bugcount) || _bugcount < 0) {
				//  toast.error("Invalid bug count");
				//  return;
				// }

				try {
					const response = await axios.post<{ message: string }>(
						getEndpoint(Endpoints.UPDATE_BUG_ROUND_SCORE),
						{ teamId, score: _score, restoreIdx: restoreIdx },
						{ withCredentials: true }
					);
					toast.success(response.data.message);
					setIsModalOpen(false);

					window.location.reload();
				} catch (error) {
					toast.error((error as AxiosError<{ message: string }>).response?.data.message);
				}
			};

			const handleOpenModal = (): void => {
				setIsModalOpen(true);
			};

			return (
				<div className="flex items-center gap-3">
					<Button onClick={handleOpenModal} variant="ghost" className="mt-2">
						<FaPencil />
					</Button>

					{isModalOpen && (
						<Modal
							isOpen={isModalOpen}
							classNames="bg-gray-800  border-2 border-gray-500"
							onClose={(): void => setIsModalOpen(false)}>
							<ModalHeader>
								<div className="flex w-full items-center justify-between p-3">
									<p className="text-gray-300">Update score for team: {row.original.name}</p>
									<button
										onClick={(): void => setIsModalOpen(false)}
										className="text-red-500 hover:bg-none hover:text-white">
										<X />
									</button>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-full flex-col items-start justify-start gap-5">
									<div className="flex w-full items-stretch justify-center gap-3 rounded-xl bg-zinc-900 p-2">
										<Input
											placeholder="Enter score"
											value={score}
											onChange={(e): void => setScore(e.target.value.trim())}
											className="w-[20%] min-w-[10rem] text-black dark:bg-[#27264E] dark:text-white"
										/>
										{/* <Input
                                            placeholder="Enter bug count"
                                            value={bugcount}
                                            onChange={(e): void => setBugcount(e.target.value.trim())}
                                            className="w-[20%] min-w-[10rem] text-black dark:bg-[#27264E] dark:text-white"
                                        /> */}

										<Button
											// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
											onClick={() => handleUpdate({ teamId: row.original._id })}
											className="bg-zinc-800 text-white hover:bg-zinc-600">
											<LuSave />
										</Button>
									</div>

									<ScrollArea className="mt-4 flex max-h-[12rem] w-full flex-col items-start justify-start rounded-lg border-2 bg-[#0B1739]">
										{row.original.bugs.map((bug, index) => (
											<div
												key={index}
												className={`flex w-[100%] items-center justify-between gap-5 p-4 text-white ${
													index === row.original.members.length - 1 ? "" : "border-b-2"
												}`}>
												<div className="flex flex-col items-start justify-start">
													<span className="text-lg">
														{index === 0 ? "Current score" : "Past score"}: {bug.score}
													</span>
													{/* <span className="text-sm">Bug Count: {bug.bug_count}</span> */}
													<span className="text-sm">
														Updated at:{" "}
														{bug.updatedAt ? moment(bug.updatedAt).format("LLL") : ""}
													</span>
												</div>
												{index !== 0 ? (
													<Button
														// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
														onClick={() =>
															handleUpdate({
																teamId: row.original._id,
																restoreIdx: index,
															})
														}
														className="bg-zinc-800 text-white hover:bg-zinc-600">
														<LuUndo />
													</Button>
												) : (
													<></>
												)}
											</div>
										))}
										{row.original.bugs.length !== 0 && (
											<div
												key={1000}
												className={`flex w-[100%] items-center justify-between gap-5 p-4 text-white ${
													row.original.bugs.length === row.original.members.length - 1
														? ""
														: "border-b-2"
												}`}>
												<div className="flex flex-col items-start justify-start">
													<span className="text-lg">Reset</span>
												</div>
												<Button
													// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
													onClick={() =>
														handleUpdate({
															teamId: row.original._id,
															restoreIdx: -1,
														})
													}
													className="bg-zinc-800 text-white hover:bg-zinc-600">
													<LuUndo />
												</Button>
											</div>
										)}
									</ScrollArea>
								</div>
							</ModalBody>
						</Modal>
					)}
				</div>
			);
		},
	},
];

const BugsLeaderboardTable: React.FC = () => {
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
			}>(getEndpoint(Endpoints.LIST_TEAMS_WITH_BUG_ROUND), {
				withCredentials: true,
				params: {
					team_name: fetchProps.search,
					limit: fetchProps.limit,
					offset: reset ? 0 : fetchProps.offset,
				},
			});
			const teams = teamsResponse.data.teams.sort((a, b) => a.name.localeCompare(b.name));
			const teamsWithActions = await Promise.all(
				teams.map(async (team) => ({
					...team,
					fakeTeamId: await getFakeTeamId(team),
					actions: "",
					bugs: team.bugs ?? [],
					deployed: team.deployed ?? false,
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
					<p className="text-2xl font-semibold">Bug Round Leaderboard</p>
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
					pageSize={50}
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

export default BugsLeaderboardTable;
