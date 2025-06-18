"use client";

import Image from "next/image";
import GradientBg from "../ui/gradientBg";
import Stack from "../ui/stack";
import { motion } from "framer-motion";

export default function About(): React.JSX.Element {
	// Images for the stack component
	const aboutImages = [
		{ id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
	];

	return (
		<section id="about" className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				{/* Glassmorphic Card */}
				<motion.div 
					className="backdrop-blur-lg bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="flex flex-col md:flex-row p-6 md:p-10 gap-10">
						{/* Left side - Stack component */}
						<div className="md:w-2/5 flex justify-center items-center">
							<div className="w-full h-full flex justify-center items-center relative">
								<Stack 
									cardsData={aboutImages}
									cardDimensions={{ width: 280, height: 350 }}
									sensitivity={150}
									randomRotation={true}
									sendToBackOnClick={true}
									animationConfig={{ stiffness: 300, damping: 25 }}
								/>
							</div>
						</div>
						
						{/* Right side - About text */}
						<div className="md:w-3/5">
							<motion.h2 
								className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-6"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								viewport={{ once: true }}
								style={{ fontFamily: "var(--font-playfair-display)" }}
							>
								About Us
							</motion.h2>
							
							<motion.div
								className="space-y-4"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								viewport={{ once: true }}
							>
								<p className="text-lg text-[hsl(var(--foreground))]">
									Get ready to dive into the future at Manipal Hackathon 2025! With the theme "Pioneering Paradigms",
									this flagship event of TechTatva 2025 is where creativity and innovation come to the forefront.
								</p>
								<p className="text-lg text-[hsl(var(--foreground))]">
									Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle
									challenges, and transform groundbreaking ideas to reality. This isn't just about coding — it's about
									pushing boundaries, exploring new possibilities, and setting the trends others will follow.
								</p>
								<p className="text-lg text-[hsl(var(--foreground))]">
									Whether you're a seasoned pro or an enthusiastic newcomer, this is your chance to shine, learn, 
									and make a mark. Don't miss out on the excitement, the learning, and the opportunity 
									to be part of something extraordinary.
								</p>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
