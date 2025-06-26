"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, ArrowLeftIcon, ExternalLinkIcon, SparklesIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Problem, sdgColorMap, sdgIconMap } from "@/hooks/useProblem";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface PSCardsProps {
	filter: string;
	problems: Problem[];
}

const PS_CARD_DESCRIPTION_MAXLEN = 300;

export function PSCards({ filter, problems }: PSCardsProps): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const player = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});
	const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
	const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	const sdgIcon = (sdg_id: number): React.ReactElement | null => {
		const Icon = sdgIconMap[sdg_id];
		return Icon ? <Icon className="mr-2 h-4 w-4" /> : null;
	};

	// Function to handle image load errors
	const handleImageError = (index: number) => {
		setImageErrors((prev) => ({
			...prev,
			[index]: true,
		}));
	};

	// Function to get fallback image based on SDG ID
	const getFallbackImage = (sdgId: number) => {
		// List of available SDG images to prevent 404 errors
		const availableSdgImages = [3, 4, 8, 9]; // Add more as they become available

		// If the SDG image exists, use it; otherwise use a generic placeholder
		if (availableSdgImages.includes(sdgId)) {
			return `/assets/sdg_${sdgId}.png`;
		} else {
			// Use a generic placeholder or one of the existing SDG images
			return "/placeholder.png"; // This uses the placeholder.png file in your public directory
		}
	};

	return (
		<div className="relative py-8">
			{/* Enhanced decorative background elements */}
			<div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
			<div
				className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-700/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
				style={{ animationDelay: "1s" }}></div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-purple-500/5 dark:bg-purple-800/5 rounded-full blur-3xl pointer-events-none"></div>

			{/* Gradient line accent */}
			<div className="absolute left-0 right-0 h-[1px] top-0 bg-gradient-to-r from-transparent via-purple-300/40 dark:via-purple-500/40 to-transparent"></div>
			<div className="absolute left-0 right-0 h-[1px] bottom-0 bg-gradient-to-r from-transparent via-purple-300/30 dark:via-purple-500/30 to-transparent"></div>

			{/* Floating particles (decorative) */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/20 dark:bg-purple-600/20 animate-float-slow"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDuration: `${Math.floor(Math.random() * 8) + 5}s`,
							animationDelay: `${Math.random() * 5}s`,
						}}></div>
				))}
			</div>

			<Carousel
				className="w-full relative z-10"
				plugins={[player.current]}
				onMouseEnter={player.current.stop}
				onMouseLeave={(): void => player.current.play()}
				opts={{
					loop: true,
					align: "start",
				}}>
				<CarouselContent className="flex py-4 px-4 md:px-10 lg:px-20">
					{(filter === "all" ? problems : problems.filter((problem) => problem.type === filter)).map(
						(ps, index) => (
							<CarouselItem
								key={index}
								className="group flex-shrink-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 px-3 py-2 min-w-72">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ y: -5 }}
									onHoverStart={() => setHoveredCard(index)}
									onHoverEnd={() => setHoveredCard(null)}>
									<Card
										className={`relative h-full min-h-[380px] md:min-h-[320px] lg:min-h-[300px] xl:min-h-[280px] rounded-xl overflow-hidden transition-all duration-500 transform-gpu ${
											hoveredCard === index ? "scale-[1.02]" : ""
										}`}
										style={{
											background: isDark
												? "linear-gradient(135deg, rgba(30,30,45,0.7) 0%, rgba(35,35,60,0.5) 100%)"
												: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.7) 100%)",
											backdropFilter: "blur(16px)",
											boxShadow: isDark
												? `0 10px 30px -5px rgba(0,0,0,0.3), 
												   0 0 0 1px rgba(103,80,164,0.2),
												   inset 0 1px 0 0 rgba(255,255,255,0.05)`
												: `0 10px 30px -5px rgba(103,80,164,0.15), 
												   0 0 0 1px rgba(132,95,220,0.2),
												   inset 0 1px 0 0 rgba(255,255,255,0.8)`,
											borderRadius: "16px",
											border: isDark
												? "1px solid rgba(103,80,164,0.3)"
												: "1px solid rgba(132,95,220,0.25)",
										}}>
										{/* Enhanced animated border glow on hover */}
										<div
											className={`absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none ${
												hoveredCard === index ? "opacity-100" : "opacity-0"
											}`}
											style={{
												background: isDark
													? "linear-gradient(135deg, rgba(103,80,164,0.4) 0%, rgba(149,128,255,0.2) 50%, rgba(103,80,164,0.4) 100%)"
													: "linear-gradient(135deg, rgba(132,95,220,0.3) 0%, rgba(180,160,255,0.15) 50%, rgba(132,95,220,0.3) 100%)",
												mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
												maskComposite: "xor",
												padding: "1px",
												borderRadius: "16px",
											}}></div>

										{/* Light beam effect on hover */}
										<div
											className={`absolute inset-0 opacity-0 ${hoveredCard === index ? "group-hover:opacity-100" : ""} transition-all duration-1500 ease-out pointer-events-none overflow-hidden rounded-xl`}>
											<div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out skew-x-[-20deg]"></div>
										</div>

										{/* Corner decorative sparkles */}
										<div
											className={`absolute top-3 left-3 opacity-0 transition-opacity duration-500 ${hoveredCard === index ? "opacity-70" : ""}`}>
											<SparklesIcon
												className="h-4 w-4"
												style={{
													color: isDark ? "rgba(180,160,255,0.8)" : "rgba(132,95,220,0.6)",
												}}
											/>
										</div>
										<div
											className={`absolute bottom-3 right-3 opacity-0 transition-opacity duration-500 ${hoveredCard === index ? "opacity-70" : ""}`}>
											<SparklesIcon
												className="h-4 w-4"
												style={{
													color: isDark ? "rgba(180,160,255,0.8)" : "rgba(132,95,220,0.6)",
												}}
											/>
										</div>

										<CardContent className="flex h-full flex-col items-center justify-between relative z-10">
											{/* Enhanced image with advanced gradient overlay */}
											<div
												className="relative w-full mb-5 overflow-hidden rounded-lg group-hover:shadow-lg transition-all duration-500"
												style={{
													boxShadow: isDark
														? "0 4px 20px rgba(0,0,0,0.2)"
														: "0 4px 20px rgba(103,80,164,0.15)",
												}}>
												<Image
													src={
														imageErrors[index] ? getFallbackImage(ps.sdg_id) : ps.thumbnail
													}
													alt={`Problem statement ${index + 1}`}
													width={300}
													height={300}
													className="w-full transition-transform duration-500 group-hover:scale-110"
													onError={() => handleImageError(index)}
												/>
												{/* Enhanced gradient overlay */}
												<div
													className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-20"
													style={{
														background: isDark
															? "linear-gradient(to top, rgba(103,80,164,0.6) 0%, rgba(103,80,164,0) 60%)"
															: "linear-gradient(to top, rgba(132,95,220,0.4) 0%, rgba(132,95,220,0) 60%)",
													}}></div>

												{/* Animated highlight on hover */}
												<div
													className={`absolute inset-0 opacity-0 ${hoveredCard === index ? "group-hover:opacity-10" : ""} transition-opacity duration-500`}
													style={{
														background: isDark
															? "radial-gradient(circle at center, rgba(180,160,255,0.8) 0%, transparent 70%)"
															: "radial-gradient(circle at center, rgba(180,160,255,0.6) 0%, transparent 70%)",
													}}></div>

												{/* Animated corner shine on hover */}
												<div
													className={`absolute top-0 left-0 w-[50px] h-[50px] opacity-0 ${hoveredCard === index ? "group-hover:opacity-70" : ""} transition-opacity duration-500 pointer-events-none rotate-45 translate-x-[-30%] translate-y-[-30%]`}
													style={{
														background: isDark
															? "linear-gradient(45deg, rgba(255,255,255,0.4) 0%, transparent 70%)"
															: "linear-gradient(45deg, rgba(255,255,255,0.7) 0%, transparent 70%)",
													}}></div>
											</div>

											<Badge
												className={`absolute right-6 top-6 backdrop-blur-md shadow-lg transition-all duration-300 ${
													hoveredCard === index ? "scale-110" : ""
												} ${sdgColorMap[ps.sdg_id]}`}
												style={{
													boxShadow: isDark
														? "0 4px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
														: "0 4px 12px rgba(103,80,164,0.2), 0 0 0 1px rgba(255,255,255,0.8)",
												}}
												variant="default">
												{sdgIcon(ps.sdg_id)}
												{`SDG-${ps.sdg_id}`}
											</Badge>

											<div
												className={`text-center w-full ${isDark ? "text-[rgba(230,210,255,0.95)]" : "text-[rgba(50,50,70,0.95)]"}`}>
												<h3
													className={`text-lg font-semibold mb-4 tracking-wide ${
														isDark
															? "text-[rgba(240,225,255,1)]"
															: "text-[rgba(103,80,164,1)]"
													}`}
													style={{
														textShadow: isDark
															? "0 2px 4px rgba(0,0,0,0.2)"
															: "0 1px 2px rgba(103,80,164,0.1)",
														fontSize: "clamp(1rem, 2vw, 1.125rem)",
														minHeight: "2.5rem",
													}}>
													{ps.title}
												</h3>
												<p
													className="text-justify text-sm leading-relaxed opacity-85 transition-all duration-300 group-hover:opacity-100"
													style={{
														fontSize: "clamp(0.85rem, 1.5vw, 0.875rem)",
														minHeight: "100px",
													}}>
													{ps.description.length > PS_CARD_DESCRIPTION_MAXLEN
														? `${ps.description.slice(0, PS_CARD_DESCRIPTION_MAXLEN)}...`
														: ps.description}
												</p>
											</div>

											<div className="mt-6 w-full text-center">
												<Dialog
													onOpenChange={(open) => {
														setIsDialogOpen(open);
														if (open) setSelectedCard(index);
													}}>
													<DialogTrigger asChild>
														<Button
															variant="secondary"
															className={`w-full cursor-pointer relative overflow-hidden group-hover:shadow-md transition-all duration-500 flex items-center justify-center gap-2 ${
																isDark
																	? "bg-gradient-to-r from-[rgba(103,80,164,0.3)] to-[rgba(132,95,220,0.4)] text-[rgba(240,225,255,0.95)] hover:from-[rgba(103,80,164,0.4)] hover:to-[rgba(132,95,220,0.5)]"
																	: "bg-gradient-to-r from-[rgba(132,95,220,0.15)] to-[rgba(149,128,255,0.25)] text-[rgba(103,80,164,0.95)] hover:from-[rgba(132,95,220,0.2)] hover:to-[rgba(149,128,255,0.3)]"
															}`}
															style={{
																borderRadius: "8px",
																border: isDark
																	? "1px solid rgba(103,80,164,0.4)"
																	: "1px solid rgba(132,95,220,0.3)",
																height: "42px",
															}}>
															<span className="relative z-10">Explore Details</span>
															<ExternalLinkIcon className="h-4 w-4 relative z-10" />

															{/* Button highlight effect */}
															<div
																className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
																style={{
																	background: isDark
																		? "radial-gradient(circle at center, rgba(149,128,255,0.4) 0%, transparent 70%)"
																		: "radial-gradient(circle at center, rgba(149,128,255,0.2) 0%, transparent 70%)",
																}}></div>
														</Button>
													</DialogTrigger>
													<AnimatePresence>
														{isDialogOpen && selectedCard === index && (
															<DialogContent
																className="rounded-xl overflow-hidden border-0 flex flex-col"
																style={{
																	height: "90vh",
																	width: "90%",
																	maxWidth: "700px",
																	background: isDark
																		? "linear-gradient(135deg, rgba(25,25,35,0.85) 0%, rgba(35,35,50,0.85) 100%)"
																		: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,255,0.95) 100%)",
																	backdropFilter: "blur(16px)",
																	boxShadow: isDark
																		? `0 20px 60px -10px rgba(0,0,0,0.5), 
																		0 0 0 1px rgba(103,80,164,0.3),
																		inset 0 1px 0 0 rgba(255,255,255,0.05)`
																		: `0 20px 60px -10px rgba(103,80,164,0.2), 
																		0 0 0 1px rgba(132,95,220,0.2),
																		inset 0 1px 0 0 rgba(255,255,255,0.8)`,
																	borderRadius: "16px",
																	border: isDark
																		? "1px solid rgba(103,80,164,0.4)"
																		: "1px solid rgba(132,95,220,0.3)",
																}}>
																{/* Animated dialog elements */}
																<motion.div
																	initial={{ opacity: 0 }}
																	animate={{ opacity: 1 }}
																	exit={{ opacity: 0 }}
																	transition={{ duration: 0.3 }}
																	className="absolute inset-0 pointer-events-none">
																	{/* Dialog decorative elements */}
																	<div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
																	<div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-700/10 rounded-full blur-3xl"></div>

																	{/* Shimmering header accent */}
																	<div className="absolute top-0 left-0 right-0 h-[60px] overflow-hidden">
																		<div
																			className="absolute inset-0 opacity-10"
																			style={{
																				background: isDark
																					? "linear-gradient(to bottom, rgba(103,80,164,0.8) 0%, transparent 100%)"
																					: "linear-gradient(to bottom, rgba(132,95,220,0.4) 0%, transparent 100%)",
																			}}></div>
																		<div
																			className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
																			style={{
																				transform: "translateX(-100%)",
																			}}></div>
																	</div>

																	{/* Floating particles */}
																	{[...Array(6)].map((_, i) => (
																		<div
																			key={i}
																			className="absolute w-1 h-1 rounded-full bg-purple-400/30 dark:bg-purple-600/30 animate-float-slow"
																			style={{
																				top: `${Math.random() * 100}%`,
																				left: `${Math.random() * 100}%`,
																				animationDuration: `${Math.floor(Math.random() * 8) + 5}s`,
																				animationDelay: `${Math.random() * 5}s`,
																			}}></div>
																	))}
																</motion.div>

																<DialogHeader className="relative z-10">
																	<motion.div
																		initial={{ opacity: 0, y: -20 }}
																		animate={{ opacity: 1, y: 0 }}
																		transition={{ duration: 0.5 }}>
																		<DialogTitle
																			className={`text-center text-xl font-bold tracking-wide ${
																				isDark
																					? "text-[rgba(240,225,255,1)]"
																					: "text-[rgba(103,80,164,1)]"
																			}`}
																			style={{
																				textShadow: isDark
																					? "0 2px 4px rgba(0,0,0,0.2)"
																					: "0 1px 2px rgba(103,80,164,0.1)",
																			}}>
																			{ps.title}
																		</DialogTitle>
																	</motion.div>
																</DialogHeader>

																<div className="overflow-y-auto flex-grow px-2 relative z-10">
																	<DialogDescription
																		className={`text-justify ${
																			isDark
																				? "text-[rgba(230,210,255,0.95)]"
																				: "text-[rgba(50,50,70,0.95)]"
																		}`}>
																		<motion.div
																			initial={{ opacity: 0, y: 20 }}
																			animate={{ opacity: 1, y: 0 }}
																			transition={{ duration: 0.5, delay: 0.1 }}
																			className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-4 md:space-y-0 md:space-x-6 mb-6 p-4 rounded-lg"
																			style={{
																				background: isDark
																					? "rgba(103,80,164,0.15)"
																					: "rgba(132,95,220,0.08)",
																				border: isDark
																					? "1px solid rgba(103,80,164,0.3)"
																					: "1px solid rgba(132,95,220,0.2)",
																				boxShadow:
																					"inset 0 1px 0 0 rgba(255,255,255,0.05)",
																			}}>
																			<div className="text-center md:text-left">
																				<DialogTitle
																					className={`mb-3 text-lg font-semibold ${
																						isDark
																							? "text-[rgba(240,225,255,1)]"
																							: "text-[rgba(103,80,164,1)]"
																					}`}>
																					Sustainable Development Goal
																				</DialogTitle>
																				<span
																					className={`text-2xl font-bold ${
																						isDark
																							? "text-[rgba(230,210,255,0.95)]"
																							: "text-[rgba(103,80,164,0.9)]"
																					}`}>
																					{ps.sdg_id}
																				</span>
																				<div
																					className={`mt-2 inline-block rounded-md px-3 py-1 ${sdgColorMap[ps.sdg_id]}`}>
																					{sdgIcon(ps.sdg_id)}
																					{`SDG-${ps.sdg_id}`}
																				</div>
																			</div>

																			<div
																				className="relative rounded-lg overflow-hidden"
																				style={{
																					boxShadow: isDark
																						? "0 8px 30px rgba(0,0,0,0.3)"
																						: "0 8px 30px rgba(103,80,164,0.2)",
																				}}>
																				<Image
																					src={`/assets/sdg_${ps.sdg_id}.png`}
																					alt={`SDG ${ps.sdg_id}`}
																					width={140}
																					height={140}
																					className="rounded-md"
																				/>
																				{/* Light highlight effect */}
																				<div
																					className="absolute inset-0 opacity-30"
																					style={{
																						background:
																							"radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)",
																					}}></div>
																			</div>
																		</motion.div>

																		<motion.div
																			initial={{ opacity: 0, y: 20 }}
																			animate={{ opacity: 1, y: 0 }}
																			transition={{ duration: 0.5, delay: 0.2 }}
																			className="mb-6 p-4 rounded-lg"
																			style={{
																				background: isDark
																					? "rgba(30,30,40,0.3)"
																					: "rgba(245,245,255,0.5)",
																				border: isDark
																					? "1px solid rgba(103,80,164,0.2)"
																					: "1px solid rgba(132,95,220,0.15)",
																			}}>
																			<DialogTitle
																				className={`mb-3 text-lg font-semibold ${
																					isDark
																						? "text-[rgba(240,225,255,1)]"
																						: "text-[rgba(103,80,164,1)]"
																				}`}>
																				Problem
																			</DialogTitle>
																			<div className="leading-relaxed">
																				{ps.description}
																			</div>
																		</motion.div>

																		<motion.div
																			initial={{ opacity: 0, y: 20 }}
																			animate={{ opacity: 1, y: 0 }}
																			transition={{ duration: 0.5, delay: 0.3 }}
																			className="p-4 rounded-lg"
																			style={{
																				background: isDark
																					? "rgba(30,30,40,0.3)"
																					: "rgba(245,245,255,0.5)",
																				border: isDark
																					? "1px solid rgba(103,80,164,0.2)"
																					: "1px solid rgba(132,95,220,0.15)",
																			}}>
																			<DialogTitle
																				className={`mb-3 text-lg font-semibold ${
																					isDark
																						? "text-[rgba(240,225,255,1)]"
																						: "text-[rgba(103,80,164,1)]"
																				}`}>
																				Features Expected
																			</DialogTitle>
																			<ul className="list-disc text-wrap pl-5 space-y-2">
																				{ps.features.map((feature, i) => (
																					<motion.li
																						key={i}
																						className="leading-relaxed"
																						initial={{ opacity: 0, x: -10 }}
																						animate={{ opacity: 1, x: 0 }}
																						transition={{
																							duration: 0.3,
																							delay: 0.3 + i * 0.1,
																						}}>
																						{feature}
																					</motion.li>
																				))}
																			</ul>
																		</motion.div>
																	</DialogDescription>
																</div>
															</DialogContent>
														)}
													</AnimatePresence>
												</Dialog>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							</CarouselItem>
						)
					)}
				</CarouselContent>

				<CarouselPrevious
					className="cursor-pointer absolute left-0 sm:left-2 md:left-4 lg:left-8 z-30 transition-all duration-300 hover:scale-110"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(30,30,45,0.8) 0%, rgba(35,35,60,0.7) 100%)"
							: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.9) 100%)",
						backdropFilter: "blur(10px)",
						boxShadow: isDark
							? `0 4px 20px rgba(0,0,0,0.3), 
							   0 0 0 1px rgba(103,80,164,0.3)`
							: `0 4px 20px rgba(103,80,164,0.1), 
							   0 0 0 1px rgba(132,95,220,0.2)`,
						border: isDark ? "1px solid rgba(103,80,164,0.4)" : "1px solid rgba(132,95,220,0.3)",
						color: isDark ? "rgba(230,210,255,0.9)" : "rgba(103,80,164,0.9)",
					}}>
					<ArrowLeftIcon className="h-4 w-4" />
					<span className="sr-only">Previous slide</span>
				</CarouselPrevious>

				<CarouselNext
					className="cursor-pointer absolute right-0 sm:right-2 md:right-4 lg:right-8 z-30 transition-all duration-300 hover:scale-110"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(30,30,45,0.8) 0%, rgba(35,35,60,0.7) 100%)"
							: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.9) 100%)",
						backdropFilter: "blur(10px)",
						boxShadow: isDark
							? `0 4px 20px rgba(0,0,0,0.3), 
							   0 0 0 1px rgba(103,80,164,0.3)`
							: `0 4px 20px rgba(103,80,164,0.1), 
							   0 0 0 1px rgba(132,95,220,0.2)`,
						border: isDark ? "1px solid rgba(103,80,164,0.4)" : "1px solid rgba(132,95,220,0.3)",
						color: isDark ? "rgba(230,210,255,0.9)" : "rgba(103,80,164,0.9)",
					}}>
					<ArrowRightIcon className="h-4 w-4" />
					<span className="sr-only">Next slide</span>
				</CarouselNext>
			</Carousel>
		</div>
	);
}
