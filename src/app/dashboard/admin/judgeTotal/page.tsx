"use client";

import axios from "axios";
import BoringAvatar from "boring-avatars";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FC } from "react";
import { CSVLink } from "react-csv";
import { FaFileUpload } from "react-icons/fa";

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
import { BugRecord } from "@/hooks/useTeam";
import useTeamJudgeMapping from "@/hooks/useTeamJudgeMapping";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

interface TeamScore {
	_id: string;
	scores: JudgeScore[];
	bugs?: BugRecord[];
}

interface AvgDenominatorConfig {
	value1: number;
	value2: number;
}

interface ExportTeam {
	name: string;
	judgingRoundTotal: string;
	bugRoundTotal: number;
	grandTotal: string;
	sdg_id: number;
	problemTitle: string;
	judgingAndBugTotalScore: string;
	presentationRound: string;
}

interface ExportCSVButtonProps {
	teams: ExportTeam[];
}

export const ExportCSVButton: FC<ExportCSVButtonProps> = ({ teams }) => {
	const csvData = teams.map((team) => ({
		team_name: team.name || "",
		sdgId: team.sdg_id,
		problemTitle: team.problemTitle,
		judgingRoundTotal: team.judgingRoundTotal,
		bugRoundTotal: team.bugRoundTotal,
		judgingAndBugTotalScore: team.judgingAndBugTotalScore,
		presentationRound: team.presentationRound,
		grandTotal: team.grandTotal,
	}));

	const headers = [
		{ label: "Team Name", key: "team_name" },
		{ label: "SDG ID", key: "sdgId" },
		{ label: "Problem Statement", key: "problemTitle" },
		{ label: "Judging Rounds Total", key: "judgingRoundTotal" },
		{ label: "Bug Round Total", key: "bugRoundTotal" },
		{ label: "Judging Rounds + Bug Round", key: "judgingAndBugTotalScore" },
		{ label: "Presentation Round", key: "presentationRound" },
		{ label: "Grand Total", key: "grandTotal" },
	];

	return (
		<CSVLink
			data={csvData}
			headers={headers}
			filename={`judging_grand_total_${new Date(new Date().getTime() + 3600000 * +5.5).toISOString()}.csv`}
			className="flex min-w-[10rem] items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600">
			Export CSV
			<FaFileUpload className="ml-2 inline-block" />
		</CSVLink>
	);
};

