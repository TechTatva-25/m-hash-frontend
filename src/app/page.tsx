"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

import { downloadRules } from "@/lib/download-utils";
import About from "@/components/Home/About";
import ContactForm from "@/components/Home/Contact";
import Footer from "@/components/Home/Footer";
import Gallery from "@/components/Home/Gallery";
import { HighwayTimeline } from "@/components/Home/HighwayTimeline";
import Navbar from "@/components/Home/Navbar";
import { PSTabs } from "@/components/Home/PSTabs";
import { Stats } from "@/components/Home/Stats";
import GlassmorphicButton from "@/components/ui/GlassmorphicButton";
import ScrollToTopButton from "@/components/ui/scroll-to-top-btn";
import Hero from "@/components/Home/Hero";
import { useLenis } from "@/hooks/useLenis";

export default function Home(): React.JSX.Element {
	// Initialize Lenis smooth scrolling
	useLenis();
	const { theme } = useTheme();

	return (
		<div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden overflow-y-hidden bg-background">
			<header className="relative flex w-full flex-row items-center justify-around">
				<Navbar />
			</header>

			{/* Hero Section */}
			<main className="flex w-full flex-1 flex-col items-center justify-center text-center">
				<div className="w-full">
					<Hero />
				</div>
			</main>

			{/* About Section */}
			<section id="about" className="relative flex w-full scroll-mt-20 flex-col py-16 md:py-24">
				<About />
			</section>

			{/* Statistics Section */}
			<section id="statistics" className="relative flex w-full scroll-mt-20 flex-col py-16 md:py-24">
				<Stats />
			</section>

			{/* Timeline Section */}
			<section
				id="timeline"
				className="relative flex w-full scroll-mt-20 flex-col py-16 md:py-24 overflow-hidden">
				<div className="w-[95%] max-w-[1800px] mx-auto">
					<HighwayTimeline />
				</div>
			</section>

			{/* Problem Statements Section */}
			<section
				id="problem-statements"
				className="relative flex w-full scroll-mt-20 flex-col py-16 pb-6 md:py-24 md:pb-8 z-10">
				<div className="container mx-auto px-4 relative z-20">
					{/* Animated heading matching About Us and Stats styling */}
					<div className="text-center mb-16">
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
									color: theme === "dark" ? "rgba(200, 240, 200, 0.95)" : "#005050",
									textShadow:
										theme === "dark"
											? "0 2px 8px rgba(46, 204, 113, 0.2)"
											: "0 2px 8px rgba(16, 109, 32, 0.15)",
								}}>
								Problem Statements
							</h2>

							{/* Royal Green decorative lines - heading width only */}
							<motion.div
								className="absolute -bottom-3 left-0 right-0 h-1 rounded-full"
								style={{
									background:
										theme === "dark"
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
									background:
										theme === "dark"
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
					<PSTabs />
				</div>
			</section>

			{/* Download Section */}
			<section className="relative flex w-full flex-col">
				<div className="flex justify-center w-full">
					<GlassmorphicButton
						text="Download Rulebook"
						size="lg"
						onClick={downloadRules}
						className="green-glow"
					/>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="relative flex w-full scroll-mt-20 flex-col py-16 md:py-24">
				<Gallery />
			</section>

			{/* Contact Section */}
			<section id="contact-us" className="relative flex w-full scroll-mt-20 flex-col py-16 md:py-24">
				<div className="container mx-auto px-4">
					<ContactForm />
				</div>
			</section>

			{/* Footer */}
			<footer className="flex w-full scroll-mt-20 flex-col items-center justify-center text-center py-8">
				<Footer />
			</footer>

			<ScrollToTopButton />
		</div>
	);
}
