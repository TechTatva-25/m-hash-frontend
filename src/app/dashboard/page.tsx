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
import { useTheme } from "@/components/ThemeProvider";
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
	const { theme } = useTheme();
	const isDark = theme === "dark";

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
					<BreadcrumbList 
						className="text-[15px] p-2 rounded-md backdrop-blur-sm"
						style={{
							background: isDark 
								? 'rgba(255, 255, 255, 0.03)' 
								: 'rgba(255, 255, 255, 0.2)',
							border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)'}`,
							boxShadow: `0 2px 6px ${isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)'}`
						}}>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/" className="transition-colors hover:text-purple-500">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage 
								className="font-semibold" 
								style={{ 
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? 'rgba(139, 92, 246, 0.8)' : 'rgba(79, 70, 229, 0.8)'
								}}>
								Dashboard
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
										background: isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)',
										borderRadius: '12px'
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
										background: isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)',
										borderRadius: '12px'
									}} 
								/>
							))}
						</div>
					</div>
				)}
				{!session?.loading && !currentTeam?._id && session?.user && (
					<div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
						<Tabs defaultValue="join" className="backdrop-blur-md" style={{
							borderRadius: '16px',
							background: isDark 
								? 'rgba(30, 41, 59, 0.3)' 
								: 'rgba(255, 255, 255, 0.2)',
							border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)'}`,
							boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`,
							overflow: 'hidden'
						}}>
							<div className="relative">
								{/* Subtle purple accent overlay */}
								<div className="absolute inset-0" style={{
									background: isDark
										? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.02))'
										: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))'
								}}></div>
								
								{/* Enhanced inner glow with subtle highlights */}
								<div className="absolute inset-0" style={{
									background: `linear-gradient(135deg, ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.1)'}, transparent)`,
									mixBlendMode: "overlay"
								}}></div>
								
								<TabsList 
									className="flex w-fit flex-row items-center justify-center bg-transparent m-4 md:space-x-4 relative"
									style={{
										background: isDark 
											? 'rgba(30, 41, 59, 0.7)' 
											: 'rgba(255, 255, 255, 0.4)',
										border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)'}`,
										backdropFilter: 'blur(10px)'
									}}
								>
									<TabsTrigger 
										value="join"
										className="data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300"
										style={{
											fontFamily: "var(--font-playfair-display)",
											fontWeight: 500,
											color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)'
										}}
									>
										Join Team
									</TabsTrigger>
									<TabsTrigger 
										value="invite"
										className="data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300"
										style={{
											fontFamily: "var(--font-playfair-display)",
											fontWeight: 500,
											color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)'
										}}
									>
										Invites
									</TabsTrigger>
								</TabsList>
							</div>
							<TabsContent value="join" className="relative z-10 px-4 pb-4">
								<JoinTeam />
							</TabsContent>
							<TabsContent value="invite" className="relative z-10 px-4 pb-4">
								<InvitesInbox setTeam={setCurrentTeam} />
							</TabsContent>
						</Tabs>
						<CreateTeam currentUser={session.user} setTeam={setCurrentTeam} />
					</div>
				)}
				{!session?.loading && currentTeam?._id && session?.user && (
					<>
						{currentTeam.team_leader._id === session.user._id && currentTeam.members.length === 1 && (
							<Alert 
								variant="warning" 
								className="mt-10 backdrop-blur-md relative overflow-hidden"
								style={{
									background: isDark 
										? 'rgba(234, 179, 8, 0.05)' 
										: 'rgba(234, 179, 8, 0.05)',
									border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`,
									boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)'}`,
									borderRadius: '10px'
								}}
							>
								{/* Light glow effect */}
								<div className="absolute inset-0" style={{
									background: `linear-gradient(135deg, ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)'}, transparent)`,
									mixBlendMode: "overlay"
								}}></div>
								
								<div className="relative z-10 flex items-center">
									<IoWarning className="h-6 w-6" color="#eab308" />
									<div>
										<AlertTitle className="ml-2" style={{ fontFamily: "var(--font-playfair-display)" }}>
											Members Required
										</AlertTitle>
										<AlertDescription className="ml-2">
											You are the only member of this team. Please invite at least one more member to be
											eligible for Round 1.
										</AlertDescription>
									</div>
								</div>
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
								} backdrop-blur-md relative overflow-hidden`}
								style={{
									background: isDark 
										? 'rgba(30, 41, 59, 0.3)' 
										: 'rgba(255, 255, 255, 0.2)',
									border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)'}`,
									boxShadow: `0 4px 20px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`,
									borderRadius: '16px'
								}}
							>
								{/* Subtle purple accent overlay */}
								<div className="absolute inset-0" style={{
									background: isDark
										? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.02))'
										: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.04))'
								}}></div>
								
								{/* Enhanced inner glow with subtle highlights */}
								<div className="absolute inset-0" style={{
									background: `linear-gradient(135deg, ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.1)'}, transparent)`,
									mixBlendMode: "overlay"
								}}></div>
								
								<CardHeader className="px-7 relative z-10">
									<CardTitle style={{ fontFamily: "var(--font-playfair-display)" }}>
										Team Details - {currentTeam.name}
									</CardTitle>
									{fakeTeamId && (
										<CardDescription 
											className="text-bold text-md"
											style={{ 
												color: isDark ? 'rgba(139, 92, 246, 0.7)' : 'rgba(79, 70, 229, 0.7)'
											}}
										>
											Team ID: {fakeTeamId}
										</CardDescription>
									)}
								</CardHeader>
								<CardContent className="px-2 pb-2 sm:px-6 sm:pb-6 relative z-10">
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
