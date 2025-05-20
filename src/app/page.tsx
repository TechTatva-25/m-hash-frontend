import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";

import { downloadRules } from "@/app/dashboard/rules/page";
import About from "@/components/Home/About";
import ContactForm from "@/components/Home/Contact";
import Footer from "@/components/Home/Footer";
import { GeneralTime } from "@/components/Home/GeneralTimeLine";
import { GlobeDemo } from "@/components/Home/Globe";
import Navbar from "@/components/Home/Navbar";
import { PSTabs } from "@/components/Home/PSTabs";
import { Stats } from "@/components/Home/Stats";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "@/components/ui/scroll-to-top-btn";

export default function Home(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden overflow-y-hidden">
			<header className="relative flex w-full flex-row items-center justify-around">
				<Navbar />
			</header>
			<main className="flex w-full flex-1 flex-col items-center justify-center text-center">
				<div className="w-full">
					<GlobeDemo />
				</div>
			</main>
			<section
				id="about"
				className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden px-4 md:px-8 lg:px-16 xl:px-24">
				<About />
			</section>
			<section
				id="statistics"
				className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden px-4 md:px-8 lg:px-16 xl:px-24">
				<Stats />
			</section>
			<section
				id="timeline"
				className="relative flex scroll-mt-20 flex-col gap-7 overflow-hidden px-4 pt-12 md:px-8 lg:px-16 xl:px-24">
				<h2 className="m-5 text-center text-3xl font-bold">The General Timeline of Events</h2>
				<GeneralTime />
			</section>
			<section
				id="problem-statements"
				className="relative flex w-3/4 scroll-mt-20 flex-col px-4 pt-16 md:w-[80%] md:px-8 lg:px-16 xl:px-24">
				<h2 className="mb-12 text-center text-3xl font-bold">Problem Statements</h2>
				<PSTabs />
			</section>
			<Button type="submit" onClick={downloadRules} className="mt-12 w-52 font-semibold sm:w-64">
				Download Rulebook
				<FaRegFilePdf className="ml-4 h-6 w-6" />
			</Button>
			<section
				id="contact-us"
				className="relative flex w-11/12 scroll-mt-20 flex-col px-4 pt-20 sm:w-3/4 md:w-[80%] md:px-8 lg:px-16 xl:px-24">
				<h2 className="mb-12 text-center text-3xl font-bold">Contact Us</h2>
				<ContactForm />
			</section>
			<footer className="mt-20 flex w-full scroll-mt-20 flex-col items-center justify-center text-center">
				<Footer />
			</footer>
			<ScrollToTopButton />
		</div>
	);
}
