"use client";

import React from "react";
import { FaBuildingColumns } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
// import { MdMoveToInbox } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

import { Spinner } from "@/components/Dashboard/Submit/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useHomepageStats } from "@/hooks/useHomepageStats";

// import { AreaGraph } from "./AreaGraph";

export interface Stats {
	users: number;
	teams: number;
	submissions: number;
}

const getLoader = function (): React.JSX.Element {
	return (
		<div className="flex items-center justify-start">
			<Spinner className="text-white" size="medium" />
		</div>
	);
};

export function Stats(): React.JSX.Element {
	const stats = useHomepageStats();

	return (
		<div className="w-screen px-12 md:px-24">
			<div className="space-y-2">
				<h2 className="my-8 text-center text-3xl font-bold">Statistics</h2>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">Total Participants</CardTitle>
									<IoPerson size={24} />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats.loading ? getLoader() : stats.users}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">Total Teams</CardTitle>
									<RiTeamFill size={24} />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats.loading ? getLoader() : stats.teams}
									</div>
								</CardContent>
							</Card>
							{/* <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">Total Submissions</CardTitle>
                                    <MdMoveToInbox size={24} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.loading ? getLoader() : stats.submissions ?? 0}
                                    </div>
                                </CardContent>
                            </Card> */}
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">Total Colleges</CardTitle>
									<FaBuildingColumns size={24} />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats.loading ? getLoader() : stats.colleges ?? 0}
									</div>
								</CardContent>
							</Card>
						</div>
						{/* <div className="col-span-4">
                            <AreaGraph data={chartData} />
                        </div> */}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
