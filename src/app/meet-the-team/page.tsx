"use client";

import React from "react";
import MeetTheTeam from "@/components/Home/MeetTheTeam";
import Navbar from "@/components/Home/Navbar";
//import Footer from "@/components/Home/Footer";

export default function MeetTheCCPage() {
	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center py-12 px-4 md:px-8">
				<MeetTheTeam />
			</main>
		</div>
	);
}
