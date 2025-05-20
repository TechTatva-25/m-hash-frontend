"use client";

import { Circle, MoveUpRight, UserCircle, Users } from "lucide-react";
import React from "react";
import { FaStackOverflow } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Spinner } from "@/components/Dashboard/Submit/loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useAdminStats } from "@/hooks/useAdminStats";

import BarChart2 from "./userCollege";

const chartConfig: ChartConfig = {
	key: {
		label: "Key",
		color: "#2563eb",
	},
	count: {
		label: "Count",
		color: "#60a5fa",
	},
};

export function Stats(): React.JSX.Element {
	const stats = useAdminStats();

	if (stats.loading) {
		return (
			<div className="flex h-[70vh] items-center justify-center">
				<Spinner className="text-white" size="large" />
			</div>
		);
	}

	return (
		<div className="my-5 grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
			<div className="items-strech col-span-1 flex w-[100%] flex-wrap justify-between gap-3 sm:col-span-3">
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Teams</p>
							<Users className="h-5 w-5 text-green-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.teams}</p>
					</CardContent>
				</Card>
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Colleges</p>
							<FaStackOverflow className="h-5 w-5 text-red-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.colleges}</p>
					</CardContent>
				</Card>
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Submissions</p>
							<FaStackOverflow className="h-5 w-5 text-red-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.submissions}</p>
					</CardContent>
				</Card>
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Participants</p>
							<UserCircle className="h-5 w-5 text-yellow-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.users.total}</p>
					</CardContent>
				</Card>
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Male</p>
							<MoveUpRight className="h-5 w-5 text-blue-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.users.male}</p>
					</CardContent>
				</Card>
				<Card className="flex-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold text-gray-500">Female</p>
							<Circle className="h-5 w-5 text-pink-500" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{stats.users.female}</p>
					</CardContent>
				</Card>
			</div>
			{/* <div className="col-span-3 flex items-end justify-end">
                <UserTeam />
            </div> */}
			<div className="col-span-1 flex flex-col gap-3 sm:col-span-3 md:flex-row">
				<div className="flex flex-1 items-end justify-end ">
					<BarChart2
						title="Team Registrations"
						description="Shows day-wise team registrations from entire participant pool"
						data={stats.teamsByDate}
					/>
				</div>
				<div className="flex flex-1 items-end justify-end ">
					<BarChart2
						title={"Participant Registrations"}
						description={"Shows day-wise participant registrations"}
						data={stats.usersByDate}
					/>
				</div>
			</div>
			<div className="col-span-1 flex flex-col gap-3 sm:col-span-3 md:flex-row">
				<div className="flex flex-1 items-end justify-end">
					<Card className="w-[100%]">
						<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
							<CardTitle>Teams By State</CardTitle>
							<CardDescription>Shows team count for states having at least one team</CardDescription>
						</div>
						<ChartContainer config={chartConfig} className="max-h-[400px] w-full">
							<ResponsiveContainer width="100%" height={200}>
								<BarChart data={stats.teamCountByState}>
									<CartesianGrid stroke="#121212" />
									<XAxis dataKey="key" />
									<YAxis />
									<Tooltip />
									<Bar
										dataKey="count"
										opacity={90}
										stroke="#2563eb"
										fill="var(--color-key)"
										radius={2}
									/>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</Card>
				</div>
				<div className="flex flex-1 items-end justify-end">
					<Card className="w-[100%]">
						<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
							<CardTitle>College Participation By State</CardTitle>
							<CardDescription>Shows college count for states having at least one team</CardDescription>
						</div>
						<ChartContainer config={chartConfig} className="max-h-[400px] w-full">
							<ResponsiveContainer width="100%" height={200}>
								<BarChart data={stats.teamCollegeCountByState}>
									<CartesianGrid stroke="#121212" />
									<XAxis dataKey="key" />
									<YAxis />
									<Tooltip />
									<Bar
										dataKey="count"
										opacity={90}
										stroke="#2563eb"
										fill="var(--color-key)"
										radius={2}
									/>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</Card>
				</div>
				{/* <div className="flex flex-1 items-end justify-end">
                    <Card className="w-[100%]">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Participants By State</CardTitle>
                            <CardDescription>Shows participant count for states having at least one participant registration</CardDescription>
                        </div>
                        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={stats.userCountByState}>
                                    <CartesianGrid stroke="#121212" />
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="count"
                                        opacity={90}
                                        stroke="#2563eb"
                                        fill="var(--color-key)"
                                        radius={2}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </Card>
                </div> */}
			</div>
			<div className="col-span-1 flex flex-1 items-end justify-end sm:col-span-3">
				<Card className="w-[100%]">
					<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
						<CardTitle>Teams By College</CardTitle>
						<CardDescription>Shows team count for colleges having at least one team</CardDescription>
					</div>
					<ChartContainer config={chartConfig} className="max-h-[400px] w-full">
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={stats.teamCountByCollege}>
								<CartesianGrid stroke="#121212" />
								<XAxis dataKey="key" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="count" opacity={90} stroke="#2563eb" fill="var(--color-key)" radius={2} />
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</Card>
			</div>
			<div className="col-span-1 flex flex-1 items-end justify-end sm:col-span-3">
				<Card className="w-[100%]">
					<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
						<CardTitle>Participants By College</CardTitle>
						<CardDescription>
							Shows participant count for colleges having at least one participant registration
						</CardDescription>
					</div>
					<ChartContainer config={chartConfig} className="max-h-[400px] w-full">
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={stats.userCountByCollege}>
								<CartesianGrid stroke="#121212" />
								<XAxis dataKey="key" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="count" opacity={90} stroke="#2563eb" fill="var(--color-key)" radius={2} />
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</Card>
			</div>
		</div>
	);
}

export default Stats;
