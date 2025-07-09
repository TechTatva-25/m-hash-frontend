"use client";

import Image from "next/image";
import GradientBg from "../ui/gradientBg";
import Stack from "../ui/stack";
import { motion } from "framer-motion";

export default function About(): React.JSX.Element {
	// Images for the stack component
	const aboutImages = [
		{ id: 1, img: "/assets/about/abt1.jpg" },
		{ id: 2, img: "/assets/about/abt2.jpg" },
		{ id: 3, img: "/assets/about/abt3.jpg" },
		{ id: 4, img: "/assets/about/abt4.jpg" },
		{ id: 5, img: "/assets/about/abt5.jpg" },
		{ id: 6, img: "/assets/about/abt6.jpg" },
		{ id: 7, img: "/assets/about/abt7.jpg" },
	];

	return (
		<section id="about" className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				{/* Enhanced Glassmorphic Card with Refined Gold Accents */}
				<motion.div
					className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/30 via-white/20 to-white/5 dark:from-white/15 dark:via-white/8 dark:to-white/2 border border-white/40 dark:border-white/25 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					style={{
						boxShadow: `
							0 32px 64px -12px rgba(0, 0, 0, 0.25),
							0 0 0 1px rgba(255, 255, 255, 0.3),
							inset 0 1px 0 rgba(255, 255, 255, 0.4),
							inset 0 -1px 0 rgba(0, 0, 0, 0.1),
							0 0 30px -5px rgba(255, 215, 0, 0.1)
						`,
					}}>
					{/* Subtle gold rim accent */}
					<div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-amber-300/20 via-yellow-400/30 to-amber-300/20 pointer-events-none"></div>

					{/* Enhanced Smooth Light Beam Effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out">
						{/* Multiple layered beams for smoother effect */}
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out blur-sm"></div>
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1800 ease-out delay-100"></div>
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-amber-100/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1600 ease-out delay-200 blur-xs"></div>
					</div>

					{/* Enhanced inner glow with gold highlights */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-3xl"></div>
					<div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
					<div className="absolute inset-0 bg-gradient-to-br from-amber-300/5 via-transparent to-yellow-400/3 rounded-3xl"></div>

					<div className="flex flex-col md:flex-row p-6 md:p-10 gap-10 relative z-10">
						{/* Left side - Stack component */}
						<div className="md:w-2/5 flex justify-center items-center">
							<div className="w-full h-full flex justify-center items-center relative">
								{/* Subtle gold accent behind stack */}
								<div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-yellow-100/5 rounded-2xl blur-sm"></div>
								<Stack
									cardsData={aboutImages}
									cardDimensions={{ width: 280, height: 350 }}
									sensitivity={180}
									randomRotation={true}
									sendToBackOnClick={false}
								/>
							</div>
						</div>

						{/* Right side - About text */}
						<div className="md:w-3/5">
							<div className="relative inline-block mb-8">
								{/* Clean title without gold gradient */}
								<motion.h2
									className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]"
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									style={{ fontFamily: "var(--font-playfair-display)" }}>
									About Us
								</motion.h2>

								{/* Clean underlines without gold */}
								<motion.div
									className="absolute -bottom-3 left-0 h-1 bg-[hsl(var(--foreground))] rounded-full"
									initial={{ width: 0 }}
									whileInView={{ width: "100%" }}
									transition={{ duration: 0.8, delay: 0.5 }}
									viewport={{ once: true }}
								/>

								{/* Subtle accent line */}
								<motion.div
									className="absolute -bottom-5 left-0 h-[0.5px] bg-[hsl(var(--foreground))]/60 rounded-full"
									initial={{ width: 0 }}
									whileInView={{ width: "100%" }}
									transition={{ duration: 0.8, delay: 0.7 }}
									viewport={{ once: true }}
								/>
							</div>

							<motion.div
								className="space-y-4"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								viewport={{ once: true }}>
								<p className="text-lg text-[hsl(var(--foreground))]/80">
									Get ready to dive into the future at Manipal Hackathon 2025! With the theme
									"Pioneering Paradigms", this flagship event of TechTatva 2025 is where creativity
									and innovation come to the forefront.
								</p>
								<p className="text-lg text-[hsl(var(--foreground))]/80">
									Join us in 36 thrilling hours of coding where you will compete with brilliant minds,
									tackle challenges, and transform groundbreaking ideas to reality. This isn't just
									about coding — it's about pushing boundaries, exploring new possibilities, and
									setting the trends others will follow.
								</p>
								<p className="text-lg text-[hsl(var(--foreground))]/80">
									Whether you're a seasoned pro or an enthusiastic newcomer, this is your chance to
									shine, learn, and make a mark. Don't miss out on the excitement, the learning, and
									the opportunity to be part of something extraordinary.
								</p>
							</motion.div>
						</div>
					</div>

					{/* Subtle gold corner accents */}
					<div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-300/20 to-yellow-400/10 rounded-full blur-sm"></div>
					<div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tl from-yellow-400/15 to-amber-300/20 rounded-full blur-sm"></div>
				</motion.div>
			</div>
		</section>
	);
}
