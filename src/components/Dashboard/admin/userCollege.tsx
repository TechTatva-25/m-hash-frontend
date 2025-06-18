"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartProps {
	title: string;
	description: string;
	data: { key: string; count: number }[];
}

const chartConfig = {
	key: {
		label: "Timestamp",
		color: "#2563eb",
	},
	count: {
		label: "Count",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export default function BarChart2({ title, description, data }: ChartProps): React.JSX.Element {
	return (
		<Card className="w-[100%]">
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<BarChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="key"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value): string => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="count"
									labelFormatter={(value): string => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Bar dataKey="count" fill={`var(--color-key)`} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
