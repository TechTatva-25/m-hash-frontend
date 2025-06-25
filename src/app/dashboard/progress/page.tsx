"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import ProgressTimeline from "@/components/Dashboard/Timeline/progress-timeline";
import { useTheme } from "@/components/ThemeProvider";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import { Team, useTeam } from "@/hooks/useTeam";

export default function TimelinePage(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();
	const team = useTeam();
	const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	React.useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}
	}, [session]);

	React.useEffect(() => {
		if (!team._id) return;
		if (!team.loading && !team._id) {
			router.push("/dashboard");
			return;
		}
		setCurrentTeam(team);
	}, [team]);

	return (
		<ContentLayout title="Dashboard">
			<section className="flex flex-1 flex-col py-4 bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2] sm:py-8">
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
								Progress
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{session?.loading && (
					<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton key={index} style={{ height: Math.random() * 200 + 200 }} />
							))}
						</div>
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton key={index} style={{ height: Math.random() * 200 + 200 }} />
							))}
						</div>
					</div>
				)}
				{!session?.loading && currentTeam && (
					<div className="my-10 flex h-full flex-col items-center justify-center">
						<ProgressTimeline />
					</div>
				)}
			</section>
		</ContentLayout>
	);
}
