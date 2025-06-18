"use client";

import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useApprovedTeams from "@/hooks/useApprovedSubmissions";
import { useRounds } from "@/hooks/useRounds";
import { useSession } from "@/hooks/useSession";
import { JudgeScore } from "@/hooks/useTeam";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

interface TeamScore {
	_id: string;
	scores: JudgeScore[];
}

const Judge = (): React.JSX.Element => {
	const session = useSession();
	const [searchTerm, setSearchTerm] = useState("");
	const { teams } = useApprovedTeams();
	const [scores, setScores] = useState<TeamScore[]>([]);
	const rounds = useRounds();
	const router = useRouter();

	useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}

		if (!(session?.user?.role === "judge")) {
			router.push("/dashboard");
		}
	}, [session]);

	const saveScore = async (team_id: string, round_id: string, category_id: string, score: number): Promise<void> => {
		if (!session?.user) return;

		try {
			await axios.post(
				getEndpoint(Endpoints.UPDATE_SCORE),
				{
					team_id,
					round_id,
					category_id,
					score,
					judge_id: session.user._id,
				},
				{
					withCredentials: true,
				}
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const e = error as AxiosError<{ message: string }>;
				toast.error(e.response?.data.message ?? error.message);
			} else {
				toast.error("Error creating submission");
			}
		}
	};

	const getScoreIndex = (team_id: string): number => {
		const team = scores.find((team) => team._id === team_id);
		if (team) {
			for (let i = 0; i < team.scores.length; i++) {
				if (team.scores[i].judge_id === session?.user?._id) {
					return i;
				}
			}
		}
		return -1;
	};

	React.useEffect(() => {
		if (!session?.user || session.loading) return;

		setScores(
			teams.map((team) => {
				const default_score = rounds.map((round) => ({
					round_id: round._id,
					category_scores: round.categories.map((category) => ({
						category_id: category.category_id,
						score: 0,
					})),
				}));
				let idx = -1;

				for (let i = 0; i < team.judge_score.length; i++) {
					if (team.judge_score[i].judge_id === session.user?._id) {
						idx = i;
						break;
					}
				}

				if (!team.judge_score || team.judge_score.length === 0 || idx === -1) {
					return {
						_id: team._id,
						scores: [{ judge_id: "", scores: default_score }],
					};
				}
				const judge_scores = [];
				for (const judge_score of team.judge_score) {
					const scores = judge_score.scores.map((score) => ({
						round_id: score.round_id,
						category_scores: score.category_scores,
					}));
					for (const round of rounds) {
						if (!scores.find((score) => score.round_id === round._id)) {
							scores.push({
								round_id: round._id,
								category_scores: round.categories.map((category) => ({
									category_id: category.category_id,
									score: 0,
								})),
							});
						}
						// if some categories are missing in the judge_score then add them with 0 score
						for (const score of scores) {
							for (const category of round.categories) {
								if (!score.category_scores.find((c) => c.category_id === category.category_id)) {
									score.category_scores.push({
										category_id: category.category_id,
										score: 0,
									});
								}
							}
						}
					}

					judge_scores.push({ judge_id: judge_score.judge_id, scores });
				}
				return { _id: team._id, scores: judge_scores };
			})
		);
	}, [teams, rounds, session]);

	const updateScore = (
		team_id: string,
		round_id: string,
		category_id: string,
		_score: string,
		maxscore: number
	): void => {
		let score: number;

		if (_score.length === 0) {
			score = 0;

			return;
		}

		score = parseFloat(_score);

		if (isNaN(score)) {
			toast.error("Invalid score");

			return;
		} else if (score > maxscore) {
			toast.error(`Score must be less than or equal to ${maxscore}`);

			return;
		}

		const newScores = scores.map((team) => {
			if (team._id === team_id) {
				const idx = getScoreIndex(team_id);
				const newRounds = team.scores[idx === -1 ? 0 : idx].scores.map((round) => {
					if (round.round_id === round_id) {
						const newCategories = round.category_scores.map((category) => {
							if (category.category_id === category_id) {
								return { ...category, score };
							}
							return category;
						});
						return { ...round, category_scores: newCategories };
					}
					return round;
				});
				return { ...team, scores: [{ judge_id: "", scores: newRounds }] };
			}
			return team;
		});
		setScores(newScores);
		void saveScore(team_id, round_id, category_id, score);
	};

	const getScore = (team_id: string, round_id: string, category_id: string): number => {
		const team = scores.find((team) => team._id === team_id);
		if (team) {
			const idx = getScoreIndex(team_id);
			const round = team.scores[idx === -1 ? 0 : idx].scores.find((round) => round.round_id === round_id);
			if (round) {
				const category = round.category_scores.find((category) => category.category_id === category_id);
				if (category) {
					return category.score;
				}
			}
		}
		return 0;
	};

	const totalRoundScore = (team_id: string, round_id: string): number => {
		const team = scores.find((team) => team._id === team_id);
		if (team) {
			const idx = getScoreIndex(team_id);
			const round = team.scores[idx === -1 ? 0 : idx].scores.find((round) => round.round_id === round_id);
			if (round) {
				return round.category_scores.reduce((acc, curr) => acc + curr.score, 0);
			}
		}
		return 0;
	};

	// const totalScore = (team_id: string): number => {
	//  const team = scores.find((team) => team._id === team_id);
	//  if (team) {
	//      const idx = getScoreIndex(team_id);
	//      return team.scores[idx === -1 ? 0 : idx].scores.reduce(
	//          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	//          (acc, curr) => acc + curr.category_scores.reduce((acc, curr) => acc + curr.score, 0),
	//          0
	//      );
	//  }
	//  return 0;
	// };

	const filteredTeams = useMemo(() => {
		return teams
			.filter(
				(team) =>
					team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
					((session?.user?.problem_statement ?? []).length === 0 ||
						(session?.user?.problem_statement ?? []).includes(team.problemId))
			)
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [teams, searchTerm, session]);

	return (
		<ContentLayout title="Rounds Scoreboard">
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
							<BreadcrumbPage className="font-semibold">Judge</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Rounds Scoreboard</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="container mx-auto max-w-7xl p-4">
				<div className="relative mb-4">
					<Input
						type="text"
						placeholder="Search teams..."
						value={searchTerm}
						onChange={(e): void => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
				</div>
				{session?.user && (
					<div className="overflow-hidden rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead rowSpan={2} className="min-w-[240px] text-center">
										Team
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Problem Statement ID
									</TableHead>
									{rounds
										.filter((round) => round.visible)
										.map((round) => (
											<TableHead
												key={round._id}
												colSpan={round.categories.length + 1}
												className="border-x text-center">
												Round: {round.name}
											</TableHead>
										))}
									{/* <TableHead rowSpan={2} className="min-w-[110px] text-center">
                                        Total
                                    </TableHead> */}
								</TableRow>
								<TableRow className="hover:bg-transparent">
									{rounds
										.filter((round) => round.visible)
										.map((round) => (
											<>
												{round.categories.map((category) => (
													<TableHead
														key={`${round.name}-${category.name}`}
														className="min-w-[110px] border-x text-center">
														{category.name}
														<br />
														<span className="text-xs text-gray-400">
															(Max: {category.max_score})
														</span>
													</TableHead>
												))}
												<TableHead className="min-w-[110px] border-x text-center">
													Round Total
												</TableHead>
											</>
										))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredTeams.map((team) => (
									<TableRow key={team._id}>
										<TableCell className="pl-5 font-medium">
											<div className="flex items-center space-x-4">
												<BoringAvatar
													name={team.name}
													variant="marble"
													size={32}
													colors={generateColorPalette(team._id)}
												/>
												<span>{team.name}</span>
											</div>
										</TableCell>
										<TableCell className="text-center">
											{}
											{(team.problemTitle ?? "G1 ").split(" ")[0]}
										</TableCell>
										{rounds
											.filter((round) => round.visible)
											.map((round) => (
												<>
													{round.categories.map((category) => (
														<TableCell
															key={`${team._id}-${round.name}-${category.name}`}
															className="text-center">
															<Input
																type="number"
																min={0}
																max={category.max_score}
																value={getScore(
																	team._id,
																	round._id,
																	category.category_id
																)}
																onChange={(e): void =>
																	updateScore(
																		team._id,
																		round._id,
																		category.category_id,
																		e.target.value,
																		category.max_score
																	)
																}
																className="w-18 text-center"
															/>
														</TableCell>
													))}
													<TableCell className="text-center font-bold">
														{totalRoundScore(team._id, round._id).toFixed(2)}
													</TableCell>
												</>
											))}
										{/* <TableCell className="text-center font-bold">
                                            {totalScore(team._id).toFixed(2)}
                                        </TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</ContentLayout>
	);
};

export default Judge;
