"use client";

import BoringAvatar from "boring-avatars";
import { Trophy } from "lucide-react";
// import { Search, Trophy } from "lucide-react";
// import moment from "moment";
import React, { useState } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";
import { MdGroups } from "react-icons/md";

// import { RxLapTimer } from "react-icons/rx";
// import { VscBug } from "react-icons/vsc";
// import { FaRegLightbulb } from "react-icons/fa";
// import { FaShieldDog } from "react-icons/fa6";
// import { FiInfo } from "react-icons/fi";
// import { IoLanguage } from "react-icons/io5";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { LuLayoutTemplate } from "react-icons/lu";
// import { LuServerCrash } from "react-icons/lu";
// import { MdOutlineSwapCalls } from "react-icons/md";
// import { MdOutlineInstallDesktop } from "react-icons/md";
// import { MdErrorOutline } from "react-icons/md";
// import { PiWarningDiamond } from "react-icons/pi";
// import { SiDatabricks } from "react-icons/si";
// import { TbMathFunction } from "react-icons/tb";
import { Spinner } from "@/components/Dashboard/Submit/loader";
// import { ContentLayout } from "@/components/Dashboard/content-layout";
// import { Badge } from "@/components/ui/badge";
// import {
//  Breadcrumb,
//  BreadcrumbItem,
//  BreadcrumbLink,
//  BreadcrumbList,
//  BreadcrumbPage,
//  BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { ChevronLeft, ChevronRight, Link, Search, Trophy } from "lucide-react";
import { useHomepageLeaderboard } from "@/hooks/useHomepageLeaderboard";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateColorPalette } from "@/lib/utils";

// interface Bug {
//  id: number;
//  title: string;
//  description: string;
//  status: string;
//  severity: string;
//  category: string;
//  createdAt: string;
// }

// interface Team {
//  id: number;
//  name: string;
//  score: number;
//  bugsFound: number;
//  bugsList: Bug[];
//  lastSubmission: string;
// }

// const BugDetail = ({ bug }: { bug: Bug }): React.JSX.Element => {
//     const severityColors: Record<string, string> = {
//         Low: "bg-green-500",
//         Medium: "bg-amber-500",
//         High: "bg-orange-600",
//         Critical: "bg-red-600",
//     };
//     const categoryIcon: Record<string, React.ReactNode> = {
//         Functional: <TbMathFunction className="inline-block h-6 w-6 font-semibold text-teal-500" />,
//         "UI/UX": <LuLayoutTemplate className="inline-block h-6 w-6 font-semibold text-blue-500" />,
//         Security: <FaShieldDog className="inline-block h-6 w-6 font-semibold text-red-500" />,
//         Compatibility: <MdOutlineSwapCalls className="inline-block h-6 w-6 font-semibold text-purple-500" />,
//         "Data Handling": <SiDatabricks className="inline-block h-6 w-6 font-semibold text-cyan-500" />,
//         Logical: <FaRegLightbulb className="inline-block h-6 w-6 font-semibold text-yellow-500" />,
//         "Internationalization and Localization": (
//             <IoLanguage className="inline-block h-6 w-6 font-semibold text-green-500" />
//         ),
//         "Crash and Stability": <LuServerCrash className="inline-block h-6 w-6 font-semibold text-red-500" />,
//         "Installation and Deployment": (
//             <MdOutlineInstallDesktop className="inline-block h-6 w-6 font-semibold text-blue-500" />
//         ),
//         "Error Handling": <MdErrorOutline className="inline-block h-6 w-6 font-semibold text-yellow-500" />,
//         Documentation: <IoDocumentTextOutline className="inline-block h-6 w-6 font-semibold text-blue-500" />,
//         "False Positive": <PiWarningDiamond className="inline-block h-6 w-6 font-semibold text-red-500" />,
//     };
//     return (
//         <div className="m-2 flex w-auto cursor-pointer flex-col rounded-md bg-secondary px-4 py-3 transition-all duration-300 ease-in-out hover:bg-accent/90">
//             <div className="flex flex-row items-center justify-between space-x-2">
//                 <div className="flex w-full flex-col text-start">
//                     <div className="text-sm font-semibold">{bug.title}</div>
//                     <span className="text-xs text-muted-foreground">{bug.category}</span>
//                 </div>
//                 {categoryIcon[bug.category]}
//             </div>
//             <span className="mt-1 line-clamp-1 max-w-[250px] text-start text-xs text-muted-foreground">
//                 {bug.description}
//             </span>
//             <div className="mt-1.5 flex flex-row items-center justify-between">
//                 <div className="flex flex-row space-x-1">
//                     <Badge>{bug.status}</Badge>
//                     <span
//                         className={`${
//                             severityColors[bug.severity]
//                         } flex items-center justify-center rounded-full px-2 text-[10px]`}>
//                         {bug.severity}
//                     </span>
//                 </div>
//                 <span className="text-xs text-muted-foreground">{moment(bug.createdAt).fromNow()}</span>
//             </div>
//         </div>
//     );
// };

