"use client";

import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";

import { downloadRules } from "@/app/dashboard/rules/page";
import About from "@/components/Home/About";
import ContactForm from "@/components/Home/Contact";
import Footer from "@/components/Home/Footer";
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

	return (
		<div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden overflow-y-hidden">
			<header className="relative flex w-full flex-row items-center justify-around">
				<Navbar />
			</header>
			<main className="flex w-full flex-1 flex-col items-center justify-center text-center">
				<div className="w-full">
					{/*<GlobeDemo />*/}
					<Hero />
				</div>
			</main>
			<section id="about" className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden">
				<About />
			</section>
			<section
				id="statistics"
				className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden px-4 md:px-8 lg:px-16 xl:px-24">
				<Stats />
			</section>
			<section id="timeline" className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden w-full py-16">
				<div className="w-[95%] max-w-[1800px] mx-auto">
					{/* <h2 className="mb-10 text-center text-3xl font-bold">The General Timeline of Events</h2> */}
					<HighwayTimeline />
				</div>
			</section>
			<section id="problem-statements" className="relative flex w-full scroll-mt-20 flex-col px-4 pt-16">
				<div className="relative inline-block mb-12 mx-auto w-fit">
					{/* Animated heading like About Us */}
					<h2
						className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] font-playfair-display text-center"
						style={{ fontFamily: "var(--font-playfair-display)" }}>
						Problem Statements
					</h2>
					{/* Animated underline */}
					<div
						className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-[hsl(var(--foreground))] rounded-full"
						style={{ width: "100%", minWidth: 120, maxWidth: 320 }}></div>
					<div
						className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-[0.5px] bg-[hsl(var(--foreground))]/60 rounded-full"
						style={{ width: "100%", minWidth: 120, maxWidth: 320 }}></div>
				</div>
				<PSTabs />
			</section>

			<div className="flex justify-center w-full">
				<GlassmorphicButton
					text="Download Rulebook"
					size="lg"
					// icon={<FaRegFilePdf className="h-7 w-7 text-purple-500 drop-shadow-lg" />}
					onClick={downloadRules}
				/>
			</div>
			<section
				id="contact-us"
				className="relative flex w-11/12 scroll-mt-20 flex-col px-4 pt-20 sm:w-3/4 md:w-[80%] md:px-8 lg:px-16 xl:px-24">
				{/* <h2 className="mb-12 text-center text-3xl font-bold">Contact Us</h2> */}
				<ContactForm />
			</section>
			<footer className="mt-20 flex w-full scroll-mt-20 flex-col items-center justify-center text-center">
				<Footer />
			</footer>
			<ScrollToTopButton />
		</div>
	);
}
