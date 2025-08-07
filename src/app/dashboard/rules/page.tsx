"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import MarkdownArticle from "@/components/Dashboard/Rules/markdown-article";
import { useTheme } from "@/components/ThemeProvider";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import { RULES_MARKDOWN } from "@/lib/rules";
import { downloadRules } from "@/lib/download-utils";

export default function RulesPage(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();
	const { theme } = useTheme();
	const isDark = theme === "dark";

	React.useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}
	}, [session]);

	return (
		<ContentLayout title="Rules">
			<section className="flex flex-1 flex-col py-4 sm:py-8">
				<Breadcrumb>
					<BreadcrumbList
						className="text-[15px] p-2 rounded-md backdrop-blur-sm"
						style={{
							background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.2)",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.4)"}`,
							boxShadow: `0 2px 6px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.02)"}`,
						}}>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/" className="transition-colors hover:text-purple-500">
									Home
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/dashboard" className="transition-colors hover:text-purple-500">
									Dashboard
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage
								className="font-semibold"
								style={{
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(79, 70, 229, 0.8)",
								}}>
								Rules
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{session?.loading && (
					<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton
									key={index}
									style={{
										height: Math.random() * 200 + 200,
										background: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(139, 92, 246, 0.05)",
										borderRadius: "12px",
									}}
								/>
							))}
						</div>
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton
									key={index}
									style={{
										height: Math.random() * 200 + 200,
										background: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(139, 92, 246, 0.05)",
										borderRadius: "12px",
									}}
								/>
							))}
						</div>
					</div>
				)}
				{!session?.loading && (
					<div
						className="mt-8 backdrop-blur-md relative overflow-hidden rounded-xl p-6"
						style={{
							background: isDark ? "rgba(30, 41, 59, 0.3)" : "rgba(255, 255, 255, 0.2)",
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.5)"}`,
							boxShadow: `0 4px 20px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"}`,
						}}>
						{/* Subtle purple accent overlay */}
						<div
							className="absolute inset-0"
							style={{
								background: isDark
									? "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.02))"
									: "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))",
							}}></div>

						{/* Enhanced inner glow with subtle highlights */}
						<div
							className="absolute inset-0"
							style={{
								background: `linear-gradient(135deg, ${isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.1)"}, transparent)`,
								mixBlendMode: "overlay",
							}}></div>

						<div className="relative z-10">
							<MarkdownArticle content={RULES_MARKDOWN} />
						</div>
					</div>
				)}
				<div className="py-6"></div>
				<Button
					className="fixed bottom-6 right-8 h-12 w-12 p-3 transition-all duration-300 backdrop-blur-md hover:scale-105 focus:scale-105 cursor-pointer"
					style={{
						background: isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.2)",
						border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"}`,
						boxShadow: `0 4px 20px ${isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(139, 92, 246, 0.2)"}`,
					}}
					onClick={downloadRules}
					title="Download Rules">
					<FaRegFilePdf className="h-10 w-10" color={isDark ? "#c4b5fd" : "#8b5cf6"} />
				</Button>
			</section>
		</ContentLayout>
	);
}
