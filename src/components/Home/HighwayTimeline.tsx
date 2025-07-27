"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Clock, Flag, Target } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";

interface TimelineStage {
	date: string;
	description: React.ReactNode;
	badge: string;
	image: string;
}

export function HighwayTimeline({ timeline = generalTimeLine }: { timeline?: TimelineStage[] }): React.JSX.Element {
	const iconMap = [
		<Flag key="flag" className="h-5 w-5 text-purple-600" />,
		<Target key="target" className="h-5 w-5 text-blue-600" />,
		<Calendar key="calendar" className="h-5 w-5 text-indigo-600" />,
		<Clock key="clock" className="h-5 w-5 text-cyan-600" />,
	];
	return (
		<div className="w-full py-16 px-4 md:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto relative">
				{/* Subtle glass background for the entire timeline section */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 via-white/8 to-transparent -z-10 backdrop-blur-sm"></div>

				{/* Title section */}
				<div className="relative mb-16 text-center">
					<motion.div
											className="relative inline-block mb-8"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5 }}
											viewport={{ once: true }}>
											<h2
												className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]"
												style={{ fontFamily: "var(--font-playfair-display)" }}>
												 Event Timeline
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
				</div>

				{/* Vertical timeline line - perfectly centered */}
				<div
					className="absolute left-1/2 top-24 bottom-0 w-[2px] hidden md:block transform -translate-x-1/2 
					bg-gradient-to-b from-purple-300/20 via-indigo-400/40 to-blue-300/20 z-0 h-[calc(100%+100vh)]">
					{/* Glassmorphic blur effect */}
					<div className="absolute inset-0 blur-[2px]"></div>
				</div>
				{/* Timeline items in zigzag pattern */}
				<div className="relative z-10 space-y-24 md:space-y-40 py-6">
					{timeline.map((stage, index) => (
						<div key={index} className={`relative ${index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"}`}>
							{" "}
							{/* Connector circle - centered on vertical line */}
							<div
								className={`hidden md:block absolute top-12 w-5 h-5 rounded-full z-20
								left-1/2 transform -translate-x-1/2
								bg-white/30 backdrop-blur-md border border-white/40 shadow-lg`}>
								{/* Inner pulse effect */}
								<div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-indigo-400/60 to-purple-500/60 animate-pulse"></div>
								{/* Outer glow effect */}
								<div className="absolute -inset-1 rounded-full bg-indigo-400/20 animate-ping opacity-75 duration-1000 blur-sm"></div>
							</div>
							{/* Horizontal connector line - connecting card to circle */}
							<div
								className={`hidden md:block absolute top-[3.1rem] h-[2px] z-10
								${index % 2 === 0 ? "left-[50%] right-[52%]" : "left-[52%] right-[50%]"}
								${index % 2 === 0 ? "bg-gradient-to-l" : "bg-gradient-to-r"}
								from-purple-400/30 to-indigo-400/30 backdrop-blur-sm`}>
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
	// Adjusted image height with more consistency
	const imageHeight = "h-36";

	return (
		<div className="group">
			{" "}
			<div
				className={`relative rounded-2xl border border-white/50 p-2 md:p-2.5 
				  cursor-pointer hover:border-purple-400/60 
				  transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-1 group-hover:scale-[1.02]
				  ${!isLeft ? "md:text-right" : ""}`}
				style={{
					background: "rgba(255, 255, 255, 0.15)",
					backdropFilter: "blur(12px)",
					boxShadow:
						"0 32px 64px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
				}}>
				{/* Enhanced Smooth Light Beam Effect */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out rounded-2xl overflow-hidden">
					{/* Multiple layered beams for smoother effect */}
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out blur-sm"></div>
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1800 ease-out delay-100"></div>
				</div>{" "}
				<GlowingEffect
					spread={80}
					glow={true}
					disabled={false}
					proximity={100}
					inactiveZone={0.01}
					borderWidth={1.2}
				/>{" "}
				<div
					className="relative flex flex-col rounded-xl p-3 md:p-4 overflow-hidden"
					style={{
						background: "rgba(255, 255, 255, 0.4)",
						backdropFilter: "blur(8px)",
						borderWidth: "0.75px",
						borderStyle: "solid",
						borderColor: "rgba(255, 255, 255, 0.6)",
						boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
					}}>
					{" "}
					{/* Enhanced inner glow with subtle highlights */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/10 to-transparent rounded-xl"></div>
					<div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-purple-500/10 rounded-xl"></div>
					<div className="relative flex flex-col h-full justify-between gap-2 z-10">
						<div className="flex items-center justify-between mb-1">
							{" "}
							<div
								className="w-fit rounded-lg border p-2 backdrop-blur-sm"
								style={{
									background: "rgba(255, 255, 255, 0.6)",
									borderColor: "rgba(255, 255, 255, 0.8)",
									boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
								}}>
								{icon}
							</div>{" "}
							<span
								className="text-sm font-medium px-3 py-1 rounded-full"
								style={{
									background: "rgba(100, 100, 230, 0.15)",
									color: "rgba(60, 50, 160, 0.9)",
									backdropFilter: "blur(8px)",
									border: "1px solid rgba(255, 255, 255, 0.6)",
									boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
								}}>
								Step {index + 1}
							</span>
						</div>{" "}
						{/* Image section with fixed dimensions */}
						<div
							className={`relative ${imageHeight} w-full mb-2 overflow-hidden rounded-lg flex-shrink-0 group-hover:shadow-xl transition-all duration-500`}>
							{/* Elegant gradient overlay that works in both light and dark modes */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/5 z-10"></div>
							{/* Additional subtle colored overlay for visual interest */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							{/* Border glow on hover */}
							<div className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/30 transition-all duration-500 z-20"></div>
							<Image
								src={stage.image}
								alt={stage.badge}
								fill
								className="object-cover transition-transform group-hover:scale-105 duration-500"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="flex flex-col flex-1 min-h-0 relative px-4 py-2">
							{/* Subtle background for better text readability in light mode */}{" "}
							<div className="absolute inset-0 bg-white/25 rounded-lg -z-10"></div>
							<h3
								className="text-xl/[1.3] font-semibold text-balance truncate"
								style={{
									color: "rgba(30, 20, 60, 0.95)",
								}}>
								{stage.badge}
							</h3>{" "}
							<h2 className="text-sm/[1.1] mb-1.5 py-1 rounded-md inline-block text-black">{stage.date}</h2>{" "}
							{/* Description text with increased size for better readability */}
							<div
								className="text-sm/[1.4] overflow-y-auto flex-1 pr-1.5 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pb-3"
								style={{
									color: "rgba(40, 40, 80, 0.9)",
									WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
									maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
								}}>
								{stage.description}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
