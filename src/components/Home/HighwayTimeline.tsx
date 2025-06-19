"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hyperspeed from "./hyperspeed";

interface TimelineStage {
	date: string;
	description: React.ReactNode;
	badge: string;
	image: string;
}

export function HighwayTimeline({ timeline = generalTimeLine }: { timeline?: TimelineStage[] }): React.JSX.Element {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isHyperSpeed, setIsHyperSpeed] = useState(false);
	const timelineRef = useRef<HTMLDivElement>(null);
	const dragConstraintsRef = useRef<HTMLDivElement>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Transition to next stage with improved timing
	const nextStage = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setIsHyperSpeed(true);

		setTimeout(() => {
			setActiveIndex((prev) => (prev + 1) % timeline.length);
			setTimeout(() => {
				setIsHyperSpeed(false);
				setIsTransitioning(false);
			}, 600);
		}, 400);
	};

	// Transition to previous stage with improved timing
	const prevStage = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setIsHyperSpeed(true);

		setTimeout(() => {
			setActiveIndex((prev) => (prev - 1 + timeline.length) % timeline.length);
			setTimeout(() => {
				setIsHyperSpeed(false);
				setIsTransitioning(false);
			}, 600);
		}, 400);
	};

	const handleDragEnd = (event: any, info: any) => {
		if (isTransitioning) return;

		if (info.offset.x < -100) {
			nextStage();
		} else if (info.offset.x > 100) {
			prevStage();
		}
	};

	// Handle scroll events to navigate between stages
	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			if (timelineRef.current && timelineRef.current.contains(event.target as Node)) {
				event.preventDefault();

				if (isTransitioning) return;

				// Detect scroll direction
				if (event.deltaY > 20) {
					nextStage();
				} else if (event.deltaY < -20) {
					prevStage();
				}
			}
		};

		// Add wheel event listener with passive: false to allow preventDefault
		window.addEventListener("wheel", handleScroll, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [isTransitioning]);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isTransitioning) return;

			if (event.key === "ArrowRight") {
				nextStage();
			} else if (event.key === "ArrowLeft") {
				prevStage();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTransitioning]);

	return (
		<motion.div
			className="relative backdrop-blur-2xl bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/2 border border-black/10 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
			viewport={{ once: true }}
			style={{
				boxShadow: `
          0 20px 50px -12px rgba(0, 0, 0, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.2),
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2)
        `,
			}}>
			<div className="absolute inset-0 opacity-50">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-purple-500/5"></div>
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/40 to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
			</div>

			<div className="relative w-full h-[550px] overflow-hidden" ref={timelineRef}>
				{/* Background Hyperspeed Effect - Centered properly */}
				<div className="absolute inset-0 z-0 flex items-center justify-center">
					<div className="absolute inset-0 transform-gpu translate-x-[-5%]">
						<Hyperspeed
							effectOptions={{
								speedUp: isHyperSpeed ? 2 : 0.2, // Slower default speed, smoother acceleration
								length: 800, // Longer loop length
								colors: {
									roadColor: 0x1a1a24, // Lighter road color (was 0x0f0f13)
									islandColor: 0x24243a, // Lighter island color (was 0x13131a)
									background: 0x121220, // Lighter background (was 0x070711)
									shoulderLines: 0xa855f7, // Brighter purple (was 0x9333ea)
									brokenLines: 0x818cf8, // Brighter indigo (was 0x6366f1)
									leftCars: [0xd8b4fe, 0xa78bfa, 0xc084fc], // Brighter purple/violet shades
									rightCars: [0x818cf8, 0x6366f1, 0x60a5fa], // Brighter blue/indigo shades
									sticks: 0xc084fc, // Brighter purple for sticks (was 0x9333ea)
								},
								isHyper: isHyperSpeed,
								fov: isHyperSpeed ? 100 : 90,
								// Adjust distances for better center alignment
								roadWidth: 20, // Slightly wider road
								islandWidth: 2.5,
								lightStickWidth: [0.15, 0.6], // Wider light sticks for visibility
								lightPairsPerRoadWay: 80, // More lights for smoother appearance
								totalSideLightSticks: 30, // More side sticks
								carLightsLength: [800 * 0.06, 800 * 0.4], // Adjusted for longer path
								movingAwaySpeed: [40, 60], // Slower movement for smoother flow
								movingCloserSpeed: [-80, -120], // Slower movement for smoother flow
							}}
						/>
					</div>
				</div>

				{/* Navigation Controls - Only arrows */}
				<div className="absolute top-1/2 left-8 right-8 sm:left-12 sm:right-12 z-20 flex justify-between transform -translate-y-1/2 pointer-events-none">
					<motion.button
						initial={{ opacity: 0.7 }}
						whileHover={{
							opacity: 1,
							scale: 1.1,
							boxShadow: "0 0 15px 2px rgba(0, 0, 0, 0.3)",
						}}
						transition={{ duration: 0.2 }}
						onClick={prevStage}
						className="p-4 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md text-black dark:text-white shadow-lg pointer-events-auto transition-all border border-black/20 dark:border-white/20"
						aria-label="Previous Stage">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<polyline points="15 18 9 12 15 6"></polyline>
						</svg>
					</motion.button>
					<motion.button
						initial={{ opacity: 0.7 }}
						whileHover={{
							opacity: 1,
							scale: 1.1,
							boxShadow: "0 0 15px 2px rgba(0, 0, 0, 0.3)",
						}}
						transition={{ duration: 0.2 }}
						onClick={nextStage}
						className="p-4 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md text-black dark:text-white shadow-lg pointer-events-auto transition-all border border-black/20 dark:border-white/20"
						aria-label="Next Stage">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</motion.button>
				</div>

				{/* Content Area */}
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<div ref={dragConstraintsRef} className="w-full max-w-full px-6 py-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeIndex}
								initial={{ opacity: 0, x: 200 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -200 }}
								transition={{ type: "spring", stiffness: 100, damping: 20 }}
								drag="x"
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={0.2}
								onDragEnd={handleDragEnd}
								className="w-full mx-auto">
								<div className="bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl relative border border-black/10 dark:border-white/15">
									<div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/10 via-transparent to-purple-500/5 pointer-events-none"></div>
									<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/30 to-transparent"></div>
									<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent"></div>

									<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
										{/* Image Section */}
										<div className="relative h-80 lg:h-[350px] overflow-hidden">
											<div className="absolute inset-0 bg-black/30 z-10"></div>
											<Image
												src={timeline[activeIndex].image}
												alt={timeline[activeIndex].badge}
												fill
												className="object-cover z-0"
												priority
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
											<div className="absolute bottom-0 left-0 p-6 md:p-8 z-30">
												<span className="inline-block px-6 py-2 mb-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500/90 to-purple-700/90 backdrop-blur-md shadow-lg border border-white/20">
													{timeline[activeIndex].badge}
												</span>
												<h3 className="text-white text-xl md:text-2xl font-medium drop-shadow-md">
													{timeline[activeIndex].date}
												</h3>
											</div>
										</div>

										{/* Content Section */}
										<div className="p-6 md:p-8 lg:p-10 relative">
											<div className="prose prose-lg dark:prose-invert max-w-none">
												{timeline[activeIndex].description}
											</div>

											<div className="mt-8 flex items-center gap-4">
												<span className="text-sm text-white/70 font-medium">
													Stage {activeIndex + 1} of {timeline.length}
												</span>
												<div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
													<div
														className="h-full bg-gradient-to-r from-purple-500 to-blue-500 relative"
														style={{
															width: `${((activeIndex + 1) / timeline.length) * 100}%`,
														}}>
														<div className="absolute top-0 inset-x-0 h-px bg-white/40"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</motion.div>
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

