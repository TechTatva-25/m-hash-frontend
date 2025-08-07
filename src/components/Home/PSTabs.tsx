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
			className="py-4 sm:py-8 md:py-10 w-full"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
			viewport={{ once: true }}>
			<div className="container mx-auto px-2 sm:px-4 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[1200px] w-full">
				<motion.div
					className={`relative backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden py-3 sm:py-5`}
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(0, 30, 20, 0.7) 0%, rgba(0, 40, 25, 0.5) 50%, rgba(0, 30, 20, 0.3) 100%)"
							: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 100%)",
						borderColor: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.3)",
						borderWidth: "1px",
						borderStyle: "solid",
						boxShadow: isDark
							? "0 20px 40px -12px rgba(46, 204, 113, 0.1), 0 0 0 1px rgba(46, 204, 113, 0.1), inset 0 1px 0 rgba(46, 204, 113, 0.1)"
							: "0 20px 40px -12px rgba(16, 109, 32, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
					}}
					initial={{ opacity: 0, scale: 0.98 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}>
					{/* Subtle accent elements - adjusted for mobile */}
					<div
						className="absolute top-2 sm:top-4 right-2 sm:right-4 w-4 sm:w-8 h-4 sm:h-8 rounded-full blur-sm"
						style={{
							background: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.2)",
						}}></div>
					<div
						className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-3 sm:w-6 h-3 sm:h-6 rounded-full blur-sm"
						style={{
							background: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.2)",
						}}></div>

					{!problems.length ? (
						<div className="flex justify-center items-center py-12 sm:py-20">
							<Spinner
								className={isDark ? "text-[rgba(200, 240, 200, 0.9)]" : "text-[rgba(16, 109, 32, 0.9)]"}
								size="large"
							/>
						</div>
					) : (
						<Tabs defaultValue="all" className="w-full relative z-10" onValueChange={handleTabChange}>
							<TabsList
								className={`mx-auto mb-6 sm:mb-8 md:mb-12 flex w-fit flex-col items-center space-y-2 rounded-xl backdrop-blur-md transition-all duration-300 p-2 sm:p-3 md:flex-row md:justify-center md:space-x-2 lg:space-x-4 md:space-y-0`}
								style={{
									background: isDark ? "rgba(0, 40, 25, 0.6)" : "rgba(255, 255, 255, 0.7)",
									borderColor: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.3)",
									borderWidth: "1px",
									borderStyle: "solid",
									boxShadow: isDark
										? "0 4px 12px rgba(46, 204, 113, 0.1)"
										: "0 4px 12px rgba(16, 109, 32, 0.08)",
								}}>
								<TabsTrigger
									value="all"
									className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg w-full md:w-auto ${
										selectedTab === "all" &&
										(isDark ? "text-[rgba(200, 240, 200, 0.95)]" : "text-[rgba(16, 109, 32, 0.95)]")
									}`}
									style={{
										background:
											selectedTab === "all"
												? isDark
													? "rgba(46, 204, 113, 0.2)"
													: "rgba(16, 109, 32, 0.15)"
												: "transparent",
									}}>
									ALL
								</TabsTrigger>
								{/* <TabsTrigger
									value="real"
									className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg w-full md:w-auto text-center ${
										selectedTab === "real" &&
										(isDark
											? "bg-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.95)]"
											: "bg-[rgba(132,95,220,0.15)] text-[rgba(103,80,164,0.95)]")
									}`}>
									<span className="hidden sm:inline">Paradigm I: REAL WORLD</span>
									<span className="sm:hidden">REAL WORLD</span>
								</TabsTrigger>
								<TabsTrigger
									value="game"
									className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg w-full md:w-auto text-center ${
										selectedTab === "game" &&
										(isDark
											? "bg-[rgba(103,80,164,0.3)] text-[rgba(220,200,255,0.95)]"
											: "bg-[rgba(132,95,220,0.15)] text-[rgba(103,80,164,0.95)]")
									}`}>
									<span className="hidden sm:inline">Paradigm II: GAMIFIED WORLD</span>
									<span className="sm:hidden">GAMIFIED WORLD</span>
								</TabsTrigger> */}
							</TabsList>
							<PSCards filter={selectedTab} problems={problems} />
						</Tabs>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