const Judge = (): React.JSX.Element => {
	const session = useSession();
	const [searchTerm, setSearchTerm] = useState("");
	const [teamJudgeMapping, setTeamJudgeMapping] = useState<Record<string, string[]>>({});
	const { teams } = useApprovedTeams();
	const [scores, setScores] = useState<TeamScore[]>([]);
	const [scores2, setScores2] = useState<TeamScore[]>([]);
	const [avgDenominatorConfig, setAvgDenominatorConfig] = useState<AvgDenominatorConfig>({
		value1: 1,
		value2: 1,
	});
	const rounds = useRounds();
	useTeamJudgeMapping(teamJudgeMapping, setTeamJudgeMapping);

	// const getScoreIndex = (team_id: string): number => {
	//  const team = scores.find((team) => team._id === team_id);
	//  if (team) {
	//      for (let i = 0; i < team.scores.length; i++) {
	//          if (team.scores[i].judge_id === session?.user?._id) {
	//              return i;
	//          }
	//      }
	//  }
	//  return -1;
	// };

	React.useEffect(() => {
		setScores(
			teams.map((team) => {
				const default_score = rounds.map((round) => ({
					round_id: round._id,
					category_scores: round.categories.map((category) => ({
						category_id: category.category_id,
						score: 0,
					})),
				}));

				if (!team.judge_score || team.judge_score.length === 0) {
					return {
						_id: team._id,
						scores: [{ judge_id: "", scores: default_score }],
					};
				}
				const judge_scores: JudgeScore[] = [];

				const consideredRounds: string[] = [];
				for (const round of rounds) {
					if (round.considerForFormula) {
						consideredRounds.push(round._id);
					}
				}

				for (const judge_score of team.judge_score) {
					const scores = judge_score.scores
						.filter((score) => consideredRounds.includes(score.round_id))
						.map((score) => ({
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

		setScores2(
			teams.map((team) => {
				const default_score = rounds.map((round) => ({
					round_id: round._id,
					category_scores: round.categories.map((category) => ({
						category_id: category.category_id,
						score: 0,
					})),
				}));

				if (!team.judge_score || team.judge_score.length === 0) {
					return {
						_id: team._id,
						scores: [{ judge_id: "", scores: default_score }],
					};
				}
				const judge_scores: JudgeScore[] = [];

				const notConsideredRounds: string[] = [];
				for (const round of rounds) {
					if (!round.considerForFormula) {
						notConsideredRounds.push(round._id);
					}
				}

				for (const judge_score of team.judge_score) {
					const scores = judge_score.scores
						.filter((score) => notConsideredRounds.includes(score.round_id))
						.map((score) => ({
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
	}, [teams, rounds, teamJudgeMapping]);

	React.useEffect((): void => {
		(async function (): Promise<void> {
			const response = await axios.get<AvgDenominatorConfig>(getEndpoint(Endpoints.GET_AVG_DENOMINATOR_CONFIG), {
				withCredentials: true,
			});

			setAvgDenominatorConfig(response.data);
		})();
	}, [session]);

	// setScores2(
	//  teams.map(async (team) => {
	//      const response = await axios.get<AdminSubmission[]>(getEndpoint(Endpoints.ADMIN_SUBMISSIONS), {
	//          withCredentials: true,
	//      });
	//  })
	// );

	const totalScore = (team_id?: string): number => {
		if (!team_id || !(team_id in teamJudgeMapping)) {
			return 0;
		}

		const team = scores.find((team) => team._id === team_id);
		if (team) {
			const rounds: Record<string, number | undefined> = {};
			const score_arr: number[] = [];
			for (const score of team.scores) {
				for (const round of score.scores) {
					rounds[round.round_id] =
						(rounds[round.round_id] ?? 0) +
						round.category_scores.reduce((acc, curr) => acc + curr.score, 0);
				}
			}

			Object.values(rounds).forEach((round) => {
				// score_arr.push((round ?? 0) / teamJudgeMapping[team_id].length);
				score_arr.push((round ?? 0) / avgDenominatorConfig.value1);
			});

			if (score_arr.length === 0) {
				return 0;
			}

			// const _team = teams.find((team) => team._id === team_id);
			// if (_team?.name.toLocaleLowerCase().trim().includes("")) {
			//     console.log(score_arr);
			// }

			return score_arr.reduce((acc, curr) => acc + curr, 0);
		}
		return 0;
	};

	const totalScore2 = (team_id?: string): number => {
		if (!team_id || !(team_id in teamJudgeMapping)) {
			return 0;
		}

		const team = scores2.find((team) => team._id === team_id);
		if (team) {
			const rounds: Record<string, number | undefined> = {};
			const score_arr: number[] = [];
			for (const score of team.scores) {
				for (const round of score.scores) {
					rounds[round.round_id] =
						(rounds[round.round_id] ?? 0) +
						round.category_scores.reduce((acc, curr) => acc + curr.score, 0);
				}
			}

			Object.values(rounds).forEach((round) => {
				// score_arr.push((round ?? 0) / teamJudgeMapping[team_id].length);
				score_arr.push((round ?? 0) / avgDenominatorConfig.value1);
			});

			if (score_arr.length === 0) {
				return 0;
			}

			return score_arr.reduce((acc, curr) => acc + curr, 0);
		}
		return 0;
	};

	const getJudgingAndBugTotalScore = (team_id: string): number => {
		const team = teams.find((team) => team._id === team_id);

		const judgingTotal = totalScore(team?._id);
		let bugRoundScore = team?.bugs?.length ? team.bugs[0].score : 0;

		if (bugRoundScore > 100) {
			bugRoundScore = 100;
		} else if (bugRoundScore < -100) {
			bugRoundScore = 100;
		}

		let total = judgingTotal * (1 + (3 * bugRoundScore) / 1000);

		if (team?.deployed) {
			total += 10;
		}

		return total;
	};

	const getGrandTotalScore = (team_id: string): number => {
		const team = teams.find((team) => team._id === team_id);

		if (!team) {
			return 0;
		}

		return getJudgingAndBugTotalScore(team._id) + totalScore2(team._id);
	};

	const filteredTeams = useMemo(() => {
		return teams
			.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [teams, searchTerm]);

	return (
		<ContentLayout title="Total Scoreboard">
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
							<BreadcrumbPage className="font-semibold">Total Scoreboard</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="container mx-auto max-w-full p-4">
				<div className="relative mb-4 flex items-center justify-evenly gap-4">
					<Input
						type="text"
						placeholder="Search teams..."
						value={searchTerm}
						onChange={(e): void => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
					<ExportCSVButton
						teams={filteredTeams.map((team) => ({
							...team,
							judgingRoundTotal: totalScore(team._id).toFixed(2),
							bugRoundTotal: team.bugs?.length ? team.bugs[0].score : 0,
							judgingAndBugTotalScore: getJudgingAndBugTotalScore(team._id).toFixed(2),
							presentationRound: totalScore2(team._id).toFixed(2),
							grandTotal: getGrandTotalScore(team._id).toFixed(2),
						}))}></ExportCSVButton>
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
										Problem Statement
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Judging Rounds Total
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Bug Round Total
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Judging Rounds + Bug Round
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Presentation Round
									</TableHead>
									<TableHead rowSpan={2} className="min-w-[110px] text-center">
										Grand Total
									</TableHead>
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
										<TableCell className="text-left">
											{}
											{team.problemTitle ?? ""}
										</TableCell>
										<TableCell className="text-center font-bold">
											{totalScore(team._id).toFixed(2)}
										</TableCell>
										<TableCell className="text-center font-bold">
											{team.bugs?.length ? team.bugs[0].score : 0}
										</TableCell>
										<TableCell className="text-center font-bold">
											{getJudgingAndBugTotalScore(team._id).toFixed(2)}
										</TableCell>
										<TableCell className="text-center font-bold">
											{totalScore2(team._id).toFixed(2)}
										</TableCell>
										<TableCell className="text-center font-bold">
											{getGrandTotalScore(team._id).toFixed(2)}
										</TableCell>
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
