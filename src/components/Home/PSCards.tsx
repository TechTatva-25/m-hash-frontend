"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

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
	const player = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const sdgIcon = (sdg_id: number): React.ReactElement => {
		const Icon = sdgIconMap[sdg_id];
		return <Icon className="mr-2 h-4 w-4" />;
	};
	return (
		<Carousel
			className="w-full"
			plugins={[player.current]}
			onMouseEnter={player.current.stop}
			onMouseLeave={(): void => player.current.play()}
			opts={{
				loop: true,
				align: "start",
			}}>
			<CarouselContent className="flex">
				{(filter === "all" ? problems : problems.filter((problem) => problem.type === filter)).map(
					(ps, index) => (
						<CarouselItem key={index} className="group flex-shrink-0 md:basis-1/2 lg:basis-1/3">
							<Card className="relative h-full rounded-md bg-card/30">
								<CardContent className="flex h-full flex-col items-center justify-between p-4">
									<Image
										src={ps.thumbnail}
										alt={`Problem statement ${index + 1}`}
										width={300}
										height={300}
										className="mb-4 w-full rounded-md"
									/>
									<Badge
										className={`absolute right-6 top-6 mb-4 ${sdgColorMap[ps.sdg_id]}`}
										variant="default">
										{sdgIcon(ps.sdg_id)}
										{`SDG-${ps.sdg_id}`}
									</Badge>
									<div className="text-center">
										{/* <h3 className="mb-2 text-lg font-semibold">{`SDG-${ps.sdg_id}`}</h3> */}
										<p className="text-md mb-4 font-medium">{ps.title}</p>
										<p className="text-justify text-sm opacity-75">
											{ps.description.length > PS_CARD_DESCRIPTION_MAXLEN
												? `${ps.description.slice(0, PS_CARD_DESCRIPTION_MAXLEN)}...`
												: ps.description}
										</p>
									</div>
									<div className="mt-6 w-full text-center">
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="secondary" className="w-full">
													Know More
												</Button>
											</DialogTrigger>
											<DialogContent className="h-[80%] w-[90%] md:max-w-[700px]">
												<DialogHeader>
													<DialogTitle className="text-center">{ps.title}</DialogTitle>
												</DialogHeader>
												<div className="md:max-h-100 gap-8 overflow-y-auto">
													<DialogDescription className="text-justify">
														<div className="flex items-center justify-between space-x-4">
															<div>
																<DialogTitle className="mb-3 text-[hsl(var(--foreground))]">
																	Sustainable Development Goal
																</DialogTitle>
																<span>{ps.sdg_id}</span>
															</div>
															<Image
																src={`/assets/sdg_${ps.sdg_id}.png`}
																alt={`SDG ${ps.sdg_id}`}
																width={100}
																height={100}
															/>
														</div>

														<DialogTitle className="my-3 text-[hsl(var(--foreground))]">
															Problem{" "}
														</DialogTitle>
														{ps.description}
														<DialogTitle className="my-3 text-[hsl(var(--foreground))]">
															Features Expected{" "}
														</DialogTitle>
														<ul className="list-disc text-wrap">
															{ps.features.map((feature, index) => (
																<li key={index}>{feature}</li>
															))}
														</ul>
													</DialogDescription>
												</div>
												<DialogFooter></DialogFooter>
											</DialogContent>
										</Dialog>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
					)
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
