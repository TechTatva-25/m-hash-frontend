"use client";
import Image from "next/image";
import React from "react";
import { Calendar, Clock, Flag, Target } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

interface TimelineStage {
	date: string;
	description: React.ReactNode;
	badge: string;
	image: string;
}

export function HighwayTimeline({ timeline = generalTimeLine }: { timeline?: TimelineStage[] }): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	const iconMap = [
		<Flag key="flag" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
		<Target key="target" className="h-5 w-5 text-green-600 dark:text-green-400" />,
		<Calendar key="calendar" className="h-5 w-5 text-green-700 dark:text-green-300" />,
		<Clock key="clock" className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />,
	];
	return (
		<div className="w-full py-16 px-4 md:px-6 lg:px-8 relative">
			{/* Royal Green Glassmorphic Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-400/8 dark:bg-emerald-400/12 blur-3xl animate-pulse-slow"></div>
				<div
					className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-green-400/6 dark:bg-green-400/10 blur-3xl animate-pulse-slow"
					style={{ animationDelay: "2s" }}></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 rounded-full bg-emerald-500/4 dark:bg-emerald-500/8 blur-3xl"></div>
			</div>

			<div className="max-w-7xl mx-auto relative">
				{/* Sophisticated glass background for the entire timeline section */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-green-50/8 to-transparent dark:from-emerald-900/10 dark:via-green-900/5 dark:to-transparent -z-10 backdrop-blur-sm"></div>

				{/* Title section */}
				<div className="relative mb-16 text-center">
					<motion.div
						className="relative inline-block mb-8"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}>
						<h2
							className="text-4xl md:text-5xl font-bold relative"
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(200, 240, 200, 0.95)" : "#005050",
								textShadow: isDark
									? "0 2px 8px rgba(46, 204, 113, 0.2)"
									: "0 2px 8px rgba(16, 109, 32, 0.15)",
							}}>
							Event Timeline
						</h2>

						{/* Royal Green decorative lines - heading width only */}
						<motion.div
							className="absolute -bottom-3 left-0 right-0 h-1 rounded-full"
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
							className="absolute -bottom-5 left-0 w-4/5 h-[0.5px] rounded-full"
							style={{
								background: isDark
									? "linear-gradient(to right, rgba(46, 204, 113, 0.6), rgba(34, 197, 94, 0.4), rgba(46, 204, 113, 0.6))"
									: "linear-gradient(to right, rgba(16, 109, 32, 0.6), rgba(34, 139, 34, 0.4), rgba(16, 109, 32, 0.6))",
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1, width: "100%" }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</motion.div>
				</div>

				{/* Vertical timeline line - perfectly centered with royal green */}
				<div
					className="absolute left-1/2 top-24 bottom-0 w-[2px] hidden md:block transform -translate-x-1/2 z-0"
					style={{
						background: isDark
							? "linear-gradient(to bottom, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.5), rgba(46, 204, 113, 0.3))"
							: "linear-gradient(to bottom, rgba(0, 80, 80, 0.3), #005050, rgba(0, 80, 80, 0.3))",
					}}>
					{/* Royal green glassmorphic blur effect */}
					<div className="absolute inset-0 blur-[2px]"></div>
				</div>
				{/* Timeline items in zigzag pattern */}
				<div className="relative z-10 space-y-24 md:space-y-40 py-6">
					{timeline.map((stage, index) => (
						<div key={index} className={`relative ${index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"}`}>
							{/* Connector circle - centered on vertical line with royal green */}
							<div
								className="hidden md:block absolute top-12 w-5 h-5 rounded-full z-20 left-1/2 transform -translate-x-1/2"
								style={{
									background: isDark
										? "linear-gradient(135deg, rgba(0, 50, 33, 0.8), rgba(2, 18, 4, 0.9))"
										: "linear-gradient(135deg, rgba(240, 255, 245, 0.8), rgba(220, 252, 231, 0.9))",
									border: isDark
										? "1px solid rgba(46, 204, 113, 0.4)"
										: "1px solid #005050",
									backdropFilter: "blur(8px)",
									boxShadow: isDark
										? "0 4px 12px rgba(46, 204, 113, 0.2)"
										: "0 4px 12px rgba(0, 80, 80, 0.15)",
								}}>
								{/* Inner pulse effect with royal green */}
								<div
									className="absolute inset-[3px] rounded-full animate-pulse"
									style={{
										background: isDark
											? "linear-gradient(to bottom right, rgba(46, 204, 113, 0.6), rgba(34, 197, 94, 0.6))"
											: "linear-gradient(to bottom right, rgba(0, 80, 80, 0.6), rgba(0, 100, 100, 0.6))",
									}}></div>
								{/* Outer glow effect */}
								<div
									className="absolute -inset-1 rounded-full animate-ping opacity-75 duration-1000 blur-sm"
									style={{
										background: isDark ? "rgba(46, 204, 113, 0.2)" : "rgba(0, 80, 80, 0.2)",
									}}></div>
							</div>
							{/* Horizontal connector line - connecting card to circle with royal green */}
							<div
								className={`hidden md:block absolute top-[3.1rem] h-[2px] z-10
								${index % 2 === 0 ? "left-[50%] right-[52%]" : "left-[52%] right-[50%]"}`}
								style={{
									background: isDark
										? index % 2 === 0
											? "linear-gradient(to left, rgba(46, 204, 113, 0.4), rgba(34, 197, 94, 0.4))"
											: "linear-gradient(to right, rgba(46, 204, 113, 0.4), rgba(34, 197, 94, 0.4))"
										: index % 2 === 0
										? "linear-gradient(to left, rgba(0, 80, 80, 0.4), #005050)"
										: "linear-gradient(to right, rgba(0, 80, 80, 0.4), #005050)",
									backdropFilter: "blur(2px)",
								}}>
								<div className="absolute inset-0 blur-[1px]"></div>
							</div>
							<TimelineItem
								index={index}
								stage={stage}
								icon={iconMap[index % iconMap.length]}
								isLeft={index % 2 === 0}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

interface TimelineItemProps {
	index: number;
	stage: TimelineStage;
	icon: React.ReactNode;
	isLeft: boolean;
}

const TimelineItem = ({ index, stage, icon, isLeft }: TimelineItemProps) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	// Adjusted image height with more consistency
	const imageHeight = "h-36";

	return (
		<motion.div 
			className="group"
			initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6, delay: index * 0.2 }}
			viewport={{ once: true }}>
			<div
				className={`relative rounded-2xl border transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-1 group-hover:scale-[1.02] p-2 md:p-2.5 cursor-pointer ${!isLeft ? "md:text-right" : ""}`}
				style={{
					background: isDark
						? "linear-gradient(135deg, rgba(0, 30, 20, 0.85) 0%, rgba(0, 40, 25, 0.7) 100%)"
						: "linear-gradient(135deg, rgba(240, 255, 245, 0.85) 0%, rgba(220, 252, 231, 0.7) 100%)",
					borderColor: isDark ? "rgba(46, 204, 113, 0.25)" : "rgba(16, 109, 32, 0.25)",
					backdropFilter: "blur(16px)",
					boxShadow: isDark
						? "0 16px 32px -8px rgba(46, 204, 113, 0.12), 0 0 0 1px rgba(46, 204, 113, 0.1), inset 0 1px 0 rgba(46, 204, 113, 0.2)"
						: "0 16px 32px -8px rgba(16, 109, 32, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
				}}>
				{/* Enhanced animated border glow on hover with royal green */}
				<div
					className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(46, 204, 113, 0.4) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(46, 204, 113, 0.4) 100%)"
							: "linear-gradient(135deg, rgba(16, 109, 32, 0.3) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(16, 109, 32, 0.3) 100%)",
						mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
						maskComposite: "xor",
						padding: "1px",
					}}></div>

				{/* Royal green light beam effect on hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out pointer-events-none overflow-hidden rounded-2xl">
					<div
						className="absolute top-0 left-0 w-[200%] h-full transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out skew-x-[-20deg]"
						style={{
							background: isDark
								? "linear-gradient(to right, transparent, rgba(46, 204, 113, 0.15), transparent)"
								: "linear-gradient(to right, transparent, rgba(16, 109, 32, 0.1), transparent)",
						}}></div>
				</div>

				<GlowingEffect
					spread={80}
					glow={true}
					disabled={false}
					proximity={100}
					inactiveZone={0.01}
					borderWidth={1.2}
				/>
				<div
					className="relative flex flex-col rounded-xl p-3 md:p-4 overflow-hidden"
					style={{
						background: isDark
							? "rgba(0, 40, 25, 0.6)"
							: "rgba(255, 255, 255, 0.4)",
						backdropFilter: "blur(8px)",
						borderWidth: "0.75px",
						borderStyle: "solid",
						borderColor: isDark ? "rgba(46, 204, 113, 0.2)" : "rgba(16, 109, 32, 0.2)",
						boxShadow: isDark
							? "0 8px 30px rgba(46, 204, 113, 0.05), inset 0 1px 0 rgba(46, 204, 113, 0.1)"
							: "0 8px 30px rgba(16, 109, 32, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
					}}>
					{/* Enhanced inner glow with royal green highlights */}
					<div
						className="absolute inset-0 rounded-xl"
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)"
								: "linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
						}}></div>
					<div
						className="absolute inset-0 rounded-xl"
						style={{
							background: isDark
								? "linear-gradient(225deg, rgba(46, 204, 113, 0.1) 0%, transparent 50%, rgba(34, 197, 94, 0.1) 100%)"
								: "linear-gradient(225deg, rgba(16, 109, 32, 0.1) 0%, transparent 50%, rgba(34, 197, 94, 0.1) 100%)",
						}}></div>
					<div className="relative flex flex-col h-full justify-between gap-2 z-10">
						<div className="flex items-center justify-between mb-1">
							<div
								className="w-fit rounded-lg border p-2 backdrop-blur-sm"
								style={{
									background: isDark
										? "rgba(0, 50, 33, 0.6)"
										: "rgba(255, 255, 255, 0.6)",
									borderColor: isDark ? "rgba(46, 204, 113, 0.2)" : "rgba(16, 109, 32, 0.2)",
									boxShadow: isDark
										? "0 4px 12px rgba(46, 204, 113, 0.05), inset 0 1px 0 rgba(46, 204, 113, 0.2)"
										: "0 4px 12px rgba(16, 109, 32, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
								}}>
								{icon}
							</div>
							<span
								className="text-sm font-medium px-3 py-1 rounded-full"
								style={{
									background: isDark
										? "rgba(46, 204, 113, 0.12)"
										: "rgba(16, 109, 32, 0.12)",
									color: isDark
										? "rgba(200, 240, 200, 0.9)"
										: "rgba(16, 109, 32, 0.9)",
									backdropFilter: "blur(8px)",
									border: isDark
										? "1px solid rgba(46, 204, 113, 0.3)"
										: "1px solid rgba(255, 255, 255, 0.6)",
									boxShadow: isDark
										? "0 2px 8px rgba(46, 204, 113, 0.05), inset 0 1px 0 rgba(46, 204, 113, 0.2)"
										: "0 2px 8px rgba(16, 109, 32, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
								}}>
								Step {index + 1}
							</span>
						</div>
						{/* Image section with fixed dimensions */}
						<div
							className={`relative ${imageHeight} w-full mb-2 overflow-hidden rounded-lg flex-shrink-0 group-hover:shadow-xl transition-all duration-500`}>
							{/* Elegant gradient overlay that works in both light and dark modes */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/5 z-10"></div>
							{/* Additional subtle royal green overlay for visual interest */}
							<div
								className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
								style={{
									background: isDark
										? "linear-gradient(135deg, rgba(46, 204, 113, 0.2) 0%, transparent 50%, rgba(34, 197, 94, 0.2) 100%)"
										: "linear-gradient(135deg, rgba(16, 109, 32, 0.2) 0%, transparent 50%, rgba(34, 197, 94, 0.2) 100%)",
								}}></div>
							{/* Border glow on hover */}
							<div
								className="absolute inset-0 rounded-lg border transition-all duration-500 z-20"
								style={{
									borderColor: isDark
										? "rgba(46, 204, 113, 0.0) group-hover:rgba(46, 204, 113, 0.3)"
										: "rgba(255, 255, 255, 0.0) group-hover:rgba(16, 109, 32, 0.3)",
								}}></div>
							<Image
								src={stage.image}
								alt={stage.badge}
								fill
								className="object-cover transition-transform group-hover:scale-105 duration-500"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="flex flex-col flex-1 min-h-0 relative px-4 py-2">
							{/* Subtle background for better text readability */}
							<div
								className="absolute inset-0 rounded-lg -z-10"
								style={{
									background: isDark
										? "rgba(0, 50, 33, 0.25)"
										: "rgba(255, 255, 255, 0.25)",
								}}></div>
							<h3
								className="text-xl/[1.3] font-semibold text-balance truncate"
								style={{
									color: isDark
										? "rgba(200, 240, 200, 0.9)"
										: "rgba(16, 109, 32, 0.9)",
								}}>
								{stage.badge}
							</h3>
							<h2
								className="text-sm/[1.1] mb-1.5 py-1 rounded-md inline-block"
								style={{
									color: isDark
										? "rgba(200, 240, 200, 0.7)"
										: "rgba(107, 114, 128, 1)",
								}}>
								{stage.date}
							</h2>
							{/* Description text with increased size for better readability */}
							<div
								className="text-sm/[1.4] overflow-y-auto flex-1 pr-1.5 scrollbar-thin scrollbar-track-transparent pb-3"
								style={{
									color: isDark
										? "rgba(200, 240, 200, 0.8)"
										: "rgba(40, 40, 80, 0.9)",
									scrollbarColor: isDark
										? "rgba(46, 204, 113, 0.3) transparent"
										: "rgba(16, 109, 32, 0.3) transparent",
									WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
									maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
								}}>
								{stage.description}
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const generalTimeLine = [
	{
		date: "14 September 2024 - 30 September 2024",
		description: (
			<>
				<p>
					This phase marks the official start of the hackathon, where teams will register and submit their
					project proposals. Over the course of two weeks, participants will outline their ideas, highlight
					the problems they aim to solve, and detail the technologies they plan to use. All submissions must
					adhere to the format specified by the organizers. This round sets the stage for the competition,
					offering a first look at the innovative solutions teams are set to develop.
				</p>
			</>
		),
		badge: "Registration and Submission",
		image: "/assets/tm-1.jpg",
	},
	{
		date: "1 October 2024 - 2 October 2024",
		description: (
			<>
				<p>
					This stage involves a thorough assessment of the ideas by a jury of experts based on their
					innovation, feasibility, and potential impact. The jury will shortlist a select number of
					submissions that demonstrate exceptional promise and align with the competition's goals. This stage
					is critical as it narrows down the pool of participants to those who will proceed to the more
					intensive phases of the hackathon, showcasing their innovative solutions to a broader audience and
					working towards final implementation.
				</p>
			</>
		),
		badge: "Round 1 Evaluation",
		image: "/assets/tm-2.jpg",
	},
	{
		date: "2 October 2024 - 6 October 2024",
		description: (
			<>
				<p>
					After the evaluation of all project proposals, the top 30 teams will be announced, qualifying for
					the offline round of the hackathon. Along with this announcement, the rulebook for the second round
					and all other relevant details will be released, providing teams with the guidelines and
					expectations for the next stage of the competition. Teams will be required to RSVP by 5th of October
					2024.
				</p>
			</>
		),
		badge: "Results for Round 1 and Rule Book release for Round 2",
		image: "/assets/tm-3.jpg",
	},
	{
		date: "16 October 2024 - 18 October 2024",
		description: (
			<>
				<p>
					The second round will be the offline execution phase at MIT, Manipal. It will be a 36-hour coding
					challenge where teams will code, implement, and present their solutions. Participants are required
					to stay on the premises for the entire duration of the round. The outcome of the challenge must be a{" "}
					<span className="italic">functional working prototype</span>.
				</p>
			</>
		),
		badge: "Round 2 Finals",
		image: "/assets/tm-4.jpg",
	},
];
