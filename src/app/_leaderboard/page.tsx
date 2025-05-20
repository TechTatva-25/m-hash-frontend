import React from "react";

import Footer from "@/components/Home/Footer";
import Leaderboard from "@/components/Home/Leaderboard";
import Navbar from "@/components/Home/Navbar";
import ScrollToTopButton from "@/components/ui/scroll-to-top-btn";

export default function Home(): React.JSX.Element {
	return (
		<div className="mt-16 flex min-h-screen flex-col items-center justify-between overflow-x-hidden overflow-y-hidden md:mt-24">
			<header className="relative flex w-full flex-row items-center justify-around">
				<Navbar />
			</header>
			<main className="flex w-full flex-1 flex-col items-center justify-center text-center">
				<div className="w-full">
					<Leaderboard />
				</div>
			</main>
			<footer className="mt-20 flex w-full scroll-mt-20 flex-col items-center justify-center text-center">
				<Footer />
			</footer>
			<ScrollToTopButton />
		</div>
	);
}
