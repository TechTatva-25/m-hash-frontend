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
			<Spinner className="text-primary" size="medium" />
		</div>
	);
};

export function Stats(): React.JSX.Element {
	const stats = useHomepageStats();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const spotlightColor = isDark ? "rgba(46, 204, 113, 0.08)" : "rgba(16, 109, 32, 0.05)";

	const statItems = [
		{
			title: "Registrations",
			value: stats.users,
			icon: (
				<IoPerson
					size={28}
					className={isDark ? "text-[rgba(144,238,144,0.95)]" : "text-[rgb(2,79,80)]"}
					style={{
						filter: isDark
							? "drop-shadow(0 0 8px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 6px rgba(16, 109, 32, 0.25))",
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
					className={isDark ? "text-[rgba(144,238,144,0.95)]" : "text-[rgb(2,79,80)]"}
					style={{
						filter: isDark
							? "drop-shadow(0 0 8px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 6px rgba(16, 109, 32, 0.25))",
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
					className={isDark ? "text-[rgba(144,238,144,0.95)]" : "text-[rgb(2,79,80)]"}
					style={{
						filter: isDark
							? "drop-shadow(0 0 8px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 6px rgba(16, 109, 32, 0.25))",
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
					className={isDark ? "text-[rgba(144,238,144,0.95)]" : "text-[rgb(2,79,80)]"}
					style={{
						filter: isDark
							? "drop-shadow(0 0 8px rgba(46, 204, 113, 0.3))"
							: "drop-shadow(0 0 6px rgba(16, 109, 32, 0.25))",
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
		<section id="stats" className="py-20 relative">
			<div className="container mx-auto px-4 relative z-10">
				{/* Section Title */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}>
					<div className="relative inline-block">
						<h2
							className="text-4xl md:text-5xl font-bold mb-4 relative"
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(200, 240, 200, 0.95)" : "#005050",
								textShadow: isDark
									? "0 2px 8px rgba(46, 204, 113, 0.2)"
									: "0 2px 8px rgba(16, 109, 32, 0.15)",
							}}>
							Hackathon by Numbers
						</h2>

						{/* Royal Green decorative lines - heading width only */}
						<motion.div
							className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
							style={{
								background: isDark
									? "linear-gradient(to right, rgba(46, 204, 113, 0.8), rgba(34, 197, 94, 0.6), rgba(46, 204, 113, 0.8))"
									: "#005050",
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						/>
						<motion.div
							className="absolute -bottom-3 left-0 w-4/5 h-[0.5px] rounded-full mx-auto"
							style={{
								background: isDark
									? "linear-gradient(to right, rgba(46, 204, 113, 0.6), rgba(34, 197, 94, 0.4), rgba(46, 204, 113, 0.6))"
									: "linear-gradient(to right, rgba(16, 109, 32, 0.6), rgba(34, 139, 34, 0.4), rgba(16, 109, 32, 0.6))",
								left: "10%",
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</div>
					<p
						className="text-lg opacity-80 max-w-2xl mx-auto mt-6"
						style={{
							color: isDark ? "rgba(200, 220, 200, 0.9)" : "rgba(40, 60, 40, 0.95)",
						}}>
						Join thousands of innovators in India's premier student hackathon
					</p>
				</motion.div>

				{/* Stats Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}>
					{statItems.map((item, index) => (
						<motion.div key={index} variants={itemVariants}>
							<SpotlightCard spotlightColor={spotlightColor}>
								<div className="p-6 text-center">
									<div
										className="flex justify-center mb-4 "
										style={{
											color: isDark ? "rgba(200, 220, 200, 0.9)" : "#005050",
										}}>
										{item.icon}
									</div>
									<h3
										className="text-2xl md:text-3xl font-bold mb-2"
										style={{
											color: isDark ? "rgba(200, 240, 200, 0.95)" : "#005050",
										}}>
										{typeof item.value === "number"
											? stats.loading
												? getLoader()
												: item.value.toLocaleString()
											: item.value}
									</h3>
									<p
										className="text-lg font-semibold mb-2"
										style={{
											color: isDark ? "rgba(200, 220, 200, 0.9)" : "rgba(40, 60, 40, 0.9)",
										}}>
										{item.title}
									</p>
									<p
										className="text-sm opacity-70"
										style={{
											color: isDark ? "rgba(200, 220, 200, 0.7)" : "rgba(40, 60, 40, 0.7)",
										}}>
										{item.description}
									</p>
								</div>
							</SpotlightCard>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
