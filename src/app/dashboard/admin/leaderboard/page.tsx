"use client";
// import axios, { AxiosError } from "axios";
// import Avatar from "boring-avatars";
// import { Eye, File, X } from "lucide-react";
// import { ChevronsUpDown } from "lucide-react";
// import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React from "react";

// import React, { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import { Modal } from "@/components/Dashboard/admin/modal";
import BugsLeaderboardTable from "@/components/Dashboard/admin/BugsLeaderboardTable";
import { ContentLayout } from "@/components/Dashboard/content-layout";
// import { ExportCSVButton } from "@/components/Dashboard/judge/ExportCSVButton";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { getFakeTeamId } from "@/hooks/useFakeTeamId";
import { Problem } from "@/hooks/useProblem";
import { Team } from "@/hooks/useTeam";
// import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface AdminSubmission {
	_id: string;
	team_id: Team;
	problem_id: Problem;
	status: string;
	submission_file_name?: string;
	submission_url?: string;
	createdAt: string;
	submission_video_url?: string;
}

const QualifiedTeamsTable: React.FC = () => {
	return (
		<ContentLayout title="Judge">
			<div className="w-[100%] py-5">
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
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Admin</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Leaderboard</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="my-10">
				<div className="rounded-md">
					<BugsLeaderboardTable />
				</div>
				<div className="mt-10" />
			</div>
		</ContentLayout>
	);
};

export default QualifiedTeamsTable;
