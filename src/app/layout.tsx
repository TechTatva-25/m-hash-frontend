import "@/styles/globals.css";

import { Metadata } from "next";
import React from "react";

import AppProvider from "@/components/AppProvider";

export const metadata: Metadata = {
	title: "Manipal Hackathon 2024",
	description:
		"Get ready to dive into the future at Manipal Hackathon 2024! With the theme 'Pioneering Paradigms', this flagship event of TechTatva 2024 is where creativity and innovation come to the forefront. Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle challenges, and transform groundbreaking ideas into reality. This isn’t just about coding — it’s about pushing boundaries, exploring new possibilities, and setting the trends others will follow. Whether you're a seasoned pro or an enthusiastic amateur, M#’24 is your stage to shine. Let’s pioneer the future together.",
	icons: {
		icon: "/favicon.ico",
	},
	metadataBase: new URL(String(process.env.NEXT_PUBLIC_BASE_URL)),
	keywords: [
		"Manipal Hackathon 2024",
		"Pioneering Paradigms",
		"Pan India",
		"TechTatva 2024",
		"Innovation",
		"Creativity",
		"Technology",
		"Coding",
		"Hackathon",
		"Challenges",
		"Future Technology",
		"Tech Event",
		"Programming",
		"Startup Ideas",
	],
	authors: [{ name: "Manipal Institute of Technology, MAHE, Manipal" }],
	robots: {
		follow: true,
		index: true,
		nocache: true,
	},
	openGraph: {
		url: new URL(String(process.env.NEXT_PUBLIC_BASE_URL)),
		title: "Manipal Hackathon 2024",
		description:
			"Get ready to dive into the future at Manipal Hackathon 2024! With the theme 'Pioneering Paradigms', this flagship event of TechTatva 2024 is where creativity and innovation come to the forefront. Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle challenges, and transform groundbreaking ideas into reality. This isn’t just about coding — it’s about pushing boundaries, exploring new possibilities, and setting the trends others will follow. Whether you're a seasoned pro or an enthusiastic amateur, M#’24 is your stage to shine. Let’s pioneer the future together.",
		type: "website",
	},
	twitter: {
		images: "/M-Hash-Logo.png",
		card: "summary",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang="en">
			<body>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