const getLoader = function (): React.JSX.Element {
	return (
		<div className="flex items-center justify-center">
			<Spinner className="text-white" size="large" />
		</div>
	);
};

export default function Leaderboard(): React.JSX.Element {
	// const mockTeams: Team[] = React.useMemo(() => {
	//  return Array.from({ length: 50 }, (_, i) => ({
	//      id: i + 1,
	//      name: `Team ${i + 1}`,
	//      score: Math.floor(Math.random() * 1000),
	//      bugsFound: Math.floor(Math.random() * 50),
	//      bugsList: Array.from({ length: Math.floor(Math.random() * 50) }, (_, i) => ({
	//          id: i + 1,
	//          title: `Bug ${i + 1}`,
	//          description: `This is a bug description for Bug ${i + 1}`,
	//          status: ["open", "closed"][Math.floor(Math.random() * 2)],
	//          severity: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
	//          category: [
	//              "Functional",
	//              "UI/UX",
	//              "Security",
	//              "Compatibility",
	//              "Data Handling",
	//              "Logical",
	//              "Internationalization and Localization",
	//              "Crash and Stability",
	//              "Installation and Deployment",
	//              "Error Handling",
	//              "Documentation",
	//              "False Positive",
	//          ][Math.floor(Math.random() * 11)],
	//          createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
	//      })),
	//      lastSubmission: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
	//  })).sort((a, b) => b.score - a.score);
	// }, []);
	const [currentPage] = useState(1);
	const [searchTerm] = useState("");
	// const [currentPage, setCurrentPage] = useState(1);
	// const [searchTerm, setSearchTerm] = useState("");
	const teamsPerPage = 100;

	const teams = useHomepageLeaderboard().teams.sort((a, b) => b.score - a.score) ?? [];

	const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const indexOfLastTeam = currentPage * teamsPerPage;
	const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
	const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

	// const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

	// const handlePrevPage = (): void => setCurrentPage((prev) => Math.max(prev - 1, 1));
	// const handleNextPage = (): void => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

	setTimeout((): void => {
		window.location.reload();
	}, 30000);

	return (
		<div className="container mx-auto max-w-4xl p-4">
			{teams.length ? (
				<>
					<h1 className="mb-12 text-center text-2xl font-bold md:text-3xl">Bug Round Leaderboard</h1>
					{/* <div className="relative mb-4">
                        <Input
                            type="text"
                            placeholder="Search teams"
                            value={searchTerm}
                            onChange={(e): void => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            size={20}
                        />
                    </div> */}
					<div className="overflow-hidden rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="min-w-[100px] text-center">
										<GoNumber className="mr-2 inline-block h-4 w-4" />
										Rank
									</TableHead>
									<TableHead className="min-w-[200px]">
										<MdGroups className="mr-2 inline-block h-4 w-4" />
										Team Name
									</TableHead>
									<TableHead className="min-w-[150px] text-center">
										<FaRankingStar className="mr-2 inline-block h-4 w-4" />
										Score
									</TableHead>
									{/* <TableHead className="min-w-[150px] text-center">
                                        <VscBug className="mr-2 inline-block h-4 w-4" />
                                        Bugs Count
                                    </TableHead> */}
									{/* <TableHead className="min-w-[150px] text-right">
                                <RxLapTimer className="mr-2 inline-block h-4 w-4" />
                                Last Bug Validated At
                            </TableHead> */}
								</TableRow>
							</TableHeader>
							<TableBody>
								{currentTeams.map((team, index) => (
									<TableRow key={Math.random()} className={index < 3 ? "font-medium" : ""}>
										<TableCell className="pl-5 text-center font-medium">
											{index < 3 ? (
												<Trophy
													size={16}
													className={`inline-block ${
														index === 0
															? "text-yellow-400"
															: index === 1
																? "text-gray-400"
																: "text-amber-600"
													}`}
												/>
											) : (
												index + 1
											)}
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-4">
												<BoringAvatar
													name={team.name}
													variant="marble"
													size={32}
													colors={generateColorPalette(team.name)}
												/>
												<span>{team.name}</span>
											</div>
										</TableCell>
										<TableCell className="text-center">{team.score}</TableCell>
										{/* <TableCell className="text-center">
                                            {team.bugs} */}
										{/* <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <FiInfo className="ml-2 inline-block h-4 w-4 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent sideOffset={8} className="p-0">
                                                    <ScrollArea className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                                                        {team.bugsList.map((bug) => (
                                                            <BugDetail key={bug.id} bug={bug} />
                                                        ))}
                                                    </ScrollArea>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider> */}
										{/* </TableCell> */}
										{/* <TableCell className="text-right">{moment(team.lastSubmission).fromNow()}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</>
			) : (
				getLoader()
			)}
			{/* <div className="mt-4 flex items-center justify-between">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div> */}
		</div>
	);
}
