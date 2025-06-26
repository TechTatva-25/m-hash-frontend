"use client";

import * as React from "react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

import { Spinner } from "@/components/Dashboard/Submit/loader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Problem, useProblems } from "@/hooks/useProblem";

import { PSCards } from "./PSCards";

export function PSTabs(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const [selectedTab, setSelectedTab] = React.useState("all");
	const [problems, setProblems] = React.useState<Problem[]>([]);

	useProblems(problems, setProblems);

	const handleTabChange = (value: string): void => {
		setSelectedTab(value);
	};

	return (
		<motion.div
			className="py-8 md:py-16"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
			viewport={{ once: true }}>
			<div className="container mx-auto px-4">
				<motion.div
					className={`relative backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden py-5 ${
						isDark
							? "bg-gradient-to-br from-[rgba(30,30,40,0.7)] via-[rgba(30,30,40,0.5)] to-[rgba(30,30,40,0.3)] border border-[rgba(103,80,164,0.3)]"
							: "bg-gradient-to-br from-[rgba(255,255,255,0.9)] via-[rgba(255,255,255,0.7)] to-[rgba(255,255,255,0.5)] border border-[rgba(132,95,220,0.3)]"
					}`}
					style={{
						boxShadow: isDark
							? "0 20px 40px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
							: "0 20px 40px -12px rgba(103,80,164,0.15), 0 0 0 1px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.7)",
					}}
					initial={{ opacity: 0, scale: 0.98 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}>
					{/* Subtle accent elements */}
					<div
						className={`absolute top-4 right-4 w-8 h-8 rounded-full blur-sm ${
							isDark ? "bg-[rgba(103,80,164,0.3)]" : "bg-[rgba(132,95,220,0.2)]"
						}`}></div>
					<div
						className={`absolute bottom-4 left-4 w-6 h-6 rounded-full blur-sm ${
							isDark ? "bg-[rgba(103,80,164,0.3)]" : "bg-[rgba(132,95,220,0.2)]"
						}`}></div>

					{!problems.length ? (
						<div className="flex justify-center items-center py-20">
							<Spinner
								className={isDark ? "text-[rgba(220,200,255,0.9)]" : "text-[rgba(103,80,164,0.9)]"}
								size="large"
							/>
						</div>
					) : (
						<Tabs defaultValue="all" className="w-full relative z-10" onValueChange={handleTabChange}>
							<TabsList
								className={`mx-auto mb-12 flex w-fit flex-col items-center space-y-2 rounded-xl backdrop-blur-md transition-all duration-300 
									${
										isDark
											? "bg-[rgba(30,30,40,0.6)] border border-[rgba(103,80,164,0.3)]"
											: "bg-[rgba(255,255,255,0.7)] border border-[rgba(132,95,220,0.3)]"
									}
									md:mb-10 md:flex-row md:justify-center md:space-x-4 md:space-y-0`}
								style={{
									boxShadow: isDark
										? "0 4px 12px rgba(0,0,0,0.2)"
										: "0 4px 12px rgba(103,80,164,0.08)",
								}}>
								<TabsTrigger
									value="all"
									className={`transition-all duration-300 ${
										selectedTab === "all" &&
										(isDark
											? "bg-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.95)]"
											: "bg-[rgba(132,95,220,0.15)] text-[rgba(103,80,164,0.95)]")
									}`}>
									ALL
								</TabsTrigger>
								<TabsTrigger
									value="real"
									className={`transition-all duration-300 ${
										selectedTab === "real" &&
										(isDark
											? "bg-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.95)]"
											: "bg-[rgba(132,95,220,0.15)] text-[rgba(103,80,164,0.95)]")
									}`}>
									Paradigm I: REAL WORLD
								</TabsTrigger>
								<TabsTrigger
									value="game"
									className={`transition-all duration-300 ${
										selectedTab === "game" &&
										(isDark
											? "bg-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.95)]"
											: "bg-[rgba(132,95,220,0.15)] text-[rgba(103,80,164,0.95)]")
									}`}>
									Paradigm II: GAMIFIED WORLD
								</TabsTrigger>
							</TabsList>
							<PSCards filter={selectedTab} problems={problems} />
						</Tabs>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
