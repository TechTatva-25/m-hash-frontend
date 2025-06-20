"use client";

import React from "react";
import { FaBuildingColumns } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { LuTrophy } from "react-icons/lu";
import { motion } from "framer-motion";

import { Spinner } from "@/components/Dashboard/Submit/loader";
import SpotlightCard from "@/components/ui/spotlightCard";
import { useHomepageStats } from "@/hooks/useHomepageStats";
import { useTheme } from "@/components/ThemeProvider";

export interface Stats {
	users: number;
	teams: number;
	submissions: number;
	colleges?: number;
}

const getLoader = function (): React.JSX.Element {
	return (
		<div className="flex items-center justify-start">
			<Spinner className="text-[hsl(var(--foreground))]" size="medium" />
		</div>
	);
};

export function Stats(): React.JSX.Element {
	const stats = useHomepageStats();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const spotlightColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)";

	const statItems = [
		{
			title: "Participants",
			value: stats.users,
			icon: (
				<IoPerson
					size={28}
					className="text-[hsl(var(--foreground))]"
					style={{
						filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.15))",
					}}
				/>
			),
			description: "Brilliant minds from across India",
		},
		{
			title: "Teams",
			value: stats.teams,
			icon: (
				<RiTeamFill
					size={28}
					className="text-[hsl(var(--foreground))]"
					style={{
						filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.15))",
					}}
				/>
			),
			description: "Collaborating to build the future",
		},
		{
			title: "Colleges",
			value: stats.colleges ?? 0,
			icon: (
				<FaBuildingColumns
					size={28}
					className="text-[hsl(var(--foreground))]"
					style={{
						filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.15))",
					}}
				/>
			),
			description: "Representing institutions nationwide",
		},
		{
			title: "Prize Pool",
			value: "₹2,00,000",
			icon: (
				<LuTrophy
					size={28}
					className="text-[hsl(var(--foreground))]"
					style={{
						filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.15))",
					}}
				/>
			),
			description: "Worth of exciting prizes to be won",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring" as const, stiffness: 100 },
		},
	};

	return (
		<section id="stats" className="py-20">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<motion.div
						className="relative inline-block mb-8"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}>
						<h2
							className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]"
							style={{ fontFamily: "var(--font-playfair-display)" }}>
							Hackathon by Numbers
						</h2>
						<motion.div
							className="absolute -bottom-3 left-0 h-1 bg-[hsl(var(--foreground))] rounded-full"
							initial={{ width: 0 }}
							whileInView={{ width: "100%" }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						/>
						<motion.div
							className="absolute -bottom-5 left-0 h-[0.5px] bg-[hsl(var(--foreground))] rounded-full"
							initial={{ width: 0 }}
							whileInView={{ width: "100%" }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</motion.div>
					<motion.p
						className="text-lg text-[hsl(var(--foreground))]/80 max-w-2xl mx-auto opacity-80"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.8 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}>
						Take a look at the impact and scale of Manipal Hackathon 2025, one of India's premier student
						hackathons
					</motion.p>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}>
					{statItems.map((item, index) => (
						<motion.div key={index} variants={itemVariants}>
							<SpotlightCard
								className="h-full bg-white/5 dark:bg-black/5 border-gray-300/40 dark:border-gray-600/40 backdrop-blur-xl"
								spotlightColor={spotlightColor}>
								<div className="flex flex-col h-full">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-medium text-[hsl(var(--foreground))]">
											{item.title}
										</h3>
										{item.icon}
									</div>
									<div className="flex-grow">
										<div
											className="text-4xl font-bold mb-2 text-[hsl(var(--foreground))]"
											style={{ fontFamily: "var(--font-playfair-display)" }}>
											{stats.loading && typeof item.value === "number" ? getLoader() : item.value}
										</div>
										<p className="text-sm opacity-70 text-[hsl(var(--foreground))]">
											{item.description}
										</p>
									</div>
								</div>
							</SpotlightCard>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
