"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import ProgressTimeline from "@/components/Dashboard/Timeline/progress-timeline";
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
					<BreadcrumbList className="text-[15px]">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/dashboard">Dashboard</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Progress</BreadcrumbPage>
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
