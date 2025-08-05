"use client";
import Image from "next/image";
import React from "react";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { useTheme } from "@/components/ThemeProvider";

export function GeneralTime(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<TracingBeam className="pl-8 sm:px-6">
			<div className="relative mx-auto max-w-2xl pt-4 antialiased">
				{generalTimeLine.map((item, index) => (
					<div
						key={`content-${index}`}
						className="my-10 rounded-xl overflow-hidden backdrop-blur-xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl group"
						style={{
							background: isDark
								? "rgba(0, 0, 0, 0.5)"
								: "rgba(255, 255, 255, 0.8)",
							borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
							boxShadow: isDark
								? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
								: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
						}}>

						<div className="relative p-4 sm:p-6 z-10">
							<h2
								className="mb-2 w-fit rounded-full text-3xl font-bold"
								style={{
									color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)",
								}}>
								{item.badge}
							</h2>

							<p className="mb-4 text-lg font-medium opacity-90"
								style={{
									color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
								}}>
								{item.date}
							</p>

							<div className="flex w-full flex-col">
								{item.image && (
									<div className="relative mb-6 rounded-lg overflow-hidden border transition-colors duration-300"
										style={{
											borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
										}}>
										<Image
											src={item.image}
											alt="blog thumbnail"
											height="650"
											width="650"
											className="w-full h-auto object-cover"
										/>
										{/* Subtle overlay for better integration */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
									</div>
								)}
								<div
									className="w-full text-balance text-sm tracking-wide leading-relaxed"
									style={{
										color: isDark ? "rgba(200, 220, 200, 0.9)" : "rgba(60, 60, 80, 0.9)",
										lineHeight: "1.6"
									}}>
									{item.description}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</TracingBeam>
	);
}

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
					submissions that demonstrate exceptional promise and align with the competition’s goals. This stage
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
	// {
	//  date: "18 October 2024",
	//  description: (
	//      <>
	//          <p>
	//              As the event culminates, anticipation will build for the announcement of results. On July 8, the
	//              winning teams will be celebrated for their groundbreaking solutions and outstanding performances.
	//              The results will highlight the best in innovation and creativity, setting the winners apart as
	//              leaders in the tech community. Prizes and recognition will be awarded, marking the end of an
	//              inspiring and competitive hackathon journey.
	//          </p>
	//      </>
	//  ),
	//  badge: "Results",
	//  image: "/assets/tm-5.jpg",
	// },
];
