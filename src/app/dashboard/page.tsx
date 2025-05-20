"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoWarning } from "react-icons/io5";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import CreateTeam from "@/components/Dashboard/Team/create-team";
import DeleteTeamCard from "@/components/Dashboard/Team/disband-team";
import InvitesInbox from "@/components/Dashboard/Team/invites-inbox";
import JoinTeam from "@/components/Dashboard/Team/join-team";
import LeaveTeamCard from "@/components/Dashboard/Team/leave-team";
import MultiSelectTeamList from "@/components/Dashboard/Team/multi-select-teamlist";
import TeamInbox from "@/components/Dashboard/Team/team-inbox";
import UserTeam from "@/components/Dashboard/Team/user-team";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFakeTeamId } from "@/hooks/useFakeTeamId";
import { useSession } from "@/hooks/useSession";
import { Team, useTeam } from "@/hooks/useTeam";

export default function DashboardPage(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();
	const team = useTeam();
	const fakeTeamId = useFakeTeamId(team);
	const [reload, setReload] = React.useState(false);
	const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null);

	React.useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		} else if (session.user?.role === "judge") {
			// router.push("/dashboard/judge");
			router.push("/dashboard/judgePresentation");
		}
	}, [session]);

	React.useEffect(() => {
		if (!team._id) return;
		setCurrentTeam(team);
	}, [team]);

	return (
		<ContentLayout title="Dashboard">
			<section className="flex flex-1 flex-col py-4 sm:py-8">
				<Breadcrumb>
					<BreadcrumbList className="text-[15px]">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Dashboard</BreadcrumbPage>
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
				{!session?.loading && !currentTeam?._id && session?.user && (
					<div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
						<Tabs defaultValue="join">
							<TabsList className="flex w-fit flex-row items-center justify-center bg-secondary md:space-x-4">
								<TabsTrigger value="join">Join Team</TabsTrigger>
								<TabsTrigger value="invite">Invites</TabsTrigger>
							</TabsList>
							<TabsContent value="join">
								<JoinTeam />
							</TabsContent>
							<TabsContent value="invite">
								<InvitesInbox setTeam={setCurrentTeam} />
							</TabsContent>
						</Tabs>
						<CreateTeam currentUser={session.user} setTeam={setCurrentTeam} />
					</div>
				)}
				{!session?.loading && currentTeam?._id && session?.user && (
					<>
						{currentTeam.team_leader._id === session.user._id && currentTeam.members.length === 1 && (
							<Alert variant="warning" className="mt-10 bg-yellow-500/10">
								<IoWarning className="h-6 w-6" color="#eab308" />
								<AlertTitle className="ml-2">Members Required</AlertTitle>
								<AlertDescription className="ml-2">
									You are the only member of this team. Please invite at least one more member to be
									eligible for Round 1.
								</AlertDescription>
							</Alert>
						)}
						<div
							className={`mt-10 grid grid-cols-1 gap-10 ${
								session.user._id === currentTeam.team_leader._id ? "lg:grid-cols-3" : "lg:grid-cols-1"
							}`}>
							<Card
								className={`${
									session.user._id === currentTeam.team_leader._id
										? "col-span-1 lg:col-span-2"
										: "col-span-1"
								}`}>
								<CardHeader className="px-7">
									<CardTitle>Team Details - {currentTeam.name}</CardTitle>
									{fakeTeamId && (
										<CardDescription className="text-bold text-md">
											Team ID: {fakeTeamId}
										</CardDescription>
									)}
								</CardHeader>
								<CardContent className="px-2 pb-2 sm:px-6 sm:pb-6">
									<UserTeam team={currentTeam} />
								</CardContent>
							</Card>
							{session.user._id === currentTeam.team_leader._id && (
								<MultiSelectTeamList
									className="col-span-1"
									team={currentTeam}
									onChange={(): void => setReload(true)}
								/>
							)}
						</div>
						{session.user._id === currentTeam.team_leader._id && (
							<TeamInbox reload={reload} setReload={setReload} setTeam={setCurrentTeam} />
						)}
						{session.user._id === currentTeam.team_leader._id ? (
							<DeleteTeamCard team={currentTeam} setTeam={setCurrentTeam} />
						) : (
							<LeaveTeamCard team={currentTeam} setTeam={setCurrentTeam} />
						)}
					</>
				)}
			</section>
		</ContentLayout>
	);
}
