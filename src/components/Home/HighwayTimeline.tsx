"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Calendar, Clock, Flag, Target, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";


interface TimelineStage {
	date: string;
	description: React.ReactNode;
	badge: string;
	image: string;
}

export function HighwayTimeline({ timeline = generalTimeLine }: { timeline?: TimelineStage[] }): React.JSX.Element {
	const { theme } = useTheme();
	const isDarkTheme = theme !== "light";

	const iconMap = [
		<Flag key="flag" className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
		<Target key="target" className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
		<Calendar key="calendar" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
		<Clock key="clock" className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
	];

	// Define grid area configurations for each item
	const gridAreas = [
		"md:[grid-area:1/1/3/7] xl:[grid-area:1/1/3/7]", // Larger item spanning 2 rows
		"md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]", // Standard width item
		"md:[grid-area:3/1/5/7] xl:[grid-area:2/7/4/13]", // Medium height item
		"md:[grid-area:2/7/3/13] xl:[grid-area:3/1/4/7]", // Adjusted to match step 2 height
	];

	return (
		<div className="w-full py-8 px-4 md:px-6 lg:px-8">
			<ul className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-4 lg:gap-6 max-w-7xl mx-auto">
				{timeline.map((stage, index) => (
					<TimelineItem
						key={index}
						index={index}
						stage={stage}
						icon={iconMap[index % iconMap.length]}
						gridArea={gridAreas[index % gridAreas.length]}
					/>
				))}
			</ul>
		</div>
	);
}

interface TimelineItemProps {
	index: number;
	stage: TimelineStage;
	icon: React.ReactNode;
	gridArea: string;
}

const TimelineItem = ({ index, stage, icon, gridArea }: TimelineItemProps) => {
	const { theme } = useTheme();
	const isDarkTheme = theme !== "light";

	// Adjusted image height with more consistency
	const imageHeight = "h-36";

	return (
		<li className={`min-h-[14rem] list-none ${gridArea}`}>
			<div
				className="relative h-full rounded-2xl border border-gray-200/40 dark:border-white/10 p-2 md:p-2.5 cursor-pointer hover:border-purple-400/60 dark:hover:border-purple-500/60 transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-1 group"
				style={{
					background: isDarkTheme
						? 'rgba(0, 0, 0, 0.2)'
						: 'rgba(255, 255, 255, 0.7)',
					backdropFilter: 'blur(12px)',
					boxShadow: isDarkTheme
						? '0 8px 30px rgba(0, 0, 0, 0.3)'
						: '0 8px 30px rgba(0, 0, 0, 0.06)'
				}}
			>
				<GlowingEffect
					spread={50}
					glow={true}
					disabled={false}
					proximity={80}
					inactiveZone={0.01}
					borderWidth={1.5}
				/>
				<div
					className="relative flex h-full flex-col rounded-xl p-3 md:p-4 dark:shadow-[0px_0px_35px_0px_#2D2D2D] overflow-hidden"
					style={{
						background: isDarkTheme
							? 'rgba(15, 15, 25, 0.6)'
							: 'rgba(255, 255, 255, 0.8)',
						backdropFilter: 'blur(8px)',
						borderWidth: '0.75px',
						borderStyle: 'solid',
						borderColor: isDarkTheme
							? 'rgba(255, 255, 255, 0.08)'
							: 'rgba(255, 255, 255, 0.8)'
					}}
				>
					<div className="relative flex flex-col h-full justify-between gap-2">
						<div className="flex items-center justify-between mb-1">
							<div
								className="w-fit rounded-lg border p-2 backdrop-blur-sm"
								style={{
									background: isDarkTheme
										? 'rgba(0, 0, 0, 0.4)'
										: 'rgba(255, 255, 255, 0.9)',
									borderColor: isDarkTheme
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(190, 190, 255, 0.5)'
								}}
							>
								{icon}
							</div>
							<span
								className="text-sm font-medium px-3 py-1 rounded-full"
								style={{
									background: isDarkTheme
										? 'rgba(0, 0, 0, 0.4)'
										: 'rgba(110, 110, 234, 0.1)',
									color: isDarkTheme
										? 'rgba(180, 180, 220, 0.8)'
										: 'rgba(80, 70, 170, 0.9)'
								}}
							>
								Step {index + 1}
							</span>
						</div>

						{/* Image section with fixed dimensions */}
						<div className={`relative ${imageHeight} w-full mb-2 overflow-hidden rounded-lg flex-shrink-0`}>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
							<Image
								src={stage.image}
								alt={stage.badge}
								fill
								className="object-cover transition-transform group-hover:scale-105 duration-500"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>

						<div className="flex flex-col flex-1 min-h-0">
							<h3
								className="text-xl/[1.3] font-semibold text-balance truncate"
								style={{
									color: isDarkTheme
										? 'rgba(255, 255, 255, 0.95)'
										: 'rgba(30, 30, 60, 0.95)'
								}}
							>
								{stage.badge}
							</h3>
							<h2
								className="text-sm/[1.1] mb-1.5"
								style={{
									color: isDarkTheme
										? 'rgba(200, 200, 230, 0.8)'
										: 'rgba(80, 70, 120, 0.9)'
								}}
							>
								{stage.date}
							</h2>

							{/* Description text with increased size for better readability */}
							<div
								className="text-sm/[1.4] overflow-y-auto flex-1 pr-1.5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
								style={{
									color: isDarkTheme
										? 'rgba(200, 200, 230, 0.7)'
										: 'rgba(60, 60, 100, 0.8)',
									WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
									maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
								}}
							>
								{stage.description}
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
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