import "@/styles/globals.css";

import { Metadata } from "next";
import React from "react";
import "./globals.css";

import AppProvider from "@/components/AppProvider";
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap'
})

export const metadata: Metadata = {
	title: "Manipal Hackathon 2024",
	description:
		"Get ready to dive into the future at Manipal Hackathon 2024! With the theme 'Pioneering Paradigms', this flagship event of TechTatva 2024 is where creativity and innovation come to the forefront. Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle challenges, and transform groundbreaking ideas into reality. This isn’t just about coding — it’s about pushing boundaries, exploring new possibilities, and setting the trends others will follow. Whether you're a seasoned pro or an enthusiastic newcomer, this is your chance to shine, learn, and make a mark. Don’t miss out on the excitement, the learning, and the opportunity to be part of something extraordinary.",
	icons: {
		icon: "/favicon.ico",
	},
	metadataBase: process.env.NEXT_PUBLIC_BASE_URL ? new URL(String(process.env.NEXT_PUBLIC_BASE_URL)) : undefined,
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
		url: process.env.NEXT_PUBLIC_BASE_URL ? new URL(String(process.env.NEXT_PUBLIC_BASE_URL)) : undefined,
		title: "Manipal Hackathon 2024",
		description:
			"Get ready to dive into the future at Manipal Hackathon 2024! With the theme 'Pioneering Paradigms', this flagship event of TechTatva 2024 is where creativity and innovation come to the forefront. Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle challenges, and transform groundbreaking ideas into reality. This isn’t just about coding — it’s about pushing boundaries, exploring new possibilities, and setting the trends others will follow. Whether you're a seasoned pro or an enthusiastic newcomer, this is your chance to shine, learn, and make a mark. Don’t miss out on the excitement, the learning, and the opportunity to be part of something extraordinary.",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={playfairDisplay.variable}>
			<body className="min-h-screen text-[hsl(var(--foreground))]">
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
