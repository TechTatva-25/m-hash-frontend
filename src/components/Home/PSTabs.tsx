"use client";

import * as React from "react";

import { Spinner } from "@/components/Dashboard/Submit/loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem, useProblems } from "@/hooks/useProblem";

import { PSCards } from "./PSCards";

export function PSTabs(): React.JSX.Element {
	const [selectedTab, setSelectedTab] = React.useState("all");
	const [problems, setProblems] = React.useState<Problem[]>([]);

	useProblems(problems, setProblems);

	const handleTabChange = (value: string): void => {
		setSelectedTab(value);
	};

	return (
		<div className="flex items-center justify-center p-4">
			{!problems.length ? (
				<Spinner className="text-white" size="large" />
			) : (
				<Tabs defaultValue="all" className="w-full md:w-[100%]" onValueChange={handleTabChange}>
					<TabsList
						className={
							"mx-auto mb-16 flex w-fit flex-col items-center space-y-2 md:mb-6 md:flex-row md:justify-center md:space-x-4 md:space-y-0 md:bg-secondary"
						}>
						<TabsTrigger value="all">ALL</TabsTrigger>
						<TabsTrigger value="real">Paradigm I: REAL WORLD</TabsTrigger>
						<TabsTrigger value="game">Paradigm II: GAMIFIED WORLD</TabsTrigger>
					</TabsList>
					<PSCards filter={selectedTab} problems={problems} />
				</Tabs>
			)}
		</div>
	);
}
